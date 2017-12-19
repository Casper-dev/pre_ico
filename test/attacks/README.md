# Casper ICO smart contract security check

- Source: [Casper.sol](https://github.com/Casper-dev/contract/blob/master/contracts/Casper.sol)
- Known possible attacks: [Paper][2]

## Проверка общих [рекомендаций Airalab][1]

| № | Описание                                             | |
|---|:-----------------------------------------------------|:--------------------------:|
| 1 | Внешние вызовы                                       | ![check](https://cdn.rawgit.com/primer/octicons/62c672732695b6429678bcd321520c41af109475/build/svg/check.svg) |
| 2 | Изоляция внешних вызовов в отдельной транзакции      | ![check](https://cdn.rawgit.com/primer/octicons/62c672732695b6429678bcd321520c41af109475/build/svg/check.svg) |
| 3 | Деление целых чисел                                  | ![check](https://cdn.rawgit.com/primer/octicons/62c672732695b6429678bcd321520c41af109475/build/svg/check.svg) |
| 4 | Деление на ноль                                      | ![check](https://cdn.rawgit.com/primer/octicons/62c672732695b6429678bcd321520c41af109475/build/svg/check.svg) |
| 5 | Переполнение переменных                              | ![check](https://cdn.rawgit.com/primer/octicons/62c672732695b6429678bcd321520c41af109475/build/svg/check.svg) |
| 6 | Приоритет изменения состояния над внешним вызовом    | ![check](https://cdn.rawgit.com/primer/octicons/62c672732695b6429678bcd321520c41af109475/build/svg/check.svg) |
| 7 | Перебор динамических массивов                        | ![check](https://cdn.rawgit.com/primer/octicons/62c672732695b6429678bcd321520c41af109475/build/svg/check.svg) |
| 8 | Привязка логики работы к метке времени               | ![check](https://cdn.rawgit.com/primer/octicons/62c672732695b6429678bcd321520c41af109475/build/svg/check.svg) |
| 9 | Миграция данных контракта                            | ![warning](https://cdn.rawgit.com/primer/octicons/62c672732695b6429678bcd321520c41af109475/build/svg/issue-opened.svg) |
|10 | Метки остановки работы                               | ![warning](https://cdn.rawgit.com/primer/octicons/62c672732695b6429678bcd321520c41af109475/build/svg/issue-opened.svg) |
|11 | Метки задержки по времени                            | ![warning](https://cdn.rawgit.com/primer/octicons/62c672732695b6429678bcd321520c41af109475/build/svg/issue-opened.svg) |
|12 | Формальная верификация                               | ![check](https://cdn.rawgit.com/primer/octicons/62c672732695b6429678bcd321520c41af109475/build/svg/check.svg) |


## Известные атаки на контракты Ethereum платформы

| № | Описание                                             |  |
|---|:-----------------------------------------------------|:-------------------:|
| 1 | Атака по глубине стека                               | ![check](https://cdn.rawgit.com/primer/octicons/62c672732695b6429678bcd321520c41af109475/build/svg/check.svg) |
| 2 | Условия гонки                                        | ![check](https://cdn.rawgit.com/primer/octicons/62c672732695b6429678bcd321520c41af109475/build/svg/check.svg) |
| 3 | DoS при исключении в стороннем коде                  | ![check](https://cdn.rawgit.com/primer/octicons/62c672732695b6429678bcd321520c41af109475/build/svg/check.svg) |
| 4 | DoS при выходе за лимит газа                         | ![check](https://cdn.rawgit.com/primer/octicons/62c672732695b6429678bcd321520c41af109475/build/svg/check.svg) |

## Проверка на известные атаки

## Комментарии по коду

Рекомендации Airlab  
1 - [Обзор][9]  
2 - [Обзор][12]  
3 - [Обзор][10]  
4 - [Обзор][11]  
5 - [Обзор][14]  
6 - [Обзор][13]  
7 - [Обзор][15]  
8 - [Обзор][3]  
9 -  
10 -  
11 -  
12 - [Обзор][8]  
Известные атаки  
1 - [Обзор][6]  
2 - [Обзор][7]  
3 - [Обзор][4]  
4 - [Обзор][5]  



[1]: https://github.com/airalab/core/wiki/Security-regulations
[2]: https://eprint.iacr.org/2016/1007.pdf
[3]: https://gitlab.com/casperDev/pre_ico/blob/develop/test/attacks/overviews/1_8_time_logic.md
[4]: https://gitlab.com/casperDev/pre_ico/blob/develop/test/attacks/overviews/2_3_external_code_dos.md
[5]: https://gitlab.com/casperDev/pre_ico/blob/develop/test/attacks/overviews/2_4_gas_limit.md
[6]: https://gitlab.com/casperDev/pre_ico/blob/develop/test/attacks/overviews/2_1_stack_attack.md
[7]:
https://gitlab.com/casperDev/pre_ico/blob/develop/test/attacks/overviews/2_2_race.md
[8]:
https://gitlab.com/casperDev/pre_ico/blob/develop/test/attacks/overviews/1_12_formal_verification.md
[9]:
https://gitlab.com/casperDev/pre_ico/blob/develop/test/attacks/overviews/1_1_external_calls.md
[10]:
https://gitlab.com/casperDev/pre_ico/blob/develop/test/attacks/overviews/1_3_division_of_ints.md
[11]:
https://gitlab.com/casperDev/pre_ico/blob/develop/test/attacks/overviews/1_4_zero_division.md
[12]:
https://gitlab.com/casperDev/pre_ico/blob/develop/test/attacks/overviews/1_2_isolation_of_external_calls.md
[13]:
https://gitlab.com/casperDev/pre_ico/blob/develop/test/attacks/overviews/1_6_condition_change_priority.md
[14]:
https://gitlab.com/casperDev/pre_ico/blob/develop/test/attacks/overviews/1_5_overflows.md
[15]:
https://gitlab.com/casperDev/pre_ico/blob/develop/test/attacks/overviews/1_7_dynamic_arays.md