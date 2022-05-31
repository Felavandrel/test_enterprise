/// <reference path="functions.ts" />
/// <reference path="interfaces.ts" />
/// <reference path="interaction.ts" />

/**
 * Визуальные компоненты 
 * 
 * Автор: Александр Кун
 */
namespace Components {
    /**
     * standard menu item 
     */
    export class MenuItem {
        private _element: HTMLElement;
        private _owner: Menu;
        private _text: string = "";
        private readonly _onClick = new Interaction.Signal<MenuItem, string>();

        constructor(owner: Menu, text: string) {
            this._element = document.createElement('a');
            this._owner = owner;
            this._text = text;
            this._element.setAttribute('href', '#');
            this._element.innerHTML = text;
            let t = this;
            this._element.addEventListener('click', (e) => {
                e.preventDefault();
                console.log("нажат пункт меню " + t._text);
                t._onClick.trigger(t, t._text);
            });

            //TODO: сделать нормальный вид по бутстрапу
            this._element.classList.add("btn");
            this._element.classList.add("btn-primary");
        }

        /**
         * returns ISignal to add or delete an event handler
         */
        public get onClick(): Interaction.ISignal<MenuItem, string> {
            return this._onClick;
        }

        public get element(): HTMLElement {
            return this._element;
        }
    }

    /**
     * menu
     */
    export class Menu {
        private _element: HTMLElement;
        private _items: MenuItem[] = [];
        private _parentElement: HTMLElement;
        constructor(parent: HTMLElement) {
            this._element = document.createElement('div');
            this._parentElement = parent;
            //TODO: сделать нормальный вид по бутстрапу
            this._element.classList.add("btn-group");
            this._parentElement.appendChild(this._element);
        }
        /**
         * this creates a menu item
         * @param text text that goes as inner HTML of the menu item
         * @param handler onClick event delegate
         */
        public createMenuItem(text: string, handler: (source: MenuItem, data: string) => void) {
            let mi = new MenuItem(this, text);
            mi.onClick.on(handler);
            this._element.appendChild(mi.element);
        }
    }

    /**
     * option of the component element
     */
    export class Option {
        private _element: HTMLOptionElement;
        private _value: string = "";
        private _description: string = "";
        private _selected: boolean = false;

        constructor(value: string, description: string) {
            this._element = document.createElement('option');
            this._element.value = value;
            this._element.innerHTML = description;

            this._value = value;
            this._description = description;
        }

        /**
         * this returns HTML element of the component
         */
        get element(): HTMLOptionElement {
            return this._element;
        }
    }

    export class PanelColumn {
        private _element: HTMLDivElement;
        private _name: string = 'column';

        constructor (parentNode: HTMLElement, initClass: void | string) {
            this._element = document.createElement('div');
            if (initClass) {
                this._element.classList.add(initClass);
            } else {
                this._element.classList.add('col');
            }
            
            parentNode.appendChild(this._element);
        }

        public set name(value: string) {
            this._name = value;
        }

        public get element(): HTMLDivElement {
            return this._element;
        }

    }

    export class FormPanel {
        private _name: string = 'panel';
        private _element: HTMLFieldSetElement;
        private _legend: HTMLLegendElement;
        private _columns: PanelColumn[] = [];
        private _parentNode: HTMLElement; 

        constructor(parentNode: HTMLElement) {
            this._element = document.createElement('fieldset');
            this._element.classList.add('row');
            this._parentNode = parentNode;
            this._legend = document.createElement('legend');
            this._legend.classList.add('col-form-label');
            this._legend.classList.add('d-block');

            this._element.appendChild(this._legend);

            parentNode.appendChild(this._element);
        }

        public get parentNode(): HTMLElement {
            return this._parentNode;
        }

        public addColumn(col: PanelColumn) {
            this._columns.push(col);
        }

        public set legendText(value: string) {
            this._legend.innerText = value;
        }

        public set display(value: boolean) {
            if (value) {
                Functions.TogleStates(this._legend, 'd-none', 'd-block');
            } else {
                Functions.TogleStates(this._legend, 'd-block', 'd-none');
            }
        }

        public getColumnByName(name: string): PanelColumn | null {
            let result: PanelColumn | null = null;
            if (this._columns.length == 0) return result;
            let i = this._columns.findIndex(v=>v.name == name);
            if (i == -1) return result;
            return this._columns[i];
        }

        public get element(): HTMLFieldSetElement {
            return this._element;
        }
    }
    /**
     * ссылка как элемент пользовательского интерфейса с доп функциональностью
     */
    export class Anchor implements Interfaces.ITableCellElement {
        private _name: string = "anchor";
        private _element: HTMLAnchorElement;//HTML element
        private _url: Utilities.Url = new Utilities.Url();
        public addAsElement: boolean = true; //Добавлять в таблицу как чайлд-элемент

        public onClick = (sender: Anchor, ev: Event):void => {};
        /**
         * инициализатор объекта
         * @param text текст внутри тега ссылки
         * @param addAsElement true - добавлять в таблицу как элемент DOM, false - нет
         * @param url ссылка
         * @param onClick что делать по клику
         */
        constructor(text: string, addAsElement: void | boolean, url: void | Utilities.Url, onClick?: (sender: Anchor, ev: Event) => void )  {
            this._element = document.createElement('a');
            this._element.innerHTML = text;
            
            if (url) {
                this._url = url;
            } else {
                this._url.schema = 'https';
                this._url.domain = 'enterprise.com';
                this._url.path = '';
            } 

            if (onClick) this.onClick = onClick;
            
            this._element.href = this._url.url;

            if (addAsElement) this.addAsElement = addAsElement;           
            this._element.addEventListener('click', (ev)=>{
                ev.preventDefault();
                this.onClick(this, ev);
            });
        }

        public set url(url: Utilities.Url) {
            this._url = url;
        }

        public get url(): Utilities.Url {
            return this._url;
        }

        public get element(): HTMLAnchorElement {
            return this._element;
        }

        public get value(): string {
            return this._element.innerHTML;
        }
    }

    /**
     * типы сообщений для удобства
     */
    export enum messageType {
        alert, //внимание
        success, //успех
        warning, //предупреждение
        danger  //опасность!
    }

    export class MessageType {
        public type: messageType = messageType.alert;
        public cssClass: string = '';
    }

    /**
     * список возможных сообщений
     */
    let messageTypes: MessageType[] = [{type: messageType.alert, cssClass: 'alert-primary'}, 
                                       {type: messageType.success, cssClass: 'alert-success'},
                                       {type: messageType.warning, cssClass: 'alert-warning'},
                                       {type: messageType.danger, cssClass: 'alert-danger'},
                                      ];

    /**
     * класс сообщения: пользовательского или системного
     */
    export class Message {
        private _element: HTMLDivElement;//HTML element
        private _parentNode: HTMLElement;
        private _closeButton: HTMLButtonElement;

        constructor(parentNode: HTMLElement, text: void | string, type: void | messageType) {
            this._parentNode = parentNode;
            //настройка элемента на каскадных стилях Bootstrap 5
            this._element = document.createElement('div');
            this._element.classList.add('alert'); 
            if (type) {
                this._element.classList.add(messageTypes[type].cssClass);
            } else {
                this._element.classList.add('alert-warning');
            }

            if (text) {
                this._element.innerHTML = text;
            }
            
            this._element.classList.add('alert-dismissible');
            this._element.classList.add('fade');
            this._element.classList.add('show');
            this._element.setAttribute('role', 'alert');
            //это настройка кнопки для закрытия сообщения
            this._closeButton = document.createElement('button');
            this._closeButton.classList.add('btn-close');
            this._closeButton.setAttribute('data-bs-dismiss', 'alert');
            this._closeButton.setAttribute('aria-label', 'close');
            this._closeButton.type = 'button';

            this._element.appendChild(this._closeButton);

            this._parentNode.appendChild(this._element);
        }

        private getCurrentTypeClass(): string {
            let result: string = '';
            for(let i = 0; i < messageTypes.length; i++) {
                if (this._element.classList.contains(messageTypes[i].cssClass)) {
                    result = messageTypes[i].cssClass;
                }
            }

            return result;
        }

        public show() {
            Functions.TogleStates(this._element, 'd-none', 'd-block');        
        }

        public hide() {
            Functions.TogleStates(this._element, 'd-block', 'd-none');
        }

        public Text(text: string) {
            this._element.innerHTML = text;
        }

        /**
         * метод меняет тип сообщения
         * @param type тип сообщения
         */
        public Type(type: messageType) {
            let cs = this.getCurrentTypeClass();
            if (cs != '') {
                Functions.TogleStates(this._element, cs, messageTypes[type].cssClass);
            } 
        }
    }

    /**
     * ячейка таблицы. Может содержать просто текст или элемент DOM
     */
    export class CellElement implements Interfaces.ITableCellElement {
        private _value: string = '';                                        //значение ячеки
        private _element: HTMLElement = document.createElement('span');     //элемент для отрисовки в DOM
        public addAsElement: boolean = false;                               //флаг для обозначения, что отрисовывать в ячеке текст или элемент DOM
        /**
         * 
         * @param element элемент который добавить как ребенка в ячейку
         * @param value значение, которое добавить в ячейку
         * @param addAsElement выводить в ячеке значение или добавлять элемент, если правда, то добавляет элемент
         */
        constructor(element: null | HTMLElement, value: string, addAsElement: boolean) {
            if (element != null) {
                this._element = element;
            }           
            this._value = value;
            this.addAsElement = addAsElement;
        }

        public get element(): HTMLElement {
             return this._element;
        }

        public get value(): string {
            return this._value;
        }
    }
    /**
     * Класс Таблица.
     * Поддерживает массивы данных типа [[0,1][2,3]]
     * Не поддерживает объединение ячеек: варианты типа [[0,1][2]]
     * 
     */
    export class Table {
        private _element: HTMLTableElement;//HTML element
        private _header: HTMLHeadElement;
        private _body: HTMLTableSectionElement;
        private _parentNode: HTMLElement;
        private _data: Interfaces.ITableCellElement[][];

        /**
         * Создает таблицу
         * @param parentNode элемент DOM в котором будет отрисована таблица при ее создании
         * @param data данные в ячейках включая заголовок
         */
        constructor(parentNode: HTMLElement, data: Interfaces.ITableCellElement[][]) {
            this._parentNode = parentNode;
            this._element = document.createElement('table');
            this._element.classList.add('table');
            this._data = data;
            //TODO: проверка таблицы на валидность

            this._header = document.createElement('thead');
            this._body = document.createElement('tbody');

            //создаем заголовок таблицы
            this.createHeader();
            //создаём тело
            this.createBody();

            this._parentNode.append(this._element);
        }

        /**
         * метод создаёт заголовок таблицы из первой строки данных
         * @returns 
         */
        private createHeader() {
            if (this._data.length == 0 || this._data[0].length == 0) return;

            for(let i = 0; i < this._data[0].length; i++) {
                let th = document.createElement('th');
                if (this._data[0][i].addAsElement) {
                    th.appendChild(this._data[0][i].element);
                } else{
                    th.innerHTML = this._data[0][i].value;
                }
                
                this._header.appendChild(th);
            }

            this._element.appendChild(this._header);
        }

        /**
         * метод создаёт тело таблицы, метод должен быть вызван сразу после метода создания заголовка
         * @returns 
         */
        private createBody() {
            if (this._data.length == 0) return;
            for(let i = 1; i < this._data.length; i++) {
                let tr = document.createElement('tr');
                for(let j = 0; j < this._data[i].length; j++) {
                    let td = document.createElement('td');
                    if (this._data[i][j].addAsElement) {
                        td.appendChild(this._data[i][j].element);
                    } else {
                        td.innerHTML = this._data[i][j].value;
                    }
                    tr.appendChild(td);
                }
                this._body.appendChild(tr);
            }

            this._element.appendChild(this._body);
        }

        /**
         * медод обновляет тело таблицы по данным из data
         * ограничения: не проверяет длину массива переданного в метод
         * @param data 
         */
        public appendBody(data: Interfaces.ITableCellElement[][]) {
            //TODO валидация данных
            //удаляем старые данные, чтоб заменить новыми
            if (this._data.length > 1) {
                this._data.splice(1,this._data.length-1);
            }        
            data.forEach((i) => {this._data.push(i)});
            this._body.remove();
            this._body = document.createElement('tbody');
            this.createBody();
        }

        /**
         * метод возвращает элемент таблицы
         */
        public get element(): HTMLTableElement {
            return this._element;
        }

        /**
         * метод возвращает данные по которым отрисовывалась таблица
         */
        public get data(): Interfaces.ITableCellElement[][] {
            return this._data;
        }

        /**
         * метод возвращает данные тела таблицы, без заголовка
         */
        public get bodyData(): Interfaces.ITableCellElement[][] {
            let r: Interfaces.ITableCellElement[][] = [];
            if (this._data.length > 1) {
                r = this._data.slice(1);
            }
            return r;
        }

    }

    /**
     * клас представляет собой оверлейное окно, как в виндоусе
     */
    export class Window {
        private _element: HTMLDivElement;
        private _parentNode: HTMLElement;
        private _header: HTMLHeadingElement;
        private _head: HTMLDivElement;
        private _body: HTMLDivElement;
        private _footer: HTMLDivElement;
        private _closeButton: HTMLAnchorElement;

        /**
         * конструктор окна
         * @param parentNode родительский элемент в который будет помещено окно как DOM
         */
        constructor(parentNode: HTMLElement) {
            this._element = document.createElement('div');
            this._element.classList.add('enterprise-overlay-window'); //shadow p-3 mb-5 bg-body rounded
            this._element.classList.add('d-none');
            this._element.classList.add('shadow');
            this._element.classList.add('p-3');
            this._element.classList.add('mb-5');
            this._element.classList.add('bg-body');
            this._element.classList.add('rounded');
            this._parentNode = parentNode;

            this._head = document.createElement('div');
            this._header = document.createElement('h2');
            this._head.appendChild(this._header);
            this._body = document.createElement('div');
            this._footer = document.createElement('div');

            let col = document.createElement('div');
            this._closeButton = document.createElement('a');
            this._closeButton.classList.add('btn');
            this._closeButton.classList.add('btn-primary');
            this._closeButton.innerHTML = 'Закрыть';
            this._closeButton.addEventListener('click', (ev)=>{
                ev.preventDefault();
                this.hide();
            })
            col.appendChild(this._closeButton);
            this._footer.appendChild(col);
            
            this._element.appendChild(this._head);
            this._element.appendChild(this._body);
            this._element.appendChild(this._footer);


            this._parentNode.appendChild(this._element);
        }

        /**
         * показать окно
         */
        public show() {
            Functions.TogleStates(this._element, 'd-none', 'd-block');
        }

        /**
         * скрыть окно
         */
        public hide() {
            Functions.TogleStates(this._element, 'd-block', 'd-none');
        }

        public get element(): HTMLDivElement {
            return this._element;
        }

        public get body(): HTMLDivElement {
            return this._body;
        }

        public set body(b: HTMLDivElement) {
            this._body = b;
        }

        /**
         * заголовок (элемент h2 по умолчанию)
         */
        public get header(): HTMLHeadingElement {
            return this._header;
        }
    }

    /**
     * Select component
     */
    export class Select {
        private _name: string = "select";
        private _element: HTMLSelectElement;//HTML element
        private _options: Option[] = [];         //list of options
        private _hasher: Utilities.Hasher = new Utilities.Hasher();
        private _currentHash: string = "";
        private _label: HTMLLabelElement;
        private _panelColumn: PanelColumn;
        
        //on select event in order to subscribe on it later
        public onSelect = (sender: Select):void => {};

        /**
         * Создает компонент селект и помещает его в родительский узел
         * @param parentNode родительский элемент в который будет помещен селект как DOM
         * @param panelClass стиль CSS
         */
        constructor(parentNode: HTMLElement, panelClass: void | string) {
            this._element = document.createElement('select');
            this._element.classList.add('form-select');
            let h = new Utilities.Hasher();
            this._element.id = this._name + '_'+ h.getRandomHash(7);

            this._label = document.createElement('label');
            this._label.setAttribute('for', this._element.id);
            this._label.classList.add('form-label');

            if (panelClass) {
                this._panelColumn = new PanelColumn(parentNode, panelClass);
            } else {
                this._panelColumn = new PanelColumn(parentNode);
            } 

            this._panelColumn.element.appendChild(this._label);
            this._panelColumn.element.appendChild(this._element);

            //реакция на выбор
            this._element.addEventListener('change', ()=>{
                this.onSelect(this);
            });

            parentNode.appendChild(this._panelColumn.element);
        }

        public set label(text: string) {
            this._label.innerText = text;
        }

        /**
         * панель на которой отрисовывается элемент селекта
         */
        public get Panel(): PanelColumn {
            return this._panelColumn;
        }

        public get element(): HTMLSelectElement {
            return this._element;
        }

        /**
         * добавляет опции
         * @param options опции
         */
        public addOptions(options: Option[]) {
            for(let i=0; i<options.length; i++) {
                this.addOption(options[i]);
            }
        }

        /**
         * добавляет опцию
         * @param option опция 
         */
        public addOption(option: Option) {
            this._element.add(option.element);
            this._options.push(option);
        }

        public getSelectedValue() {
            let index = this._element.selectedIndex;
            return this._element.options[index].value;
        }
    }
}