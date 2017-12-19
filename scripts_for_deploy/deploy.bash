# Создаем папку, где будут храниться артефакты
mkdir ./artifacts
# Создаем первый артефакт - склеенный контракт
python3 ./flattener/solidity_flattener.py --output ./artifacts/Casper.sol ./contracts/Casper.sol
# Деплоим контракт и создаем второй артефакт - адрес задеплоенного контракта
node ./scripts_for_deploy/deploy.js 
# #Устанавливаем доверенное лицо
node ./scripts_for_deploy/setTrusted.js
# Отправляем Presale токены
node ./scripts_for_deploy/sendPresale.js
node ./scripts_for_deploy/setOwner.js
# Удаляем артефакты
# rm -rf ./artifacts
    