В качестве попытки формально верифицировать смарт-контракт Casper.sol был выбран сервис Securify, находящийся по ссылке securify.ch.
В ходе тестирования сервиса, было выяснено, что он находится в стадии разработки и в данный момент доступен лишь частичный функционал сервиса. Однако, при выполнении верификации, сервис предлагает некоторые рекомендации, в связи с этим были выделены некоторые аспекты безопасности, а именно:

    1) Transactions may affect ether receiver   
Суть проблемы заключается в том, что при вызове функции send() не желательно передавать в качестве аргумента адрес, который может быть изменен третьим лицом, так как средства не могут достичь своей цели, если транзакция с новым адресом пройдет раньше. Следует использовать функцию send() только с msg.sender, так как в таком случае не возникнет никаких "гонок" и средства в любом случае достигнут msg.sender.
В смарт-контракте Casper.sol есть похожий момент - в функции withdrawEther(uint eth) используется owner.transfer(eth). Так как owner один и его нельзя изменить на данный момент, никакой опасности нет.  

    2) Gas-dependent Reentrancy  
Проблема является не актуальной, т.к. она имеет место быть только при использовании .call.value()  

    3) Reentancy with constant gas  
Проблема заключается в том, что при использовании .transfer() при условии, что после того, как состоится трансфер, изменяется состояние контракта (например, списывается со счета контракта сумма трансфера), можно списать средства с контракта несколько раз, если первая транзакция не успела пройти и если злоумышленник совершил такую же транзакцию еще раз. В смарт-контракте Casper.sol такой проблемы нет, т.к. в функции buy() использование transfer() является последней инструкцией в коде этой функции, следовательно описанной выше ситуации не произойдет.  

    4) Transaction data length validation  
Contracts that do not validate the length of the provided transaction data may allow attackers to drain their balance. By default, Call instruction that is given address that is shorter than 20 bytes gets padded with zeros. Moreover, transaction data is also padded with zeros. Attackers can leverage this behavior to effectively increasing the payout value substantially. Securify detects Call instructions that take as input an address that depends on CallDataLoad and checks whether the transaction data size is checked.
Следует добавить проверку на длину входных данных!  

    5) Unhandled Exception  
При использовании инструкции .send() следует добавлять проверку на возвращаемое значение (true or false), т.к. может получится ситуация, когда транзакция не состоялась, а состояние переменной баланса изменилось. В смарт-контракте Casper.sol используется функция .transfer(), которая вызывает исключение, если транзакция не прошла => проблема не актуальна.  

    6) Use of Origin Instruction  
    
В смарт-контракте Casper.sol не ипользуется инструкция origin => не актуально.  

    7) Missing Input Validation  
Проблема не актуальна, т.к. проверки на величину принимаемых едниц в функции покупки токенов присутсвует.  

    8) Locked money  
The locked Ether bug occurs in contracts that never transfer Ether and do not have a Suicide instruction (which transfers the contract's owner all the contract's Ether). Securify detects such contracts by checking whether all instructions are different than the Suicide instruction and whether all Call instructions transfer zero ether.
Не актуально.  

    9) Use of Untrusted Inputs in Security Operations  
The unsafe inputs security bug occurs in contracts where inputs to a cryptographic hash function can be manipulated by the miner or user. That is, when the inputs depend on block information or transaction input. Our pattern detects this bug by selecting SHA3 (and SHA256, RIPEMD160) instructions and checking whether the inputs to the SHA3 depend on block information. The inputs to the SHA3 are the values in the memory starting from the first SHA3's argument and up to the location found at the sum of the first and second arguments (exclusive).
Не актуально.

В качестве итога, можно сказать, что полагаться на данный сервис сильно не следует, т.к. он комментирует лишь малую часть кода контракта, так как находится в стадии разработки. Однако, так же имеются и общие рекомендации, описанные выше. В ходе изучения проблем, было выяснено, что нужно добавить код в смарт-контракт, решающий проблему 4.