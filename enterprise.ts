/// <reference path="components.ts" />
/// <reference path="interfaces.ts" />


/**
 * это небольшое приложение, которое получает данные с сервера в виде JSON, парсит данные в локальные классы 
 * задача приложения обеспечить пользовательский интерфейс для управления персоналом компании в рамках тестового задания
 * 
 * Требования: для корректной работы требуется Bootstap 5 (в визуальном плане)
 * 
 * ограничения: не будет работать в барузере IE9 и браузерах более ранних версий,
 * так как отсутствует поддержка classList, могут быть проблемы с addEvent, 
 * element.remove() не будет работать (здесь используется для удаления элементов DOM).
 * Для больших списков не предусмотрена пагинация (разработка в рамках тестового задания)
 * 
 * Автор: Александр Кун
 */
namespace BigEntreprise {

    //записи которые получили от сервера (эмуляция)
    //работники и отделы
    let jsonRecords = '{"departments": [{"name":"исследований боевой магии"}, {"name":"целительства"}, {"name":"главари"}], '+
                        '"employees": [{"name": "Огонь", "familyname": "Полыхаев", "birthday": "12.12.1912", "department": "боевой магии", "position": 3},'+
                        '{"name": "Нестор", "familyname": "Вострый", "birthday": "16.01.1986", "department": "исследований боевой магии", "position": 3},'+
                        '{"name": "Гроза", "familyname": "Мореев", "birthday": "15.05.1895", "department": "исследований боевой магии", "position": 3},'+
                        '{"name": "Лют", "familyname": "Волков", "birthday": "02.02.2020", "department": "исследований боевой магии", "position": 3},'+
                        '{"name": "Егор", "familyname": "Бугров", "birthday": "03.03.2222", "department": "исследований боевой магии", "position": 1},'+
                        '{"name": "Хмырь", "familyname": "Болотнов", "birthday": "03.03.2222", "department": "исследований боевой магии", "position": 2},'+
                        '{"name": "Вера", "familyname": "Незыблемова", "birthday": "16.01.1986", "department": "целительства", "position": 3},'+
                        '{"name": "Надежда", "familyname": "Скромнеева", "birthday": "15.05.1895", "department": "целительства", "position": 3},'+
                        '{"name": "Любовь", "familyname": "Нечайнова", "birthday": "02.02.2020", "department": "целительства", "position": 3},'+
                        '{"name": "Виктория", "familyname": "Спелая", "birthday": "15.03.1995", "department": "целительства", "position": 1},'+
                        '{"name": "Олеся", "familyname": "Лесная", "birthday": "05.04.1953", "department": "целительства", "position": 2},'+
                        '{"name": "Дядька", "familyname": "Черноморов", "birthday": "04.04.0001", "department": "главари", "position": 0}'+
                        ']}';

    //запись об отделе
    class departmentRec {
        public name: string = '';
    }

    //запись о работнике с сервера
    class employeeRec {
        public name: string = '';
        public familyname: string = '';
        public birthday: string = '';
        public department: string = '';
        public position: number = -1;
    }

    //записи
    class Records {
        public departments: departmentRec[] = []; //соотв. записи в JSON 
        public employees: employeeRec[] = [];     //соотв. записи в JSON
    }

    //начальные настройки приложения
    export class Settings {
        connectionString: string = "http://localhost:8080/";       //хост для аякса (не используется)
        className: string = 'enterprise';
    }

    //интерфейск компонента, который использует DOM
    export interface Component {
        get element(): HTMLElement;
    }

    //доступные позиции в корпорации
    enum positionList {
        director,           //директор
        departmentHead,     //глава отдела
        inspector,          //инспектор
        workman             //рабочий
    }

    //должность
    export class Position {
        public id: positionList = positionList.workman;
        public name: string = '';
    }

    //список возможных должностей
    let positions: Position[] = [{id: positionList.director, name: "Директор"}, 
                                 {id: positionList.departmentHead, name: "Главарь отдела"}, 
                                 {id: positionList.inspector, name: "Инспектор"},
                                 {id: positionList.workman, name: "Рабочий"},
                                ]

    /**
     * класс для представления прав человека на соотв. позиции
     */
    export class Right {
        private _id: number = 0;
        private _description: string = '';
        constructor(id: number, description: string) {
            this._id = id;
            this._description = description;
        }

        get description(): string {
            return this._description;
        }
    }

    //создаем базовые права
    let hire = new Right(0, 'нанимать');
    let relax = new Right (1, 'валять дурака');
    let work = new Right(2, 'прилежно работать');
    let workHard = new Right(3, 'много работать');
    let fire = new Right(4, 'увольнять');

    /**
     * класс представляющий отдел предприятия
     */
    export class Department {
        private _id: number = -1;
        private _name: string = '';                 //название отдела
        private _employees: Employee[] = [];          //люди в отделе

        public get name(): string {
            return this._name;
        }

        public set name(v: string) {
            this._name = v;
        }
        /**
         * добавляет человека в отдел
         * @param p человек которого надо добавить
         */
        public addPerson(p: Employee) {
            p.id = this._employees.length;
            p.department = this;
            this._employees.push(p);
        }

        /**
         * удаляет человека из отдела
         * @param p персона которую надо удалить из отдела
         */
        public removePerson(p: Employee) {
            let i = this._employees.indexOf(p);
            this._employees.splice(i,1);
            for(let k=0; k<this._employees.length; k++) {
                this._employees[k].id = k;
            }
        }

        public set id(id: number) {
            this._id = id;
        }

        public get id(): number {
            return this._id;
        }

        /**
         * возвращает список работников в отделе
         */
        public get employes(): Employee[] {
            return this._employees;
        }

        public get emplyeeList(): string[] {       
            let s: string[] = [];
            if (this._employees.length == 0) return s;
            this._employees.forEach((i) => {s.push(i.fullName)});
            return s;
        }
    }

    /**
     * базовая персона
     * представляет собой базовый класс, который будет сам знать как ему отрисовывать свою форму, т.к. реализует интерфейс IVisualComponent 
     * здесь предствлены базовые: имя, фамилия, день рождение человека
     * имеет абстрактный метод для отрисовки формы "о работнике", которая должна быть реализована в субклассах
     */
    export abstract class Person implements Interfaces.IVisualComponent {
        protected _element: HTMLElement | null = null;//элемент DOM
        protected _name: string = '';                 //имя
        protected _familyname: string = '';           //фамилия
        protected _birthday: string = '';             //когда денюха
        
        constructor() {
        }

        abstract draw(parentNode: HTMLElement): any;
        abstract get element(): any;

        public set name(v:string) {
            this._name = v;
        }

        public get name(): string {
            return this._name;
        }

        public get familyname(): string {
            return this._familyname;
        }

        public set familyname(v: string) {
            this._familyname = v;
        }

        public set birthday(v: string) {
            this._birthday = v;
        }

        public get birthday(): string {
            return this._birthday;
        }
        
    }

    /**
     * работничек
     */
    export class Employee extends Person {
        protected _id: number = -1;                                      //порядковый номер
        protected _element: HTMLFieldSetElement;                         //DOM элемент 
        protected _position: Position = positions[3];                    //должность
        protected _department: Department = new Department();            //департамент в котором чел. работает
        
        protected _rights: Right[] = [];                            //права

        constructor() {
            super();
            this._element = document.createElement('fieldset');
        }
        /**
         * отрисовывает объект
         * @param parentNode отцовский элемент в котором будет отрисовываться объект
         */
        public draw(parentNode: HTMLElement) {

        }
        /**
         * элемент DOM объекта
         */
        public get element(): HTMLFieldSetElement {
            return this._element;
        }
      
        //внутри отдела можно назначить чела кем угодно
        public setPosition(p: positionList | null) {
            if (p == null) return;
            let i = positions.findIndex(v => v.id == p);
            if (i != -1) {
                this._position = positions[i];
            }          
        }     

        /**
         * выдает права персонажа
         */
        public set rights(r: Right[]) {
            this._rights = r.slice();
        }

        /**
         * задает права персонажа
         */
        public get rights(): Right[] {
            return this._rights;
        }

        /**
         * выдает должность
         * @returns должность
         */
        public getPosition(): Position{
            return this._position;
        }

        public set id(id: number) {
            this._id = id;
        }

        public get id(): number {
            return this._id;
        }

        public get department(): Department {
            return this._department;
        }

        public set department(v: Department) {
            this._department = v;
        }
        
        /**
         * полное имя работника (формата: Имя Фамилия)
         */
        public get fullName(): string {
            return this._name + ' ' + this._familyname;
        }
    } 

    /**
     * класс директора
     */
    export class Director extends Employee {
        private _subordinates: Employee[] = [];                 //люди в подчинении
        protected _rights: Right[] = [hire, fire, relax];       //права

        constructor() {
            super();
            this.setPosition(positionList.director);
        }
        /**
         * отрисовывает данные
         * @param parentNode отцовский элемент DOM куда будет отрисовываться информация
         */
        public draw(parentNode: HTMLElement) {
            let data: Interfaces.ITableCellElement[][] = [];

            let header: Interfaces.ITableCellElement[] = [new Components.CellElement(null, "Параметр", false), 
                                                          new Components.CellElement(null, "Значение", false)];
            let row1: Interfaces.ITableCellElement[] = [new Components.CellElement(null, 'Имя', false),
                                                       new Components.CellElement(null, this.name, false)]; 
            let row2: Interfaces.ITableCellElement[] = [new Components.CellElement(null, 'Фамилия', false),
                                                       new Components.CellElement(null, this.familyname, false)];
            let row3: Interfaces.ITableCellElement[] = [new Components.CellElement(null, 'Отдел', false),
                                                       new Components.CellElement(null, this._department.name, false)];
            let row4: Interfaces.ITableCellElement[] = [new Components.CellElement(null, 'Должность', false),
                                                       new Components.CellElement(null, this._position.name, false)];
            data.push(header);
            data.push(row1);
            data.push(row2);
            data.push(row3);
            data.push(row4);
            let emp: string[] = this._subordinates.map((e) => {return e.fullName});
            let row5: Interfaces.ITableCellElement[] = [new Components.CellElement(null, 'Работники в подчинении', false),
                                                       new Components.CellElement(null, emp.join(';'), false)];
            data.push(row5); 
            let row6: Interfaces.ITableCellElement[] = [new Components.CellElement(null, 'Oбязанности', false),
                                                       new Components.CellElement(null, this._rights.map((v) => {return v.description}).join(';'), false)];  
            data.push(row6);                                                    
            let t = new Components.Table(parentNode, data);
        }

        public set subordinates(subordinates: Employee[]) {
            this._subordinates = subordinates;
        }
    }
    /**
     * класс главы отдела
     */
    export class DepartmentHead extends Employee {
        private _subordinates: Employee[] = [];                 //люди в подчинении
        protected _rights: Right[] = [hire, fire, work];        //права
    //    protected _position: positionList = positionList.departmentHead;

        constructor() {
            super();
            this.setPosition(positionList.departmentHead);
        }

        /**
         * отрисовывает данные
         * @param parentNode отцовский элемент, куда отрисовываются данные
         */
        public draw(parentNode: HTMLElement) {
            let data: Interfaces.ITableCellElement[][] = [];

            let header: Interfaces.ITableCellElement[] = [new Components.CellElement(null, "Параметр", false), 
                                                          new Components.CellElement(null, "Значение", false)];
            let row1: Interfaces.ITableCellElement[] = [new Components.CellElement(null, 'Имя', false),
                                                       new Components.CellElement(null, this.name, false)]; 
            let row2: Interfaces.ITableCellElement[] = [new Components.CellElement(null, 'Фамилия', false),
                                                       new Components.CellElement(null, this.familyname, false)];
            let row3: Interfaces.ITableCellElement[] = [new Components.CellElement(null, 'Отдел', false),
                                                       new Components.CellElement(null, this._department.name, false)];
            let row4: Interfaces.ITableCellElement[] = [new Components.CellElement(null, 'Должность', false),
                                                       new Components.CellElement(null, this._position.name, false)];
            data.push(header);
            data.push(row1);
            data.push(row2);
            data.push(row3);
            data.push(row4);
            let emp: string[] = this._department.emplyeeList.filter((v) => v != this.fullName);
            let row5: Interfaces.ITableCellElement[] = [new Components.CellElement(null, 'Работники в подчинении', false),
                                                       new Components.CellElement(null, emp.join(';'), false)];
            data.push(row5);
            let id = this._department.employes.findIndex((i)=>i.getPosition().id == positionList.departmentHead);
            let row6: Interfaces.ITableCellElement[] = [new Components.CellElement(null, 'Oбязанности', false),
                                                       new Components.CellElement(null, this._rights.map((v) => {return v.description}).join(';'), false)];  
            data.push(row6);
                         
            let t = new Components.Table(parentNode, data);
        }

        public set subordinates(subordinates: Employee[]) {
            this._subordinates = subordinates;
        }
    }

    /**
     * класс инспектора
     */
    export class Inspector extends Employee {
        protected _rights: Right[] = [workHard]; //права инспектора
    //    protected _position: positionList = positionList.inspector;

        constructor() {
            super();
            this.setPosition(positionList.inspector);
        }

        public draw(parentNode: HTMLElement) {
            let data: Interfaces.ITableCellElement[][] = [];

            let header: Interfaces.ITableCellElement[] = [new Components.CellElement(null, "Параметр", false), 
                                                          new Components.CellElement(null, "Значение", false)];
            let row1: Interfaces.ITableCellElement[] = [new Components.CellElement(null, 'Имя', false),
                                                       new Components.CellElement(null, this.name, false)]; 
            let row2: Interfaces.ITableCellElement[] = [new Components.CellElement(null, 'Фамилия', false),
                                                       new Components.CellElement(null, this.familyname, false)];
            let row3: Interfaces.ITableCellElement[] = [new Components.CellElement(null, 'Отдел', false),
                                                       new Components.CellElement(null, this._department.name, false)];
            let row4: Interfaces.ITableCellElement[] = [new Components.CellElement(null, 'Должность', false),
                                                       new Components.CellElement(null, this._position.name, false)];
            data.push(header);
            data.push(row1);
            data.push(row2);
            data.push(row3);
            data.push(row4);
            let id = this._department.employes.findIndex((i)=>i.getPosition().id == positionList.departmentHead);
            if (id != -1) {
                let row4: Interfaces.ITableCellElement[] = [new Components.CellElement(null, 'Руководитель', false),
                                                       new Components.CellElement(null, this._department.employes[id].name + ' ' + this._department.employes[id].familyname, false)];
                data.push(row4);
            }
            let row5: Interfaces.ITableCellElement[] = [new Components.CellElement(null, 'Oбязанности', false),
                                                       new Components.CellElement(null, this._rights.map((v) => {return v.description}).join(';'), false)];  
            data.push(row5);
                         
            let t = new Components.Table(parentNode, data);
        }
    }

    export class Worker extends Employee {
        protected _rights: Right[] = [workHard];
    //    protected _position: positionList = positionList.workman;

        constructor() {
            super();
            this.setPosition(positionList.workman);
        }

        public draw(parentNode: HTMLElement) {
            let data: Interfaces.ITableCellElement[][] = [];

            let header: Interfaces.ITableCellElement[] = [new Components.CellElement(null, "Параметр", false), 
                                                          new Components.CellElement(null, "Значение", false)];
            let row1: Interfaces.ITableCellElement[] = [new Components.CellElement(null, 'Имя', false),
                                                       new Components.CellElement(null, this.name, false)]; 
            let row2: Interfaces.ITableCellElement[] = [new Components.CellElement(null, 'Фамилия', false),
                                                       new Components.CellElement(null, this.familyname, false)];
            let row3: Interfaces.ITableCellElement[] = [new Components.CellElement(null, 'Отдел', false),
                                                       new Components.CellElement(null, this._department.name, false)];
            let row4: Interfaces.ITableCellElement[] = [new Components.CellElement(null, 'Должность', false),
                                                       new Components.CellElement(null, this._position.name, false)];
            data.push(header);
            data.push(row1);
            data.push(row2);
            data.push(row3);
            data.push(row4);
            let id = this._department.employes.findIndex((i)=>i.getPosition().id == positionList.departmentHead);
            if (id != -1) {
                let row4: Interfaces.ITableCellElement[] = [new Components.CellElement(null, 'Руководитель', false),
                                                       new Components.CellElement(null, this._department.employes[id].name + ' ' + this._department.employes[id].familyname, false)];
                data.push(row4);
            }
            let row5: Interfaces.ITableCellElement[] = [new Components.CellElement(null, 'Oбязанности', false),
                                                       new Components.CellElement(null, this._rights.map((v) => {return v.description}).join(';'), false)];  
            data.push(row5);
                         
            let t = new Components.Table(parentNode, data);
        }
    }

    /**
     * this is the engine of the all the app
     * it controlls all components
     */
    export class Engine {
        private _element: HTMLDivElement;                                   //main element 
        private _settings: Settings = new Settings();                       //this is component settings
        private _departments: Department[] = [];                            //отделы
        private _occupationSortOrder: boolean = false;                      //флаг способа сортировки
        private _departmentSortOrder: boolean = false;                      //флаг способа сортировки
        private _employeeList: Components.Table | null = null;              //интерактивная таблица списка работников
        private _people: Employee[] = [];                                   //список всех людей
        private _selectorPosition: Components.Select | null = null;         //селектор фильтрации по должности
        private _selectorDepartment: Components.Select | null = null;       //селектор фильтрации по отделу
        private _detailsWindow: Components.Window;                          //окно детальных данных о работнике
        private _messagesSpot: HTMLDivElement | undefined = undefined;      //место куда кастуется сообщение в DOM
       
        constructor(element: HTMLDivElement) {
            this._element = element;
            //место для вывода сообщений
            let mss = this._element.getElementsByClassName('messages-spot') as HTMLCollectionOf<HTMLDivElement>;
            if (mss && mss.length > 0) {
                this._messagesSpot = mss[0];
            }
            let records: Records = JSON.parse(jsonRecords);
            if (records !== undefined) {
                this.getDepartments(records);
                this.getEmployes(records); 
                
                let d = this.findDirector();
                if (d != null) (d as Director).subordinates = [this._departments[0].employes[0]];
            } else {
                console.log('Отсуствуют записи в БД или ошибка парсинга JSON');
            }
            //создаем элемент интерфейса
            let row: HTMLDivElement  = document.createElement('div');
            let col: HTMLDivElement  = document.createElement('div');
            row.classList.add('row');
            col.classList.add('col');
            //панель на которой размещаются элементы управления (селекторы фильтра)
            let selectorPanel = new Components.FormPanel(col);
            selectorPanel.element.classList.add('mb-3');
            selectorPanel.legendText = 'Выбрать по:';
            //создаем селекты фильтрации
            this.createPositionSelect(selectorPanel.element);
            this.createDepartmentSelect(selectorPanel.element);
            row.appendChild(col);
            
            let row1: HTMLDivElement  = document.createElement('div');
            let col1: HTMLDivElement  = document.createElement('div');
            row1.classList.add('row');
            col1.classList.add('col');
            //создаем ссылочки на всех людей
            this._people = this.allThePeople();
            
            this.publishEmployeeList(col1);
            row1.appendChild(col1);
            this._element.appendChild(row);
            this._element.appendChild(row1);
            //создаем окно для детальной информации
            this._detailsWindow = new Components.Window(this._element);
            
        }    
        /**
         * метод ищет директора среди всех записей
         * выдает первого попавшегося
         * @returns директора
         */
        private findDirector(): Employee | null {
            let result: Employee | null = null;
            let next: boolean = true;
            //прочесываем все массивы
            for(let i = 0; i < this._departments.length && next; i++) {
                for(let j = 0; j < this._departments[i].employes.length; j++) {
                    if (this._departments[i].employes[j].getPosition().id == positionList.director) {
                        result = this._departments[i].employes[j];
                        next = false;
                        break;
                    }
                }
            }
            return result;
        }
        /**
         * создаёт и настраивает компонент для сортировка должности
         * @param parentNode родительский узел, в котором будет создан элемент компонента выбора
         */
        private createPositionSelect(parentNode: HTMLElement) {
            this._selectorPosition = new Components.Select(parentNode, '');
            this._selectorPosition.label = 'должности';
            this._selectorPosition.addOption(new Components.Option('-1', 'показать все'));
            for(let i = 0; i < positions.length; i++) {
                this._selectorPosition.addOption(new Components.Option(positions[i].id.toString(), positions[i].name));
            }
            this._selectorPosition.onSelect = (sender: Components.Select) => {
                this._people = this.allThePeople();
                //применяем фильтры
                if (this._selectorDepartment && this._selectorDepartment?.getSelectedValue() != '-1') {
                    this.filterEmployeeListByDepartment(parseInt(this._selectorDepartment.getSelectedValue()));
                }
                if (parseInt(sender.getSelectedValue()) != -1) {
                    this.filterEmployeeListByPosition(parseInt(sender.getSelectedValue())); 
                } 

                let data = this.bodyData(this._people);
                this._employeeList?.appendBody(data);
            }
        }
        /**
         * создаёт и настраивает компонент для сортировка отдела
         * @param parentNode родительский узел, в котором будет создан элемент компонента выбора
         */
        private createDepartmentSelect(parentNode: HTMLElement) {
            this._selectorDepartment = new Components.Select(parentNode, '');
            this._selectorDepartment.label = 'отделу';
            this._selectorDepartment.addOption(new Components.Option('-1', 'показать все'));
            for(let i = 0; i < this._departments.length; i++) {
                this._selectorDepartment.addOption(new Components.Option(this._departments[i].id.toString(), this._departments[i].name));
            }
            //отработчик на выбор одной из опций, фильтрует народ в теле таблицы по выбранным фильтрам
            this._selectorDepartment.onSelect = (sender: Components.Select) => {
                this._people = this.allThePeople();
                if (this._selectorPosition && this._selectorPosition?.getSelectedValue() != '-1') {
                    this.filterEmployeeListByPosition(parseInt(this._selectorPosition.getSelectedValue()));
                }
                if (parseInt(sender.getSelectedValue()) != -1) {
                    this.filterEmployeeListByDepartment(parseInt(sender.getSelectedValue())); 
                } 
                let data = this.bodyData(this._people);
                this._employeeList?.appendBody(data);
            }
        }

        /**
         * создает отделы по данным из БД
         * если нет записей ничего не делает
         * @param records записи из БД
         * @returns 
         */
        private getDepartments(records: Records) {
            if (records.departments.length == 0) return;
            if (records.departments.length > 0) {
                for(let i = 0; i < records.departments.length; i++) {
                    let d = new Department();
                    d.id = i;
                    d.name = records.departments[i].name;
                    this._departments.push(d);
                }
            }
        }

        /**
         * создает работников из записей БД в соотв. с занимаемой должностью выраженной enum position
         * если нет записей ничего не делает
         * @param records записи из БД
         */
        private getEmployes(records: Records) {
            if (records.employees.length == 0) return;
            for(let j = 0; j < records.employees.length; j++) {
                if (records.employees[j].position == positionList.director) {
                    this.createDirector(records.employees[j]);
                } else if (records.employees[j].position == positionList.departmentHead) {
                    this.createDepHead(records.employees[j]);
                } else if (records.employees[j].position == positionList.inspector) {
                    this.createInspector(records.employees[j]);
                } else if (records.employees[j].position == positionList.workman) {
                    this.createWorker(records.employees[j]);
                } else {
                    console.log(`Не могу создать объект работника для записи ${records.employees[j].name} ${records.employees[j].familyname} т.к. позиция не соотв. позиции в приложении`);
                }
            }
        } 

        /**
         * метод создаёт директора из записи БД
         * @param record запись о работнике
         */
        public createDirector(record: employeeRec) {
            let e = new Director();
            e.name = record.name;
            e.familyname = record.familyname;
            e.birthday = record.birthday;
            let i = this._departments.findIndex(v=>v.name === record.department);
            if (i != -1) {
                this._departments[i].addPerson(e);
            } else {
                console.log(`Не могу найти отдел с названием ${record.department} чтоб добавить работника ${record.name} ${record.familyname}`);
            }
        }

        /**
         * метод создаёт главу отдела из записи БД
         * @param record запись о работнике
         */
        public createDepHead(record: employeeRec) {
            let e = new DepartmentHead();
            e.name = record.name;
            e.familyname = record.familyname;
            e.birthday = record.birthday;
            let i = this._departments.findIndex(v=>v.name === record.department);
            if (i != -1) {
                this._departments[i].addPerson(e);
            } else {
                console.log(`Не могу найти отдел с названием ${record.department} чтоб добавить работника ${record.name} ${record.familyname}`);
            }
        }

        /**
         * метод создаёт инспектора из записи БД
         * @param record запись о работнике
         */
        public createInspector(record: employeeRec) {
            let e = new Inspector();
            e.name = record.name;
            e.familyname = record.familyname;
            e.birthday = record.birthday;
            let i = this._departments.findIndex(v=>v.name === record.department);
            if (i != -1) {
                this._departments[i].addPerson(e);       
            } else {
                console.log(`Не могу найти отдел с названием ${record.department} чтоб добавить работника ${record.name} ${record.familyname}`);
            }
        }

         /**
         * метод создаёт работника из записи БД
         * @param record запись о работнике
         */
        public createWorker(record: employeeRec) {
            let e = new Worker();
            e.name = record.name;
            e.familyname = record.familyname;
            e.birthday = record.birthday;
            let i = this._departments.findIndex(v=>v.name === record.department);
            if (i != -1) {
                this._departments[i].addPerson(e);       
            } else {
                console.log(`Не могу найти отдел с названием ${record.department} чтоб добавить работника ${record.name} ${record.familyname}`);
            }
        }
        
        /**
         * удаляет из DOM список работников
         */
        public removeEmpoleeList() {
            if (this._employeeList == null) return;
            this._employeeList.element.remove();
        }

        private allThePeople (): Employee[] {
            let result: Employee[] = []
            if (this._departments.length == 0) return result;
            for(let i = 0; i < this._departments.length; i++) {
                for(let p = 0; p < this._departments[i].employes.length; p++) {
                    result.push(this._departments[i].employes[p]);
                }
            } 

            return result;
        }

        /**
         * создает список всех работников по департаментам
         * @param sortOrder порядок сортировки 'department' - по отделу, 'position' - по занимаемой должности
         */
        private sortEmployes(sortOrder: void | string) {

            if (this._people.length == 0) return;

            //сортируем как надо
            //по отделу
            if (sortOrder == 'department') {
                if (this._departmentSortOrder) {
                    this._people.sort(function (a,b) {return a.department.id - b.department.id;});
                } else {
                    this._people.sort(function (a,b) {return b.department.id - a.department.id;});
                }
                this._departmentSortOrder = !this._departmentSortOrder;
            } else if (sortOrder == 'position') { //по должности
                if (this._occupationSortOrder) {
                    this._people.sort(function (a,b) { return a.getPosition().id - b.getPosition().id});
                } else {
                    this._people.sort(function (a,b) { return b.getPosition().id - a.getPosition().id});
                } 
                this._occupationSortOrder = !this._occupationSortOrder;         
            }
        }   
        /**
         * фильтрует людей по должности
         * @param id номер должности
         * @param people список людей
         * @returns фильтрованный список людей (только с нужным id должности)
         */
        private filterEmployeeListByPosition(id: number) {
            this._people = this._people.filter((i)=>i.getPosition().id == id);
        } 
        /**
         * фильтрует людей по отделу
         * @param id нормер должности
         * @param people список людей
         * @returns фильтрованный список людей (только с нужным id отдела) 
         */
        private filterEmployeeListByDepartment(id: number) {
            this._people = this._people.filter((i)=>i.department.id == id);
        }  

        /**
         * печатает список работников в DOM
         * @returns 
         */
        public publishEmployeeList(parentNode: void | HTMLElement) {
            //массив для хранения всех работников из всех отделов
            let allThePeople: Employee[] = this.allThePeople();                                  
            if (allThePeople.length == 0) {
                console.log('Не могу распечатать список работников, так как нет отделов по которым нужно искать');
                return;
            }         
            //элемент заголовка таблицы
            let header: Interfaces.ITableCellElement[] = this.headerData(); 
            //тело таблицы
            let body: Interfaces.ITableCellElement[][] = this.bodyData(allThePeople);   
            //вся таблица     
            let data: Interfaces.ITableCellElement[][] = [];
            data.push(header);
            body.forEach((i)=>{data.push(i)});
            //если не задан корневой узел, добавляем в базового родителя
            if (parentNode) {
                this._employeeList = new Components.Table(parentNode, data);
            } else {
                this._employeeList = new Components.Table(this._element, data);
            }           
        }
        /**
         * создает заголовок таблицы
         * ограничения: не проверяет длину массива тела
         * @returns возвращает массив заголовка
         */
        private headerData(): Interfaces.ITableCellElement[] {
            //создаем ссылки, по которым будем сортировать списки
            let u1 = new Utilities.Url();
            u1.schema = 'https';
            u1.domain = 'enterprise.com';
            u1.path = 'employes';
            u1.parameters?.Add("sortOrder", "position");
            let u2 = new Utilities.Url();
            u2.schema = 'https';
            u2.domain = 'enterprise.com';
            u2.path = 'employes';
            u2.parameters?.Add("sortOrder", "department");
            //создаем заголовок таблицы
            let header: Interfaces.ITableCellElement[] = [new Components.CellElement(null, "Имя", false), 
                                                          new Components.CellElement(null, "Фамилия", false),
                                                          new Components.CellElement(null, "Дата рождения", false),
                                                          new Components.Anchor("Должность", true, u1, this.onPositionSort),
                                                          new Components.Anchor("Отдел", true, u2, this.onDepartmentSort),
                                                          new Components.CellElement(null, "Действие", false),
                                                         ];
            return header;
        }

        /**
         * создает массив данных по работникам для распечатки
         * ограничения: не проверяет длину массива заголовка
         * @param employees список всех работников
         * @returns возвращает массив данных о работниках 
         */
        private bodyData(employees: Employee[]): Interfaces.ITableCellElement[][] {
            let result: Interfaces.ITableCellElement[][] = [];
            if (employees.length == 0) return result;

            for(let i = 0; i < employees.length; i++) {
                //TODO: уменьшить код при создании ссылок
                let u1 = new Utilities.Url();
                u1.schema = 'https';
                u1.domain = 'enterprise.com';
                u1.path = 'employes';
                u1.parameters?.Add("employeeId", employees[i].id.toString());
                u1.parameters?.Add("departmentId", employees[i].department.id.toString());

                let u2 = new Utilities.Url();
                u2.schema = 'https';
                u2.domain = 'enterprise.com';
                u2.path = 'employes';
                u2.parameters?.Add("action", "promote");
                u2.parameters?.Add("employeeId", employees[i].id.toString());
                u2.parameters?.Add("departmentId", employees[i].department.id.toString());

                let row: Interfaces.ITableCellElement[] = [new Components.Anchor(employees[i].name, true, u1, this.onNameClick),
                                                           new Components.CellElement(null, employees[i].familyname, false),
                                                           new Components.CellElement(null, employees[i].birthday, false),
                                                           new Components.CellElement(null, employees[i].getPosition().name, false),
                                                           new Components.CellElement(null, employees[i].department.name, false),
                                                           new Components.Anchor("Повысить", true, u2, this.onPromoteClick)
                                                          ];     
                result.push(row);         
            }
            return result;
        }

        /**
         * создает сообщение
         * @param type тип сообщения
         * @param text текст сообщения
         */
        private addNewMessage(type: Components.messageType, text: string) {
            if (this._messagesSpot) {
                //зверски вычищаем детей до последнего внутри родительского нода бууугагагага
                while (this._messagesSpot.lastChild) {
                    this._messagesSpot.removeChild(this._messagesSpot.lastChild);
                }
                //чтоб создать стандартное новое сообщение
                let newMessage = new Components.Message(this._messagesSpot, text, type);
            }
        }

        /**
         * кастует работника в директора
         * @param emp базовый класс работника
         * @returns возвращает класс директора
         */
        private castNewDirector(emp: Employee): Director {
            let np = new Director();
            np.id = emp.id;
            np.birthday = emp.birthday;
            np.familyname = emp.familyname;
            np.name = emp.name;
            np.department = emp.department;
            np.subordinates = [];
            return np;
        }

        /**
         * кастует работника в главу отдела
         * @param emp базовый класс работника
         * @returns возвращает класс директора
         */
        private castNewDepartmentHead(emp: Employee): DepartmentHead {
            let np = new DepartmentHead();
            np.id = emp.id;
            np.birthday = emp.birthday;
            np.familyname = emp.familyname;
            np.name = emp.name;
            np.department = emp.department;
            np.subordinates = [];
            return np;
        }

        /**
         * кастует работника в директора
         * @param emp базовый класс работника
         * @returns возвращает класс директора
         */
        private castNewInspector(emp: Employee): Inspector {
            let np = new Inspector();
            np.id = emp.id;
            np.birthday = emp.birthday;
            np.familyname = emp.familyname;
            np.name = emp.name;
            np.department = emp.department;
            return np;
        }

        /**
         * отработчик события на нажатие ссылки "повысить"
         * @param sender компонент отработчика
         * @param ev событие, генерируемое браузером
         */
        private onPromoteClick = (sender: Components.Anchor, ev:Event) => {
            let pid = sender.url.parameters?.GetItem('employeeId');
            let did = sender.url.parameters?.GetItem('departmentId');

            if (pid && did) {
                let p = parseInt(pid);
                let d = parseInt(did);
                let pos = this._departments[d].employes[p].getPosition();
                let nextLevel = pos.id-1; //повышение происходит от большего к меньшему, т.е. 0 - директор, 3 - рабочий, смекаешь?
                //здесь мы  проверяем можно ли повысить работника и кастуем его в соотв. класс с соотв. возможностями
                if (this.IcanGetNewPosition(nextLevel, d)) {
                    if (nextLevel == positionList.departmentHead) {
                        this._departments[d].employes[p] = this.castNewDepartmentHead(this._departments[d].employes[p]);
                    } else if (nextLevel == positionList.inspector) {
                        this._departments[d].employes[p] = this.castNewInspector(this._departments[d].employes[p]);
                    } else if (nextLevel == positionList.director) {
                        this._departments[d].employes[p] = this.castNewDirector(this._departments[d].employes[p]);
                    }
                    this._departments[d].employes[p].setPosition(nextLevel);
                }          
            }
            //обновляем данные в таблице
            let e = new Event('change');
            this._selectorDepartment?.element.dispatchEvent(e);
        }

        /**
         * Метод проверяет может ли человек занять новую позицию, 
         * по "бизнес" логике метода человек не может занять новую позицию, пока должность не освобождена
         * также не может занять позицию выше директора. Еще функция выводит сообщения о невозможности действия
         * @param nextLevel номер новой позиции
         * @param departmentId номер отдела работника
         * @returns правду если человек может занять новую должность и ложь, если нет
         */
        private IcanGetNewPosition(nextLevel: number, departmentId: number): boolean  {
            let result: boolean = false;
            //проверяем возможность занять новую должность
            if (nextLevel == positionList.director) { 
                let bossId = this._departments[departmentId].employes.findIndex((e) => e.getPosition().id == positionList.director); 
                //если босс уже есть, то сообщаем об этом  
                if (bossId != -1) {
                    this.addNewMessage(Components.messageType.warning, `Ой, ошибочка вышла. Нельзя повысить работника до "${positions[positionList.director].name}" пока с этой должности не уволен человек`);               
                } else {
                    result = true;
                }                                          
            } else if (nextLevel == positionList.departmentHead) {
                let bossId = this._departments[departmentId].employes.findIndex((e) => e.getPosition().id == positionList.departmentHead);   
                if (bossId != -1) {
                    this.addNewMessage(Components.messageType.warning, `Ой, ошибочка вышла. Нельзя повысить работника до "${positions[positionList.departmentHead].name}" пока с этой должности не уволен человек`);
                } else {
                    result = true; 
                }        
            } else if (nextLevel == positionList.inspector) {
                result = true;
            } else if (nextLevel < positionList.director) {
                this.addNewMessage(Components.messageType.warning, `Нельзя повысить работника выше должности "${positions[positionList.director].name}"`);
            }

            return result;
        }

        /**
         * отработчик события на клик мыши по имени работника
         * рисует форму с детальными данными о работнике
         * @param sender компонент отработчика
         * @param ev событие
         */
        private onNameClick = (sender: Components.Anchor, ev:Event) => {
            //clear DOM inside the body window
            while (this._detailsWindow.body.lastChild) {
                this._detailsWindow.body.removeChild(this._detailsWindow.body.lastChild);
            }

            this._detailsWindow.header.innerHTML = 'Детально о работнике'
            //достаем id по отделу и по человеку
            let pid = sender.url.parameters?.GetItem('employeeId');
            let did = sender.url.parameters?.GetItem('departmentId');

            if (pid && did) {
                let p = parseInt(pid);
                let d = parseInt(did);
                //отрисовываем в окне данные по челу
                this._departments[d].employes[p].draw(this._detailsWindow.body);
            } else {
                return;
            } 

            this._detailsWindow.show();
        }

        /**
         * отработчик события на клик мыши по ссылке сортировки отдела
         * @param sender компонент отработчика
         * @param ev событие
         */
        private onDepartmentSort = (sender: Components.Anchor, ev:Event) => {
            this.sortEmployes('department');
            let data = this.bodyData(this._people);
            if (data != undefined ) this._employeeList?.appendBody(data);
        }

        /**
         * отработчик события на клик мыши по ссылке сортировки должности
         * @param sender компонент отработчика
         * @param ev событие
         */
        private onPositionSort = (sender: Components.Anchor, ev:Event) => {
            this.sortEmployes('position');
            let data = this.bodyData(this._people);
            this._employeeList?.appendBody(data);
        }

        public get Settings(): Settings {
            return this._settings;
        }

        public get element(): HTMLDivElement {
            return this._element;
        }
    }
}

//функция инициализации приложени, единая точка входа в приложение
function enterprise_init () {
    let settings: BigEntreprise.Settings = new BigEntreprise.Settings();

    let el: HTMLCollectionOf<HTMLDivElement> = document.getElementsByClassName(settings.className) as HTMLCollectionOf<HTMLDivElement>;

    //создаем движки приложения (если элементов с классом enterprise несколько)
    for(let i=0; i<el.length; i++) {
        let engine: BigEntreprise.Engine = new BigEntreprise.Engine(el[i]);
    }
}

//подгружает приложение после загрузки страницы
window.addEventListener('load', enterprise_init, false);