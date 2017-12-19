// This module makes possible to restart testrpc while running tests using
// truffle & mocha. The seed (testrpc --seed CLI option) is being preserved
// between startups.
// But the one being used to start testrpc should be specified - otherwise
// truffle will be unable to unlock accounts used in tests.
//
// Example usage:
//
// var testrpc = new TestRPC({ port: 8545,
//                             seed: 123 }); // You should pass the same seed to
//                                           // testrpc manually (use --seed
//                                           // CLI argument)
// it("Detect testrpc pid", () => testrpc.detect());
//
// // A lot of tests here, consuming a lot of eth
//
// it("restart testrpc", () => testrpc.restart());
//
// // All your ethereum funds are now restored to the initial value!
//
// // (Some other tests)
//
// // Now you should exit manually (testrpc will continue running so you don't
// // need to start it from the console one more time) or stop testrpc with
// // testrpc.stop()
// it("Now exit", () => process.exit());

// const util = require('util');
const process = require('process');
const childProcess = require('child_process');
const pidsByPort = require('port-pid');
const ps = require('ps-node');

module.exports = class TestRPC {
  constructor(config) {
    this.seed = typeof config.seed === 'undefined' ? 0 : config.seed;
    this.port = config.port || 8545;
    this.arguments = config.arguments || [];
    // eslint-disable-next-line no-console
    this.log = typeof config.logger !== 'function' ? console.log : config.logger;
    this.startupTimeout = 0;
    this.pid = null;
    this.process = process;
  }

  static isTestRPCProcess(processInfo) {
    return (processInfo &&
      // It can be anywhere in the $PATH, so just check the suffix.
      // If it's listening on correct port and also has 'testrpc'
      // in it's command name, then it's surely testrpc.
      processInfo.arguments.filter(arg => arg.endsWith('testrpc')).length !== 0
    );
  }

  // Detect already running testrpc
  detect() { // TODO: refactor promises
    return new Promise(async (resolve, reject) => {
      // TODO: detect seed from CLI arguments of already running process (?)
      await pidsByPort(this.port).then(async (pids) => {
        if (typeof pids.tcp[0] === 'undefined') {
          reject(new Error('No testrpc running'));
        }

        for (let i = 0, len = pids.tcp.length; i < len; i += 1) {
          const pid = pids.tcp[i];

          // eslint-disable-next-line no-await-in-loop
          await (new Promise((res) => {
            ps.lookup({ pid }, (err, processes) => {
              if (err !== null) {
                reject(new Error(`Could not find process with pid ${pid} (testrpc stopped?)`));
              }
              for (let j = 0, processesLen = processes.length; j < processesLen; j += 1) {
                const proc = processes[j];
                if (TestRPC.isTestRPCProcess(proc)) {
                  this.pid = pid;
                  this.log('testrpc: detected testrpc instance with pid', this.pid, 'by port number', this.port);
                  resolve(pid);
                }
              }
              res();
            });
          }));
        }
        reject();
      });
    });
  }

  start() {
    return new Promise((resolve, reject) => {
      if (this.pid === null) {
        this.testrpc = childProcess.spawn(
          'testrpc',
          ['--seed', this.seed].concat(this.arguments),
          { detached: true },
        );
        this.testrpc.unref();

        let flag = true;
        this.testrpc.stdout.on('data', (data) => {
          if (data.indexOf('Listening on') !== -1 && flag) {
            flag = false;
            this.log('testrpc: started; pid =', this.pid, 'with seed', this.seed);
            resolve();
          }
        });

        this.pid = this.testrpc.pid;

        if (this.startupTimeout) {
          setTimeout(reject, this.startupTimeout);
        }
      } else {
        reject();
      }
    });
  }

  async stop() {
    if (this.pid !== null) {
      process.kill(this.pid);
      this.log('testrpc: killed testrpc process with pid', this.pid);
      this.pid = null;
    }
  }

  restart() {
    return new Promise(async (resolve, reject) => this.detect().then(() => {
      this.stop();
      return this.start().then(resolve).catch(reject);
    }));
  }

  // Exit current process. TestRPC process will continue execution in background.
  detachAndExit() {
    setTimeout(this.process.exit, 2000);
  }
};
