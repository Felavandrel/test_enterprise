# test_enterprise
this is a UI interface developed as a test task
это простой интерфейс управления персоналом предприятия
разработанный в рамках тестового задания. 
Тестировался на Edge, Chrome, FireFox

# Требоваиния
1. Современный браузер (не IE).
2. Работает на каскадных стилях Bootstrap 5 (в плане визуализации)

# Установка
скачать файлы: 
1. enterprise.html <br/>
2. enterprise.js <br/>
3. enterprise.css <br/>
в какую-либо папку и запустить файл enterprise.html в браузере (скрипты должны быть включены в настройках браузера).

# Содержание
enterprise.html - файл с HTML разметкой для запуска в браузере <br/>
enterprise.js - файл со скриптами JS <br/>
enterprise.css - каскадные стили <br/>
enterprise.ts - файл скриптов, основное приложение <br/>
functions.ts - файл скриптов, доп функции <br/>
interaction.ts - файл скриптов, всё что относится к взаимодействию компонентов <br/>
interfaces.ts - файл скриптов, интерфейсы <br/>
utilities.ts - файл скриптов, вспомогательные утилиты <br/>

# Описание работы 
При запуске скрипта запускается функция инициализации приложения "enterprise_init", подцепленная на событие загрузки всех элементов окна.
Дальше скрипт пытается найти элемент с классом CSS "enterprise", если находит то создает объект(ы) Engine, который является движком приложения. 
Движок приложения контролирует все компоненты прользовательского интерфейса. При инициализации движка парсятся данные с сервера (эмуляция JSON)
для преобразования их в соотв. классы: директор, глава отдела, инспектор, рабочий. Как указано в задании. В браузере генерируется интерактивная таблица, на основании
этих данных. Записи в таблице можно сортировать по отделу и должности. Также создаются два селекта для фильтрации по отделу и должности в таблице. 
При нажатии на ссылку-имя работника появляется окно с детальными данными о работнике, при клике на ссылку "Повысить" работник повышается в должности, если 
это возможно. Приложение предусматривает ограничение на повышение работника, если должность занята (в данном случае нельзя повысить работника до начальника отдела, 
если начальник отдела не уволен или не понижен). Функционал понижения или увольнения работника не предусмотрен заданием. 
