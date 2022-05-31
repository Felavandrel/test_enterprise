"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Дополнительные функции
 *
 * Автор: Александр Кун
 */
var Functions;
(function (Functions) {
    /**
     * Function to togle, remove or add CSS class to a HTML element
     * @param obj HTML element
     * @param oldStateCSSClass name of CSS class to remove or to replace. If it equals "" function adds newStateCSSClass
     * @param newStateCSSClass name of CSS class to replace oldSrtateCSSclass. If it equals "" function removes oldSrtateCSSclass
     */
    function TogleStates(obj, oldStateCSSClass, newStateCSSClass) {
        var result = false;
        if (typeof obj === 'undefined' || obj == null)
            return result;
        if (oldStateCSSClass == null)
            return result;
        if (newStateCSSClass == null)
            return result;
        /**
         * checks if target class is in class array.
         * Function for IE
         * @param className target CSS class name to find
         */
        function IECSSclassExists(className) {
            var result = false;
            var o = obj.getAttribute('class');
            if (o != null)
                result = o.indexOf(className) > -1;
            return result;
        }
        /**
         * adds new class to classes array
         * Function for IE
         * @param className CSS class to add
         */
        function IEAddCSSClass(className) {
            if (className == null || className == "")
                return false;
            var classExists = IECSSclassExists(className);
            if (classExists === false) {
                var attr = obj.getAttribute('class');
                var classAttr = attr ? attr : "";
                try {
                    obj.setAttribute('class', classAttr != "" ? classAttr + ' ' + className : className);
                }
                catch (_a) {
                    return false;
                }
            }
            return true;
        }
        /**
         * Removes CSS class from CSS classes array
         * Function for IE
         * @param className CSS class to remove for classes array
         */
        function IERemoveCSSClass(className) {
            if (!className || className == "")
                return false;
            var classExists = IECSSclassExists(className);
            if (classExists === true) {
                try {
                    var o = obj.getAttribute('class');
                    if (o != null) {
                        obj.setAttribute('class', o.replace(className, ''));
                    }
                }
                catch (_a) {
                    return false;
                }
            }
            return true;
        }
        //check if browser has a notion about classList
        if (!obj.classList) {
            if (IECSSclassExists(oldStateCSSClass) === true) {
                if (newStateCSSClass == "") {
                    result = IERemoveCSSClass(oldStateCSSClass);
                }
                else if (oldStateCSSClass === newStateCSSClass) {
                    result = true;
                }
                else {
                    if (IERemoveCSSClass(oldStateCSSClass) === true) {
                        result = IEAddCSSClass(newStateCSSClass);
                    }
                    else {
                        result = false;
                    }
                }
            }
            else {
                if (newStateCSSClass != "") {
                    result = IEAddCSSClass(newStateCSSClass);
                }
            }
        }
        else {
            var classIsThere = false;
            if (typeof obj.classList.contains === 'undefined' || obj.classList.contains == null) {
                classIsThere = IECSSclassExists(oldStateCSSClass);
            }
            else {
                if (oldStateCSSClass == "") {
                    classIsThere = false;
                }
                else {
                    classIsThere = obj.classList.contains(oldStateCSSClass);
                }
            }
            if (classIsThere === true) {
                if (newStateCSSClass == "") {
                    if (!obj.classList.remove) {
                        result = IERemoveCSSClass(oldStateCSSClass);
                    }
                    else {
                        try {
                            obj.classList.remove(oldStateCSSClass);
                        }
                        catch (_a) {
                            return result;
                        }
                        result = true;
                    }
                }
                else if (newStateCSSClass === oldStateCSSClass) {
                    result = true;
                }
                else {
                    if (typeof obj.classList.replace === 'undefined') {
                        if (IERemoveCSSClass(oldStateCSSClass) === true) {
                            result = IEAddCSSClass(newStateCSSClass);
                        }
                        else {
                            result = false;
                        }
                    }
                    else {
                        try {
                            obj.classList.replace(oldStateCSSClass, newStateCSSClass);
                        }
                        catch (_b) {
                            return result;
                        }
                        result = true;
                    }
                }
            }
            else {
                if (newStateCSSClass != "") {
                    if (typeof obj.classList.add === 'undefined') {
                        result = IEAddCSSClass(newStateCSSClass);
                    }
                    else {
                        try {
                            obj.classList.add(newStateCSSClass);
                        }
                        catch (_c) {
                            return result;
                        }
                        result = true;
                    }
                }
            }
        }
        return result;
    }
    Functions.TogleStates = TogleStates;
    function removeEvent(obj, type, listener) {
        if (obj && obj.removeEventListener) {
            obj.removeEventListener(type, listener, false);
        }
    }
    Functions.removeEvent = removeEvent;
    /**
     * Функция получения Аякс интерфейса
     * @returns возвращает аякс
     */
    function getXMLHttpRequestObject() {
        var ajax = null;
        if (window.XMLHttpRequest) {
            ajax = new XMLHttpRequest();
        }
        else if (window.ActiveXObject || "ActiveXObject" in window) {
            var ProgID = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "Microsoft.XMLHTTP"];
            for (var i = 0; i < ProgID.length; i++) {
                try {
                    ajax = new ActiveXObject(ProgID[i]);
                }
                catch (error) {
                    continue;
                }
            }
        }
        return ajax;
    }
    Functions.getXMLHttpRequestObject = getXMLHttpRequestObject;
    /**
         * Function to get "data" attribute from HTML element.
         * @param elem HTML element including "data" attribute
         * @param property Name of a property. Shell be given without "data-", example: "animation-iterations", the function will be looking for "data-animation-iterations"
         */
    function readDataAttr(elem, property) {
        var result = "";
        if (property == "")
            return result;
        if (elem == null)
            return result;
        var attrName = 'data-' + property;
        var gar = elem.getAttribute(attrName);
        result = gar === null ? "" : gar;
        return result;
    }
    Functions.readDataAttr = readDataAttr;
})(Functions || (Functions = {}));
/// <reference path="interfaces.ts" />
/**
 * Утилиты для работы приложения
 *
 * Автор: Александр Кун
 */
var Utilities;
(function (Utilities) {
    /**
     * простой класс для урлов. Его задача просто объединять данные (протокол, домен, параметры и пр.) в урл
     */
    var Url = /** @class */ (function () {
        function Url() {
            this._url = '';
            this._schema = '';
            this._domain = '';
            this._path = '';
            this._params = new Utilities.Dictionary();
        }
        Object.defineProperty(Url.prototype, "schema", {
            get: function () {
                return this._schema;
            },
            set: function (value) {
                this._schema = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Url.prototype, "domain", {
            get: function () {
                return this._domain;
            },
            set: function (value) {
                this._domain = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Url.prototype, "path", {
            get: function () {
                return this._path;
            },
            set: function (value) {
                this._path = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Url.prototype, "url", {
            get: function () {
                this.generateUrl();
                return this._url;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Url.prototype, "parameters", {
            get: function () {
                return this._params;
            },
            set: function (o) {
                this._params = o;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * генерирует урл по заданной схеме, домену, пути и параметрам
         * ограничения: не проверяет отсутствие какого-либо из параметров урла и не учитывает порт
         */
        Url.prototype.generateUrl = function () {
            this._url = this._schema + '://' + this._domain + '/' + this._path + this.paramsToUrl();
        };
        /**
         * создает строку с параметрами для урла
         * @returns строка с параметрами урла
         */
        Url.prototype.paramsToUrl = function () {
            var result = '';
            if (this._params === null)
                return result;
            if (this._params.Size() == 0)
                return result;
            var obj = this._params.GetItems();
            result = '?' + Object.keys(obj).map(function (key) {
                return key + '=' + encodeURIComponent(obj[key]);
            }).join('&');
            return result;
        };
        return Url;
    }());
    Utilities.Url = Url;
    /**
     * класс для работы с простыми хэшами.
     * умеет создавать рандумный хэш из букв и цифр произвольного размера (не для шифровки)
     */
    var Hasher = /** @class */ (function () {
        function Hasher() {
            this._length = 32;
            this._numMin = 48;
            this._numMax = 57;
            this._minUpper = 65;
            this._maxUpper = 90;
            this._minLower = 97;
            this._maxLower = 122;
        }
        Hasher.prototype.getRndCharNumber = function () {
            var n = this._numMax - this._numMin + 1;
            return Math.floor(this._numMin + n * Math.random());
        };
        Hasher.prototype.getRndUpper = function () {
            var n = this._maxUpper - this._minUpper + 1;
            return Math.floor(this._minUpper + n * Math.random());
        };
        Hasher.prototype.getRndLower = function () {
            var n = this._maxLower - this._minLower + 1;
            return Math.floor(this._minLower + n * Math.random());
        };
        /**
         * генерирует рандумный хэш
         * @param len длина хэша
         * @returns строка хэша
         */
        Hasher.prototype.getRandomHash = function (len) {
            var result = "";
            var l = len && len > 0 ? len : this._length;
            for (var i = 0; i < l; i++) {
                var n = Math.floor(Math.random() * 3);
                if (n == 0) {
                    result += String.fromCharCode(this.getRndCharNumber());
                }
                else if (n == 1) {
                    result += String.fromCharCode(this.getRndUpper());
                }
                else if (n == 2) {
                    result += String.fromCharCode(this.getRndLower());
                }
            }
            return result;
        };
        return Hasher;
    }());
    Utilities.Hasher = Hasher;
    /**
     * класс для хранения данных ключ-значение
     */
    var Dictionary = /** @class */ (function () {
        function Dictionary() {
            this._items = {};
            this._count = 0;
            this.DynamicItems = function () { return null; };
        }
        Dictionary.prototype.Merge = function () {
            var di = this.DynamicItems();
            if (di !== null) {
                Object.assign(this._items, di);
            }
        };
        Dictionary.prototype.GetItems = function () {
            return this._items;
        };
        Dictionary.prototype.Items = function (v) {
            this._items = v;
        };
        Dictionary.prototype.Add = function (key, value) {
            if (!this._items.hasOwnProperty(key)) {
                this._count++;
            }
            this._items[key] = value;
        };
        Dictionary.prototype.ContainsKey = function (key) {
            return this._items.hasOwnProperty(key);
        };
        Dictionary.prototype.Size = function () {
            return this._count;
        };
        Dictionary.prototype.GetItem = function (key) {
            return this._items[key];
        };
        Dictionary.prototype.SetValue = function (key, value) {
            if (this._items.hasOwnProperty(key)) {
                this._items[key] = value;
            }
            else {
                this._items[key] = value;
            }
        };
        Dictionary.prototype.RemoveItem = function (key) {
            var value = this._items[key];
            delete this._items[key];
            this._count--;
            return value;
        };
        Dictionary.prototype.GetKeys = function () {
            var keySet = [];
            for (var property in this._items) {
                if (this._items.hasOwnProperty(property)) {
                    keySet.push(property);
                }
            }
            return keySet;
        };
        Dictionary.prototype.Values = function () {
            var values = [];
            for (var property in this._items) {
                if (this._items.hasOwnProperty(property)) {
                    values.push(this._items[property]);
                }
            }
            return values;
        };
        return Dictionary;
    }());
    Utilities.Dictionary = Dictionary;
})(Utilities || (Utilities = {}));
/// <reference path="utilities.ts" />
/// <reference path="components.ts" />
var Interaction;
(function (Interaction) {
    /**
     * the signal component to create multiple deligates
     */
    var Signal = /** @class */ (function () {
        function Signal() {
            this.handlers = [];
        }
        /**
         * this adds handler delegate to the array of deligates
         * @param handler handler function
         */
        Signal.prototype.on = function (handler) {
            this.handlers.push(handler);
        };
        /**
         * this deletes handler deligate from the array of deligates
         * @param handler handler function
         */
        Signal.prototype.off = function (handler) {
            this.handlers = this.handlers.filter(function (h) { return h !== handler; });
        };
        /**
         * this triggers all events
         * @param source source of event
         * @param data data to pass
         */
        Signal.prototype.trigger = function (source, data) {
            this.handlers.slice(0).forEach(function (h) { return h(source, data); });
        };
        /**
         * this expose only interface to avoid unnecessary access
         * @returns
         */
        Signal.prototype.expose = function () {
            return this;
        };
        return Signal;
    }());
    Interaction.Signal = Signal;
    var AsyncSignal = /** @class */ (function () {
        function AsyncSignal() {
            this._handlers = [];
        }
        AsyncSignal.prototype.bind = function (listener, handler) {
            if (this.contains(listener)) {
                this.unbind(listener);
            }
            this._handlers.push({ listener: listener, handler: handler });
        };
        AsyncSignal.prototype.unbind = function (listener) {
            this._handlers = this._handlers.filter(function (h) { return h.listener !== listener; });
        };
        AsyncSignal.prototype.contains = function (listener) {
            return this._handlers.some(function (h) { return h.listener === listener; });
        };
        AsyncSignal.prototype.trigger = function (source, data) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this._handlers.slice(0).map(function (h) { return h.handler(source, data); });
                    return [2 /*return*/];
                });
            });
        };
        AsyncSignal.prototype.triggerAwait = function (source, data) {
            return __awaiter(this, void 0, void 0, function () {
                var promises;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            promises = this._handlers.slice(0).map(function (h) { return h.handler(source, data); });
                            return [4 /*yield*/, Promise.all(promises)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        AsyncSignal.prototype.expose = function () {
            return this;
        };
        return AsyncSignal;
    }());
    Interaction.AsyncSignal = AsyncSignal;
})(Interaction || (Interaction = {}));
/// <reference path="functions.ts" />
/// <reference path="interfaces.ts" />
/// <reference path="interaction.ts" />
/**
 * Визуальные компоненты
 *
 * Автор: Александр Кун
 */
var Components;
(function (Components) {
    /**
     * standard menu item
     */
    var MenuItem = /** @class */ (function () {
        function MenuItem(owner, text) {
            this._text = "";
            this._onClick = new Interaction.Signal();
            this._element = document.createElement('a');
            this._owner = owner;
            this._text = text;
            this._element.setAttribute('href', '#');
            this._element.innerHTML = text;
            var t = this;
            this._element.addEventListener('click', function (e) {
                e.preventDefault();
                console.log("нажат пункт меню " + t._text);
                t._onClick.trigger(t, t._text);
            });
            //TODO: сделать нормальный вид по бутстрапу
            this._element.classList.add("btn");
            this._element.classList.add("btn-primary");
        }
        Object.defineProperty(MenuItem.prototype, "onClick", {
            /**
             * returns ISignal to add or delete an event handler
             */
            get: function () {
                return this._onClick;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MenuItem.prototype, "element", {
            get: function () {
                return this._element;
            },
            enumerable: false,
            configurable: true
        });
        return MenuItem;
    }());
    Components.MenuItem = MenuItem;
    /**
     * menu
     */
    var Menu = /** @class */ (function () {
        function Menu(parent) {
            this._items = [];
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
        Menu.prototype.createMenuItem = function (text, handler) {
            var mi = new MenuItem(this, text);
            mi.onClick.on(handler);
            this._element.appendChild(mi.element);
        };
        return Menu;
    }());
    Components.Menu = Menu;
    /**
     * option of the component element
     */
    var Option = /** @class */ (function () {
        function Option(value, description) {
            this._value = "";
            this._description = "";
            this._selected = false;
            this._element = document.createElement('option');
            this._element.value = value;
            this._element.innerHTML = description;
            this._value = value;
            this._description = description;
        }
        Object.defineProperty(Option.prototype, "element", {
            /**
             * this returns HTML element of the component
             */
            get: function () {
                return this._element;
            },
            enumerable: false,
            configurable: true
        });
        return Option;
    }());
    Components.Option = Option;
    var PanelColumn = /** @class */ (function () {
        function PanelColumn(parentNode, initClass) {
            this._name = 'column';
            this._element = document.createElement('div');
            if (initClass) {
                this._element.classList.add(initClass);
            }
            else {
                this._element.classList.add('col');
            }
            parentNode.appendChild(this._element);
        }
        Object.defineProperty(PanelColumn.prototype, "name", {
            set: function (value) {
                this._name = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PanelColumn.prototype, "element", {
            get: function () {
                return this._element;
            },
            enumerable: false,
            configurable: true
        });
        return PanelColumn;
    }());
    Components.PanelColumn = PanelColumn;
    var FormPanel = /** @class */ (function () {
        function FormPanel(parentNode) {
            this._name = 'panel';
            this._columns = [];
            this._element = document.createElement('fieldset');
            this._element.classList.add('row');
            this._parentNode = parentNode;
            this._legend = document.createElement('legend');
            this._legend.classList.add('col-form-label');
            this._legend.classList.add('d-block');
            this._element.appendChild(this._legend);
            parentNode.appendChild(this._element);
        }
        Object.defineProperty(FormPanel.prototype, "parentNode", {
            get: function () {
                return this._parentNode;
            },
            enumerable: false,
            configurable: true
        });
        FormPanel.prototype.addColumn = function (col) {
            this._columns.push(col);
        };
        Object.defineProperty(FormPanel.prototype, "legendText", {
            set: function (value) {
                this._legend.innerText = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(FormPanel.prototype, "display", {
            set: function (value) {
                if (value) {
                    Functions.TogleStates(this._legend, 'd-none', 'd-block');
                }
                else {
                    Functions.TogleStates(this._legend, 'd-block', 'd-none');
                }
            },
            enumerable: false,
            configurable: true
        });
        FormPanel.prototype.getColumnByName = function (name) {
            var result = null;
            if (this._columns.length == 0)
                return result;
            var i = this._columns.findIndex(function (v) { return v.name == name; });
            if (i == -1)
                return result;
            return this._columns[i];
        };
        Object.defineProperty(FormPanel.prototype, "element", {
            get: function () {
                return this._element;
            },
            enumerable: false,
            configurable: true
        });
        return FormPanel;
    }());
    Components.FormPanel = FormPanel;
    /**
     * ссылка как элемент пользовательского интерфейса с доп функциональностью
     */
    var Anchor = /** @class */ (function () {
        /**
         * инициализатор объекта
         * @param text текст внутри тега ссылки
         * @param addAsElement true - добавлять в таблицу как элемент DOM, false - нет
         * @param url ссылка
         * @param onClick что делать по клику
         */
        function Anchor(text, addAsElement, url, onClick) {
            var _this = this;
            this._name = "anchor";
            this._url = new Utilities.Url();
            this.addAsElement = true; //Добавлять в таблицу как чайлд-элемент
            this.onClick = function (sender, ev) { };
            this._element = document.createElement('a');
            this._element.innerHTML = text;
            if (url) {
                this._url = url;
            }
            else {
                this._url.schema = 'https';
                this._url.domain = 'enterprise.com';
                this._url.path = '';
            }
            if (onClick)
                this.onClick = onClick;
            this._element.href = this._url.url;
            if (addAsElement)
                this.addAsElement = addAsElement;
            this._element.addEventListener('click', function (ev) {
                ev.preventDefault();
                _this.onClick(_this, ev);
            });
        }
        Object.defineProperty(Anchor.prototype, "url", {
            get: function () {
                return this._url;
            },
            set: function (url) {
                this._url = url;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Anchor.prototype, "element", {
            get: function () {
                return this._element;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Anchor.prototype, "value", {
            get: function () {
                return this._element.innerHTML;
            },
            enumerable: false,
            configurable: true
        });
        return Anchor;
    }());
    Components.Anchor = Anchor;
    /**
     * типы сообщений для удобства
     */
    var messageType;
    (function (messageType) {
        messageType[messageType["alert"] = 0] = "alert";
        messageType[messageType["success"] = 1] = "success";
        messageType[messageType["warning"] = 2] = "warning";
        messageType[messageType["danger"] = 3] = "danger"; //опасность!
    })(messageType = Components.messageType || (Components.messageType = {}));
    var MessageType = /** @class */ (function () {
        function MessageType() {
            this.type = messageType.alert;
            this.cssClass = '';
        }
        return MessageType;
    }());
    Components.MessageType = MessageType;
    /**
     * список возможных сообщений
     */
    var messageTypes = [{ type: messageType.alert, cssClass: 'alert-primary' },
        { type: messageType.success, cssClass: 'alert-success' },
        { type: messageType.warning, cssClass: 'alert-warning' },
        { type: messageType.danger, cssClass: 'alert-danger' },
    ];
    /**
     * класс сообщения: пользовательского или системного
     */
    var Message = /** @class */ (function () {
        function Message(parentNode, text, type) {
            this._parentNode = parentNode;
            //настройка элемента на каскадных стилях Bootstrap 5
            this._element = document.createElement('div');
            this._element.classList.add('alert');
            if (type) {
                this._element.classList.add(messageTypes[type].cssClass);
            }
            else {
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
        Message.prototype.getCurrentTypeClass = function () {
            var result = '';
            for (var i = 0; i < messageTypes.length; i++) {
                if (this._element.classList.contains(messageTypes[i].cssClass)) {
                    result = messageTypes[i].cssClass;
                }
            }
            return result;
        };
        Message.prototype.show = function () {
            Functions.TogleStates(this._element, 'd-none', 'd-block');
        };
        Message.prototype.hide = function () {
            Functions.TogleStates(this._element, 'd-block', 'd-none');
        };
        Message.prototype.Text = function (text) {
            this._element.innerHTML = text;
        };
        /**
         * метод меняет тип сообщения
         * @param type тип сообщения
         */
        Message.prototype.Type = function (type) {
            var cs = this.getCurrentTypeClass();
            if (cs != '') {
                Functions.TogleStates(this._element, cs, messageTypes[type].cssClass);
            }
        };
        return Message;
    }());
    Components.Message = Message;
    /**
     * ячейка таблицы. Может содержать просто текст или элемент DOM
     */
    var CellElement = /** @class */ (function () {
        /**
         *
         * @param element элемент который добавить как ребенка в ячейку
         * @param value значение, которое добавить в ячейку
         * @param addAsElement выводить в ячеке значение или добавлять элемент, если правда, то добавляет элемент
         */
        function CellElement(element, value, addAsElement) {
            this._value = ''; //значение ячеки
            this._element = document.createElement('span'); //элемент для отрисовки в DOM
            this.addAsElement = false; //флаг для обозначения, что отрисовывать в ячеке текст или элемент DOM
            if (element != null) {
                this._element = element;
            }
            this._value = value;
            this.addAsElement = addAsElement;
        }
        Object.defineProperty(CellElement.prototype, "element", {
            get: function () {
                return this._element;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(CellElement.prototype, "value", {
            get: function () {
                return this._value;
            },
            enumerable: false,
            configurable: true
        });
        return CellElement;
    }());
    Components.CellElement = CellElement;
    /**
     * Класс Таблица.
     * Поддерживает массивы данных типа [[0,1][2,3]]
     * Не поддерживает объединение ячеек: варианты типа [[0,1][2]]
     *
     */
    var Table = /** @class */ (function () {
        /**
         * Создает таблицу
         * @param parentNode элемент DOM в котором будет отрисована таблица при ее создании
         * @param data данные в ячейках включая заголовок
         */
        function Table(parentNode, data) {
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
        Table.prototype.createHeader = function () {
            if (this._data.length == 0 || this._data[0].length == 0)
                return;
            for (var i = 0; i < this._data[0].length; i++) {
                var th = document.createElement('th');
                if (this._data[0][i].addAsElement) {
                    th.appendChild(this._data[0][i].element);
                }
                else {
                    th.innerHTML = this._data[0][i].value;
                }
                this._header.appendChild(th);
            }
            this._element.appendChild(this._header);
        };
        /**
         * метод создаёт тело таблицы, метод должен быть вызван сразу после метода создания заголовка
         * @returns
         */
        Table.prototype.createBody = function () {
            if (this._data.length == 0)
                return;
            for (var i = 1; i < this._data.length; i++) {
                var tr = document.createElement('tr');
                for (var j = 0; j < this._data[i].length; j++) {
                    var td = document.createElement('td');
                    if (this._data[i][j].addAsElement) {
                        td.appendChild(this._data[i][j].element);
                    }
                    else {
                        td.innerHTML = this._data[i][j].value;
                    }
                    tr.appendChild(td);
                }
                this._body.appendChild(tr);
            }
            this._element.appendChild(this._body);
        };
        /**
         * медод обновляет тело таблицы по данным из data
         * ограничения: не проверяет длину массива переданного в метод
         * @param data
         */
        Table.prototype.appendBody = function (data) {
            var _this = this;
            //TODO валидация данных
            //удаляем старые данные, чтоб заменить новыми
            if (this._data.length > 1) {
                this._data.splice(1, this._data.length - 1);
            }
            data.forEach(function (i) { _this._data.push(i); });
            this._body.remove();
            this._body = document.createElement('tbody');
            this.createBody();
        };
        Object.defineProperty(Table.prototype, "element", {
            /**
             * метод возвращает элемент таблицы
             */
            get: function () {
                return this._element;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Table.prototype, "data", {
            /**
             * метод возвращает данные по которым отрисовывалась таблица
             */
            get: function () {
                return this._data;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Table.prototype, "bodyData", {
            /**
             * метод возвращает данные тела таблицы, без заголовка
             */
            get: function () {
                var r = [];
                if (this._data.length > 1) {
                    r = this._data.slice(1);
                }
                return r;
            },
            enumerable: false,
            configurable: true
        });
        return Table;
    }());
    Components.Table = Table;
    /**
     * клас представляет собой оверлейное окно, как в виндоусе
     */
    var Window = /** @class */ (function () {
        /**
         * конструктор окна
         * @param parentNode родительский элемент в который будет помещено окно как DOM
         */
        function Window(parentNode) {
            var _this = this;
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
            var col = document.createElement('div');
            this._closeButton = document.createElement('a');
            this._closeButton.classList.add('btn');
            this._closeButton.classList.add('btn-primary');
            this._closeButton.innerHTML = 'Закрыть';
            this._closeButton.addEventListener('click', function (ev) {
                ev.preventDefault();
                _this.hide();
            });
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
        Window.prototype.show = function () {
            Functions.TogleStates(this._element, 'd-none', 'd-block');
        };
        /**
         * скрыть окно
         */
        Window.prototype.hide = function () {
            Functions.TogleStates(this._element, 'd-block', 'd-none');
        };
        Object.defineProperty(Window.prototype, "element", {
            get: function () {
                return this._element;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Window.prototype, "body", {
            get: function () {
                return this._body;
            },
            set: function (b) {
                this._body = b;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Window.prototype, "header", {
            /**
             * заголовок (элемент h2 по умолчанию)
             */
            get: function () {
                return this._header;
            },
            enumerable: false,
            configurable: true
        });
        return Window;
    }());
    Components.Window = Window;
    /**
     * Select component
     */
    var Select = /** @class */ (function () {
        /**
         * Создает компонент селект и помещает его в родительский узел
         * @param parentNode родительский элемент в который будет помещен селект как DOM
         * @param panelClass стиль CSS
         */
        function Select(parentNode, panelClass) {
            var _this = this;
            this._name = "select";
            this._options = []; //list of options
            this._hasher = new Utilities.Hasher();
            this._currentHash = "";
            //on select event in order to subscribe on it later
            this.onSelect = function (sender) { };
            this._element = document.createElement('select');
            this._element.classList.add('form-select');
            var h = new Utilities.Hasher();
            this._element.id = this._name + '_' + h.getRandomHash(7);
            this._label = document.createElement('label');
            this._label.setAttribute('for', this._element.id);
            this._label.classList.add('form-label');
            if (panelClass) {
                this._panelColumn = new PanelColumn(parentNode, panelClass);
            }
            else {
                this._panelColumn = new PanelColumn(parentNode);
            }
            this._panelColumn.element.appendChild(this._label);
            this._panelColumn.element.appendChild(this._element);
            //реакция на выбор
            this._element.addEventListener('change', function () {
                _this.onSelect(_this);
            });
            parentNode.appendChild(this._panelColumn.element);
        }
        Object.defineProperty(Select.prototype, "label", {
            set: function (text) {
                this._label.innerText = text;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Select.prototype, "Panel", {
            /**
             * панель на которой отрисовывается элемент селекта
             */
            get: function () {
                return this._panelColumn;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Select.prototype, "element", {
            get: function () {
                return this._element;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * добавляет опции
         * @param options опции
         */
        Select.prototype.addOptions = function (options) {
            for (var i = 0; i < options.length; i++) {
                this.addOption(options[i]);
            }
        };
        /**
         * добавляет опцию
         * @param option опция
         */
        Select.prototype.addOption = function (option) {
            this._element.add(option.element);
            this._options.push(option);
        };
        Select.prototype.getSelectedValue = function () {
            var index = this._element.selectedIndex;
            return this._element.options[index].value;
        };
        return Select;
    }());
    Components.Select = Select;
})(Components || (Components = {}));
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
var BigEntreprise;
(function (BigEntreprise) {
    //записи которые получили от сервера (эмуляция)
    //работники и отделы
    var jsonRecords = '{"departments": [{"name":"исследований боевой магии"}, {"name":"целительства"}, {"name":"главари"}], ' +
        '"employees": [{"name": "Огонь", "familyname": "Полыхаев", "birthday": "12.12.1912", "department": "боевой магии", "position": 3},' +
        '{"name": "Нестор", "familyname": "Вострый", "birthday": "16.01.1986", "department": "исследований боевой магии", "position": 3},' +
        '{"name": "Гроза", "familyname": "Мореев", "birthday": "15.05.1895", "department": "исследований боевой магии", "position": 3},' +
        '{"name": "Лют", "familyname": "Волков", "birthday": "02.02.2020", "department": "исследований боевой магии", "position": 3},' +
        '{"name": "Егор", "familyname": "Бугров", "birthday": "03.03.2222", "department": "исследований боевой магии", "position": 1},' +
        '{"name": "Хмырь", "familyname": "Болотнов", "birthday": "03.03.2222", "department": "исследований боевой магии", "position": 2},' +
        '{"name": "Вера", "familyname": "Незыблемова", "birthday": "16.01.1986", "department": "целительства", "position": 3},' +
        '{"name": "Надежда", "familyname": "Скромнеева", "birthday": "15.05.1895", "department": "целительства", "position": 3},' +
        '{"name": "Любовь", "familyname": "Нечайнова", "birthday": "02.02.2020", "department": "целительства", "position": 3},' +
        '{"name": "Виктория", "familyname": "Спелая", "birthday": "15.03.1995", "department": "целительства", "position": 1},' +
        '{"name": "Олеся", "familyname": "Лесная", "birthday": "05.04.1953", "department": "целительства", "position": 2},' +
        '{"name": "Дядька", "familyname": "Черноморов", "birthday": "04.04.0001", "department": "главари", "position": 0}' +
        ']}';
    //запись об отделе
    var departmentRec = /** @class */ (function () {
        function departmentRec() {
            this.name = '';
        }
        return departmentRec;
    }());
    //запись о работнике с сервера
    var employeeRec = /** @class */ (function () {
        function employeeRec() {
            this.name = '';
            this.familyname = '';
            this.birthday = '';
            this.department = '';
            this.position = -1;
        }
        return employeeRec;
    }());
    //записи
    var Records = /** @class */ (function () {
        function Records() {
            this.departments = []; //соотв. записи в JSON 
            this.employees = []; //соотв. записи в JSON
        }
        return Records;
    }());
    //начальные настройки приложения
    var Settings = /** @class */ (function () {
        function Settings() {
            this.connectionString = "http://localhost:8080/"; //хост для аякса (не используется)
            this.className = 'enterprise';
        }
        return Settings;
    }());
    BigEntreprise.Settings = Settings;
    //доступные позиции в корпорации
    var positionList;
    (function (positionList) {
        positionList[positionList["director"] = 0] = "director";
        positionList[positionList["departmentHead"] = 1] = "departmentHead";
        positionList[positionList["inspector"] = 2] = "inspector";
        positionList[positionList["workman"] = 3] = "workman"; //рабочий
    })(positionList || (positionList = {}));
    //должность
    var Position = /** @class */ (function () {
        function Position() {
            this.id = positionList.workman;
            this.name = '';
        }
        return Position;
    }());
    BigEntreprise.Position = Position;
    //список возможных должностей
    var positions = [{ id: positionList.director, name: "Директор" },
        { id: positionList.departmentHead, name: "Главарь отдела" },
        { id: positionList.inspector, name: "Инспектор" },
        { id: positionList.workman, name: "Рабочий" },
    ];
    /**
     * класс для представления прав человека на соотв. позиции
     */
    var Right = /** @class */ (function () {
        function Right(id, description) {
            this._id = 0;
            this._description = '';
            this._id = id;
            this._description = description;
        }
        Object.defineProperty(Right.prototype, "description", {
            get: function () {
                return this._description;
            },
            enumerable: false,
            configurable: true
        });
        return Right;
    }());
    BigEntreprise.Right = Right;
    //создаем базовые права
    var hire = new Right(0, 'нанимать');
    var relax = new Right(1, 'валять дурака');
    var work = new Right(2, 'прилежно работать');
    var workHard = new Right(3, 'много работать');
    var fire = new Right(4, 'увольнять');
    /**
     * класс представляющий отдел предприятия
     */
    var Department = /** @class */ (function () {
        function Department() {
            this._id = -1;
            this._name = ''; //название отдела
            this._employees = []; //люди в отделе
        }
        Object.defineProperty(Department.prototype, "name", {
            get: function () {
                return this._name;
            },
            set: function (v) {
                this._name = v;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * добавляет человека в отдел
         * @param p человек которого надо добавить
         */
        Department.prototype.addPerson = function (p) {
            p.id = this._employees.length;
            p.department = this;
            this._employees.push(p);
        };
        /**
         * удаляет человека из отдела
         * @param p персона которую надо удалить из отдела
         */
        Department.prototype.removePerson = function (p) {
            var i = this._employees.indexOf(p);
            this._employees.splice(i, 1);
            for (var k = 0; k < this._employees.length; k++) {
                this._employees[k].id = k;
            }
        };
        Object.defineProperty(Department.prototype, "id", {
            get: function () {
                return this._id;
            },
            set: function (id) {
                this._id = id;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Department.prototype, "employes", {
            /**
             * возвращает список работников в отделе
             */
            get: function () {
                return this._employees;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Department.prototype, "emplyeeList", {
            get: function () {
                var s = [];
                if (this._employees.length == 0)
                    return s;
                this._employees.forEach(function (i) { s.push(i.fullName); });
                return s;
            },
            enumerable: false,
            configurable: true
        });
        return Department;
    }());
    BigEntreprise.Department = Department;
    /**
     * базовая персона
     * представляет собой базовый класс, который будет сам знать как ему отрисовывать свою форму, т.к. реализует интерфейс IVisualComponent
     * здесь предствлены базовые: имя, фамилия, день рождение человека
     * имеет абстрактный метод для отрисовки формы "о работнике", которая должна быть реализована в субклассах
     */
    var Person = /** @class */ (function () {
        function Person() {
            this._element = null; //элемент DOM
            this._name = ''; //имя
            this._familyname = ''; //фамилия
            this._birthday = ''; //когда денюха
        }
        Object.defineProperty(Person.prototype, "name", {
            get: function () {
                return this._name;
            },
            set: function (v) {
                this._name = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Person.prototype, "familyname", {
            get: function () {
                return this._familyname;
            },
            set: function (v) {
                this._familyname = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Person.prototype, "birthday", {
            get: function () {
                return this._birthday;
            },
            set: function (v) {
                this._birthday = v;
            },
            enumerable: false,
            configurable: true
        });
        return Person;
    }());
    BigEntreprise.Person = Person;
    /**
     * работничек
     */
    var Employee = /** @class */ (function (_super) {
        __extends(Employee, _super);
        function Employee() {
            var _this = _super.call(this) || this;
            _this._id = -1; //порядковый номер
            _this._position = positions[3]; //должность
            _this._department = new Department(); //департамент в котором чел. работает
            _this._rights = []; //права
            _this._element = document.createElement('fieldset');
            return _this;
        }
        /**
         * отрисовывает объект
         * @param parentNode отцовский элемент в котором будет отрисовываться объект
         */
        Employee.prototype.draw = function (parentNode) {
        };
        Object.defineProperty(Employee.prototype, "element", {
            /**
             * элемент DOM объекта
             */
            get: function () {
                return this._element;
            },
            enumerable: false,
            configurable: true
        });
        //внутри отдела можно назначить чела кем угодно
        Employee.prototype.setPosition = function (p) {
            if (p == null)
                return;
            var i = positions.findIndex(function (v) { return v.id == p; });
            if (i != -1) {
                this._position = positions[i];
            }
        };
        Object.defineProperty(Employee.prototype, "rights", {
            /**
             * задает права персонажа
             */
            get: function () {
                return this._rights;
            },
            /**
             * выдает права персонажа
             */
            set: function (r) {
                this._rights = r.slice();
            },
            enumerable: false,
            configurable: true
        });
        /**
         * выдает должность
         * @returns должность
         */
        Employee.prototype.getPosition = function () {
            return this._position;
        };
        Object.defineProperty(Employee.prototype, "id", {
            get: function () {
                return this._id;
            },
            set: function (id) {
                this._id = id;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Employee.prototype, "department", {
            get: function () {
                return this._department;
            },
            set: function (v) {
                this._department = v;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Employee.prototype, "fullName", {
            /**
             * полное имя работника (формата: Имя Фамилия)
             */
            get: function () {
                return this._name + ' ' + this._familyname;
            },
            enumerable: false,
            configurable: true
        });
        return Employee;
    }(Person));
    BigEntreprise.Employee = Employee;
    /**
     * класс директора
     */
    var Director = /** @class */ (function (_super) {
        __extends(Director, _super);
        function Director() {
            var _this = _super.call(this) || this;
            _this._subordinates = []; //люди в подчинении
            _this._rights = [hire, fire, relax]; //права
            _this.setPosition(positionList.director);
            return _this;
        }
        /**
         * отрисовывает данные
         * @param parentNode отцовский элемент DOM куда будет отрисовываться информация
         */
        Director.prototype.draw = function (parentNode) {
            var data = [];
            var header = [new Components.CellElement(null, "Параметр", false),
                new Components.CellElement(null, "Значение", false)];
            var row1 = [new Components.CellElement(null, 'Имя', false),
                new Components.CellElement(null, this.name, false)];
            var row2 = [new Components.CellElement(null, 'Фамилия', false),
                new Components.CellElement(null, this.familyname, false)];
            var row3 = [new Components.CellElement(null, 'Отдел', false),
                new Components.CellElement(null, this._department.name, false)];
            var row4 = [new Components.CellElement(null, 'Должность', false),
                new Components.CellElement(null, this._position.name, false)];
            data.push(header);
            data.push(row1);
            data.push(row2);
            data.push(row3);
            data.push(row4);
            var emp = this._subordinates.map(function (e) { return e.fullName; });
            var row5 = [new Components.CellElement(null, 'Работники в подчинении', false),
                new Components.CellElement(null, emp.join(';'), false)];
            data.push(row5);
            var row6 = [new Components.CellElement(null, 'Oбязанности', false),
                new Components.CellElement(null, this._rights.map(function (v) { return v.description; }).join(';'), false)];
            data.push(row6);
            var t = new Components.Table(parentNode, data);
        };
        Object.defineProperty(Director.prototype, "subordinates", {
            set: function (subordinates) {
                this._subordinates = subordinates;
            },
            enumerable: false,
            configurable: true
        });
        return Director;
    }(Employee));
    BigEntreprise.Director = Director;
    /**
     * класс главы отдела
     */
    var DepartmentHead = /** @class */ (function (_super) {
        __extends(DepartmentHead, _super);
        //    protected _position: positionList = positionList.departmentHead;
        function DepartmentHead() {
            var _this = _super.call(this) || this;
            _this._subordinates = []; //люди в подчинении
            _this._rights = [hire, fire, work]; //права
            _this.setPosition(positionList.departmentHead);
            return _this;
        }
        /**
         * отрисовывает данные
         * @param parentNode отцовский элемент, куда отрисовываются данные
         */
        DepartmentHead.prototype.draw = function (parentNode) {
            var _this = this;
            var data = [];
            var header = [new Components.CellElement(null, "Параметр", false),
                new Components.CellElement(null, "Значение", false)];
            var row1 = [new Components.CellElement(null, 'Имя', false),
                new Components.CellElement(null, this.name, false)];
            var row2 = [new Components.CellElement(null, 'Фамилия', false),
                new Components.CellElement(null, this.familyname, false)];
            var row3 = [new Components.CellElement(null, 'Отдел', false),
                new Components.CellElement(null, this._department.name, false)];
            var row4 = [new Components.CellElement(null, 'Должность', false),
                new Components.CellElement(null, this._position.name, false)];
            data.push(header);
            data.push(row1);
            data.push(row2);
            data.push(row3);
            data.push(row4);
            var emp = this._department.emplyeeList.filter(function (v) { return v != _this.fullName; });
            var row5 = [new Components.CellElement(null, 'Работники в подчинении', false),
                new Components.CellElement(null, emp.join(';'), false)];
            data.push(row5);
            var id = this._department.employes.findIndex(function (i) { return i.getPosition().id == positionList.departmentHead; });
            var row6 = [new Components.CellElement(null, 'Oбязанности', false),
                new Components.CellElement(null, this._rights.map(function (v) { return v.description; }).join(';'), false)];
            data.push(row6);
            var t = new Components.Table(parentNode, data);
        };
        Object.defineProperty(DepartmentHead.prototype, "subordinates", {
            set: function (subordinates) {
                this._subordinates = subordinates;
            },
            enumerable: false,
            configurable: true
        });
        return DepartmentHead;
    }(Employee));
    BigEntreprise.DepartmentHead = DepartmentHead;
    /**
     * класс инспектора
     */
    var Inspector = /** @class */ (function (_super) {
        __extends(Inspector, _super);
        //    protected _position: positionList = positionList.inspector;
        function Inspector() {
            var _this = _super.call(this) || this;
            _this._rights = [workHard]; //права инспектора
            _this.setPosition(positionList.inspector);
            return _this;
        }
        Inspector.prototype.draw = function (parentNode) {
            var data = [];
            var header = [new Components.CellElement(null, "Параметр", false),
                new Components.CellElement(null, "Значение", false)];
            var row1 = [new Components.CellElement(null, 'Имя', false),
                new Components.CellElement(null, this.name, false)];
            var row2 = [new Components.CellElement(null, 'Фамилия', false),
                new Components.CellElement(null, this.familyname, false)];
            var row3 = [new Components.CellElement(null, 'Отдел', false),
                new Components.CellElement(null, this._department.name, false)];
            var row4 = [new Components.CellElement(null, 'Должность', false),
                new Components.CellElement(null, this._position.name, false)];
            data.push(header);
            data.push(row1);
            data.push(row2);
            data.push(row3);
            data.push(row4);
            var id = this._department.employes.findIndex(function (i) { return i.getPosition().id == positionList.departmentHead; });
            if (id != -1) {
                var row4_1 = [new Components.CellElement(null, 'Руководитель', false),
                    new Components.CellElement(null, this._department.employes[id].name + ' ' + this._department.employes[id].familyname, false)];
                data.push(row4_1);
            }
            var row5 = [new Components.CellElement(null, 'Oбязанности', false),
                new Components.CellElement(null, this._rights.map(function (v) { return v.description; }).join(';'), false)];
            data.push(row5);
            var t = new Components.Table(parentNode, data);
        };
        return Inspector;
    }(Employee));
    BigEntreprise.Inspector = Inspector;
    var Worker = /** @class */ (function (_super) {
        __extends(Worker, _super);
        //    protected _position: positionList = positionList.workman;
        function Worker() {
            var _this = _super.call(this) || this;
            _this._rights = [workHard];
            _this.setPosition(positionList.workman);
            return _this;
        }
        Worker.prototype.draw = function (parentNode) {
            var data = [];
            var header = [new Components.CellElement(null, "Параметр", false),
                new Components.CellElement(null, "Значение", false)];
            var row1 = [new Components.CellElement(null, 'Имя', false),
                new Components.CellElement(null, this.name, false)];
            var row2 = [new Components.CellElement(null, 'Фамилия', false),
                new Components.CellElement(null, this.familyname, false)];
            var row3 = [new Components.CellElement(null, 'Отдел', false),
                new Components.CellElement(null, this._department.name, false)];
            var row4 = [new Components.CellElement(null, 'Должность', false),
                new Components.CellElement(null, this._position.name, false)];
            data.push(header);
            data.push(row1);
            data.push(row2);
            data.push(row3);
            data.push(row4);
            var id = this._department.employes.findIndex(function (i) { return i.getPosition().id == positionList.departmentHead; });
            if (id != -1) {
                var row4_2 = [new Components.CellElement(null, 'Руководитель', false),
                    new Components.CellElement(null, this._department.employes[id].name + ' ' + this._department.employes[id].familyname, false)];
                data.push(row4_2);
            }
            var row5 = [new Components.CellElement(null, 'Oбязанности', false),
                new Components.CellElement(null, this._rights.map(function (v) { return v.description; }).join(';'), false)];
            data.push(row5);
            var t = new Components.Table(parentNode, data);
        };
        return Worker;
    }(Employee));
    BigEntreprise.Worker = Worker;
    /**
     * this is the engine of the all the app
     * it controlls all components
     */
    var Engine = /** @class */ (function () {
        function Engine(element) {
            var _this = this;
            this._settings = new Settings(); //this is component settings
            this._departments = []; //отделы
            this._occupationSortOrder = false; //флаг способа сортировки
            this._departmentSortOrder = false; //флаг способа сортировки
            this._employeeList = null; //интерактивная таблица списка работников
            this._people = []; //список всех людей
            this._selectorPosition = null; //селектор фильтрации по должности
            this._selectorDepartment = null; //селектор фильтрации по отделу
            this._messagesSpot = undefined; //место куда кастуется сообщение в DOM
            /**
             * отработчик события на нажатие ссылки "повысить"
             * @param sender компонент отработчика
             * @param ev событие, генерируемое браузером
             */
            this.onPromoteClick = function (sender, ev) {
                var _a, _b, _c;
                var pid = (_a = sender.url.parameters) === null || _a === void 0 ? void 0 : _a.GetItem('employeeId');
                var did = (_b = sender.url.parameters) === null || _b === void 0 ? void 0 : _b.GetItem('departmentId');
                if (pid && did) {
                    var p = parseInt(pid);
                    var d = parseInt(did);
                    var pos = _this._departments[d].employes[p].getPosition();
                    var nextLevel = pos.id - 1; //повышение происходит от большего к меньшему, т.е. 0 - директор, 3 - рабочий, смекаешь?
                    //здесь мы  проверяем можно ли повысить работника и кастуем его в соотв. класс с соотв. возможностями
                    if (_this.IcanGetNewPosition(nextLevel, d)) {
                        if (nextLevel == positionList.departmentHead) {
                            _this._departments[d].employes[p] = _this.castNewDepartmentHead(_this._departments[d].employes[p]);
                        }
                        else if (nextLevel == positionList.inspector) {
                            _this._departments[d].employes[p] = _this.castNewInspector(_this._departments[d].employes[p]);
                        }
                        else if (nextLevel == positionList.director) {
                            _this._departments[d].employes[p] = _this.castNewDirector(_this._departments[d].employes[p]);
                        }
                        _this._departments[d].employes[p].setPosition(nextLevel);
                    }
                }
                //обновляем данные в таблице
                //this._people = this.allThePeople();
                //let data = this.bodyData(this._people);
                //this._employeeList?.appendBody(data);
                var e = new Event('change');
                (_c = _this._selectorDepartment) === null || _c === void 0 ? void 0 : _c.element.dispatchEvent(e);
            };
            /**
             * отработчик события на клик мыши по имени работника
             * рисует форму с детальными данными о работнике
             * @param sender компонент отработчика
             * @param ev событие
             */
            this.onNameClick = function (sender, ev) {
                var _a, _b;
                //clear DOM inside the body window
                while (_this._detailsWindow.body.lastChild) {
                    _this._detailsWindow.body.removeChild(_this._detailsWindow.body.lastChild);
                }
                _this._detailsWindow.header.innerHTML = 'Детально о работнике';
                //достаем id по отделу и по человеку
                var pid = (_a = sender.url.parameters) === null || _a === void 0 ? void 0 : _a.GetItem('employeeId');
                var did = (_b = sender.url.parameters) === null || _b === void 0 ? void 0 : _b.GetItem('departmentId');
                if (pid && did) {
                    var p = parseInt(pid);
                    var d = parseInt(did);
                    //отрисовываем в окне данные по челу
                    _this._departments[d].employes[p].draw(_this._detailsWindow.body);
                }
                else {
                    return;
                }
                _this._detailsWindow.show();
            };
            /**
             * отработчик события на клик мыши по ссылке сортировки отдела
             * @param sender компонент отработчика
             * @param ev событие
             */
            this.onDepartmentSort = function (sender, ev) {
                var _a;
                _this.sortEmployes('department');
                var data = _this.bodyData(_this._people);
                if (data != undefined)
                    (_a = _this._employeeList) === null || _a === void 0 ? void 0 : _a.appendBody(data);
            };
            /**
             * отработчик события на клик мыши по ссылке сортировки должности
             * @param sender компонент отработчика
             * @param ev событие
             */
            this.onPositionSort = function (sender, ev) {
                var _a;
                _this.sortEmployes('position');
                var data = _this.bodyData(_this._people);
                (_a = _this._employeeList) === null || _a === void 0 ? void 0 : _a.appendBody(data);
            };
            this._element = element;
            //место для вывода сообщений
            var mss = this._element.getElementsByClassName('messages-spot');
            if (mss && mss.length > 0) {
                this._messagesSpot = mss[0];
            }
            var records = JSON.parse(jsonRecords);
            if (records !== undefined) {
                this.getDepartments(records);
                this.getEmployes(records);
                var d = this.findDirector();
                if (d != null)
                    d.subordinates = [this._departments[0].employes[0]];
            }
            else {
                console.log('Отсуствуют записи в БД или ошибка парсинга JSON');
            }
            //создаем элемент интерфейса
            var row = document.createElement('div');
            var col = document.createElement('div');
            row.classList.add('row');
            col.classList.add('col');
            //панель на которой размещаются элементы управления (селекторы фильтра)
            var selectorPanel = new Components.FormPanel(col);
            selectorPanel.element.classList.add('mb-3');
            selectorPanel.legendText = 'Выбрать по:';
            //создаем селекты фильтрации
            this.createPositionSelect(selectorPanel.element);
            this.createDepartmentSelect(selectorPanel.element);
            row.appendChild(col);
            var row1 = document.createElement('div');
            var col1 = document.createElement('div');
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
        Engine.prototype.findDirector = function () {
            var result = null;
            var next = true;
            //прочесываем все массивы
            for (var i = 0; i < this._departments.length && next; i++) {
                for (var j = 0; j < this._departments[i].employes.length; j++) {
                    if (this._departments[i].employes[j].getPosition().id == positionList.director) {
                        result = this._departments[i].employes[j];
                        next = false;
                        break;
                    }
                }
            }
            return result;
        };
        /**
         * создаёт и настраивает компонент для сортировка должности
         * @param parentNode родительский узел, в котором будет создан элемент компонента выбора
         */
        Engine.prototype.createPositionSelect = function (parentNode) {
            var _this = this;
            this._selectorPosition = new Components.Select(parentNode, '');
            this._selectorPosition.label = 'должности';
            this._selectorPosition.addOption(new Components.Option('-1', 'показать все'));
            for (var i = 0; i < positions.length; i++) {
                this._selectorPosition.addOption(new Components.Option(positions[i].id.toString(), positions[i].name));
            }
            this._selectorPosition.onSelect = function (sender) {
                var _a, _b;
                _this._people = _this.allThePeople();
                //применяем фильтры
                if (_this._selectorDepartment && ((_a = _this._selectorDepartment) === null || _a === void 0 ? void 0 : _a.getSelectedValue()) != '-1') {
                    _this.filterEmployeeListByDepartment(parseInt(_this._selectorDepartment.getSelectedValue()));
                }
                if (parseInt(sender.getSelectedValue()) != -1) {
                    _this.filterEmployeeListByPosition(parseInt(sender.getSelectedValue()));
                }
                var data = _this.bodyData(_this._people);
                (_b = _this._employeeList) === null || _b === void 0 ? void 0 : _b.appendBody(data);
            };
        };
        /**
         * создаёт и настраивает компонент для сортировка отдела
         * @param parentNode родительский узел, в котором будет создан элемент компонента выбора
         */
        Engine.prototype.createDepartmentSelect = function (parentNode) {
            var _this = this;
            this._selectorDepartment = new Components.Select(parentNode, '');
            this._selectorDepartment.label = 'отделу';
            this._selectorDepartment.addOption(new Components.Option('-1', 'показать все'));
            for (var i = 0; i < this._departments.length; i++) {
                this._selectorDepartment.addOption(new Components.Option(this._departments[i].id.toString(), this._departments[i].name));
            }
            //отработчик на выбор одной из опций, фильтрует народ в теле таблицы по выбранным фильтрам
            this._selectorDepartment.onSelect = function (sender) {
                var _a, _b;
                _this._people = _this.allThePeople();
                if (_this._selectorPosition && ((_a = _this._selectorPosition) === null || _a === void 0 ? void 0 : _a.getSelectedValue()) != '-1') {
                    _this.filterEmployeeListByPosition(parseInt(_this._selectorPosition.getSelectedValue()));
                }
                if (parseInt(sender.getSelectedValue()) != -1) {
                    _this.filterEmployeeListByDepartment(parseInt(sender.getSelectedValue()));
                }
                var data = _this.bodyData(_this._people);
                (_b = _this._employeeList) === null || _b === void 0 ? void 0 : _b.appendBody(data);
            };
        };
        /**
         * создает отделы по данным из БД
         * если нет записей ничего не делает
         * @param records записи из БД
         * @returns
         */
        Engine.prototype.getDepartments = function (records) {
            if (records.departments.length == 0)
                return;
            if (records.departments.length > 0) {
                for (var i = 0; i < records.departments.length; i++) {
                    var d = new Department();
                    d.id = i;
                    d.name = records.departments[i].name;
                    this._departments.push(d);
                }
            }
        };
        /**
         * создает работников из записей БД в соотв. с занимаемой должностью выраженной enum position
         * если нет записей ничего не делает
         * @param records записи из БД
         */
        Engine.prototype.getEmployes = function (records) {
            if (records.employees.length == 0)
                return;
            for (var j = 0; j < records.employees.length; j++) {
                if (records.employees[j].position == positionList.director) {
                    this.createDirector(records.employees[j]);
                }
                else if (records.employees[j].position == positionList.departmentHead) {
                    this.createDepHead(records.employees[j]);
                }
                else if (records.employees[j].position == positionList.inspector) {
                    this.createInspector(records.employees[j]);
                }
                else if (records.employees[j].position == positionList.workman) {
                    this.createWorker(records.employees[j]);
                }
                else {
                    console.log("\u041D\u0435 \u043C\u043E\u0433\u0443 \u0441\u043E\u0437\u0434\u0430\u0442\u044C \u043E\u0431\u044A\u0435\u043A\u0442 \u0440\u0430\u0431\u043E\u0442\u043D\u0438\u043A\u0430 \u0434\u043B\u044F \u0437\u0430\u043F\u0438\u0441\u0438 ".concat(records.employees[j].name, " ").concat(records.employees[j].familyname, " \u0442.\u043A. \u043F\u043E\u0437\u0438\u0446\u0438\u044F \u043D\u0435 \u0441\u043E\u043E\u0442\u0432. \u043F\u043E\u0437\u0438\u0446\u0438\u0438 \u0432 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0438"));
                }
            }
        };
        /**
         * метод создаёт директора из записи БД
         * @param record запись о работнике
         */
        Engine.prototype.createDirector = function (record) {
            var e = new Director();
            e.name = record.name;
            e.familyname = record.familyname;
            e.birthday = record.birthday;
            var i = this._departments.findIndex(function (v) { return v.name === record.department; });
            if (i != -1) {
                this._departments[i].addPerson(e);
            }
            else {
                console.log("\u041D\u0435 \u043C\u043E\u0433\u0443 \u043D\u0430\u0439\u0442\u0438 \u043E\u0442\u0434\u0435\u043B \u0441 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435\u043C ".concat(record.department, " \u0447\u0442\u043E\u0431 \u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0440\u0430\u0431\u043E\u0442\u043D\u0438\u043A\u0430 ").concat(record.name, " ").concat(record.familyname));
            }
        };
        /**
         * метод создаёт главу отдела из записи БД
         * @param record запись о работнике
         */
        Engine.prototype.createDepHead = function (record) {
            var e = new DepartmentHead();
            e.name = record.name;
            e.familyname = record.familyname;
            e.birthday = record.birthday;
            var i = this._departments.findIndex(function (v) { return v.name === record.department; });
            if (i != -1) {
                this._departments[i].addPerson(e);
            }
            else {
                console.log("\u041D\u0435 \u043C\u043E\u0433\u0443 \u043D\u0430\u0439\u0442\u0438 \u043E\u0442\u0434\u0435\u043B \u0441 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435\u043C ".concat(record.department, " \u0447\u0442\u043E\u0431 \u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0440\u0430\u0431\u043E\u0442\u043D\u0438\u043A\u0430 ").concat(record.name, " ").concat(record.familyname));
            }
        };
        /**
         * метод создаёт инспектора из записи БД
         * @param record запись о работнике
         */
        Engine.prototype.createInspector = function (record) {
            var e = new Inspector();
            e.name = record.name;
            e.familyname = record.familyname;
            e.birthday = record.birthday;
            var i = this._departments.findIndex(function (v) { return v.name === record.department; });
            if (i != -1) {
                this._departments[i].addPerson(e);
            }
            else {
                console.log("\u041D\u0435 \u043C\u043E\u0433\u0443 \u043D\u0430\u0439\u0442\u0438 \u043E\u0442\u0434\u0435\u043B \u0441 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435\u043C ".concat(record.department, " \u0447\u0442\u043E\u0431 \u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0440\u0430\u0431\u043E\u0442\u043D\u0438\u043A\u0430 ").concat(record.name, " ").concat(record.familyname));
            }
        };
        /**
        * метод создаёт работника из записи БД
        * @param record запись о работнике
        */
        Engine.prototype.createWorker = function (record) {
            var e = new Worker();
            e.name = record.name;
            e.familyname = record.familyname;
            e.birthday = record.birthday;
            var i = this._departments.findIndex(function (v) { return v.name === record.department; });
            if (i != -1) {
                this._departments[i].addPerson(e);
            }
            else {
                console.log("\u041D\u0435 \u043C\u043E\u0433\u0443 \u043D\u0430\u0439\u0442\u0438 \u043E\u0442\u0434\u0435\u043B \u0441 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435\u043C ".concat(record.department, " \u0447\u0442\u043E\u0431 \u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0440\u0430\u0431\u043E\u0442\u043D\u0438\u043A\u0430 ").concat(record.name, " ").concat(record.familyname));
            }
        };
        /**
         * удаляет из DOM список работников
         */
        Engine.prototype.removeEmpoleeList = function () {
            if (this._employeeList == null)
                return;
            this._employeeList.element.remove();
        };
        Engine.prototype.allThePeople = function () {
            var result = [];
            if (this._departments.length == 0)
                return result;
            for (var i = 0; i < this._departments.length; i++) {
                for (var p = 0; p < this._departments[i].employes.length; p++) {
                    result.push(this._departments[i].employes[p]);
                }
            }
            return result;
        };
        /**
         * создает список всех работников по департаментам
         * @param sortOrder порядок сортировки 'department' - по отделу, 'position' - по занимаемой должности
         */
        Engine.prototype.sortEmployes = function (sortOrder) {
            if (this._people.length == 0)
                return;
            //сортируем как надо
            //по отделу
            if (sortOrder == 'department') {
                if (this._departmentSortOrder) {
                    this._people.sort(function (a, b) { return a.department.id - b.department.id; });
                }
                else {
                    this._people.sort(function (a, b) { return b.department.id - a.department.id; });
                }
                this._departmentSortOrder = !this._departmentSortOrder;
            }
            else if (sortOrder == 'position') { //по должности
                if (this._occupationSortOrder) {
                    this._people.sort(function (a, b) { return a.getPosition().id - b.getPosition().id; });
                }
                else {
                    this._people.sort(function (a, b) { return b.getPosition().id - a.getPosition().id; });
                }
                this._occupationSortOrder = !this._occupationSortOrder;
            }
        };
        /**
         * фильтрует людей по должности
         * @param id номер должности
         * @param people список людей
         * @returns фильтрованный список людей (только с нужным id должности)
         */
        Engine.prototype.filterEmployeeListByPosition = function (id) {
            this._people = this._people.filter(function (i) { return i.getPosition().id == id; });
        };
        /**
         * фильтрует людей по отделу
         * @param id нормер должности
         * @param people список людей
         * @returns фильтрованный список людей (только с нужным id отдела)
         */
        Engine.prototype.filterEmployeeListByDepartment = function (id) {
            this._people = this._people.filter(function (i) { return i.department.id == id; });
        };
        /**
         * печатает список работников в DOM
         * @returns
         */
        Engine.prototype.publishEmployeeList = function (parentNode) {
            //массив для хранения всех работников из всех отделов
            var allThePeople = this.allThePeople();
            if (allThePeople.length == 0) {
                console.log('Не могу распечатать список работников, так как нет отделов по которым нужно искать');
                return;
            }
            //элемент заголовка таблицы
            var header = this.headerData();
            //тело таблицы
            var body = this.bodyData(allThePeople);
            //вся таблица     
            var data = [];
            data.push(header);
            body.forEach(function (i) { data.push(i); });
            //если не задан корневой узел, добавляем в базового родителя
            if (parentNode) {
                this._employeeList = new Components.Table(parentNode, data);
            }
            else {
                this._employeeList = new Components.Table(this._element, data);
            }
        };
        /**
         * создает заголовок таблицы
         * ограничения: не проверяет длину массива тела
         * @returns возвращает массив заголовка
         */
        Engine.prototype.headerData = function () {
            var _a, _b;
            //создаем ссылки, по которым будем сортировать списки
            var u1 = new Utilities.Url();
            u1.schema = 'https';
            u1.domain = 'enterprise.com';
            u1.path = 'employes';
            (_a = u1.parameters) === null || _a === void 0 ? void 0 : _a.Add("sortOrder", "position");
            var u2 = new Utilities.Url();
            u2.schema = 'https';
            u2.domain = 'enterprise.com';
            u2.path = 'employes';
            (_b = u2.parameters) === null || _b === void 0 ? void 0 : _b.Add("sortOrder", "department");
            //создаем заголовок таблицы
            var header = [new Components.CellElement(null, "Имя", false),
                new Components.CellElement(null, "Фамилия", false),
                new Components.CellElement(null, "Дата рождения", false),
                new Components.Anchor("Должность", true, u1, this.onPositionSort),
                new Components.Anchor("Отдел", true, u2, this.onDepartmentSort),
                new Components.CellElement(null, "Действие", false),
            ];
            return header;
        };
        /**
         * создает массив данных по работникам для распечатки
         * ограничения: не проверяет длину массива заголовка
         * @param employees список всех работников
         * @returns возвращает массив данных о работниках
         */
        Engine.prototype.bodyData = function (employees) {
            var _a, _b, _c, _d, _e;
            var result = [];
            if (employees.length == 0)
                return result;
            for (var i = 0; i < employees.length; i++) {
                //TODO: уменьшить код при создании ссылок
                var u1 = new Utilities.Url();
                u1.schema = 'https';
                u1.domain = 'enterprise.com';
                u1.path = 'employes';
                (_a = u1.parameters) === null || _a === void 0 ? void 0 : _a.Add("employeeId", employees[i].id.toString());
                (_b = u1.parameters) === null || _b === void 0 ? void 0 : _b.Add("departmentId", employees[i].department.id.toString());
                var u2 = new Utilities.Url();
                u2.schema = 'https';
                u2.domain = 'enterprise.com';
                u2.path = 'employes';
                (_c = u2.parameters) === null || _c === void 0 ? void 0 : _c.Add("action", "promote");
                (_d = u2.parameters) === null || _d === void 0 ? void 0 : _d.Add("employeeId", employees[i].id.toString());
                (_e = u2.parameters) === null || _e === void 0 ? void 0 : _e.Add("departmentId", employees[i].department.id.toString());
                var row = [new Components.Anchor(employees[i].name, true, u1, this.onNameClick),
                    new Components.CellElement(null, employees[i].familyname, false),
                    new Components.CellElement(null, employees[i].birthday, false),
                    new Components.CellElement(null, employees[i].getPosition().name, false),
                    new Components.CellElement(null, employees[i].department.name, false),
                    new Components.Anchor("Повысить", true, u2, this.onPromoteClick)
                ];
                result.push(row);
            }
            return result;
        };
        /**
         * создает сообщение
         * @param type тип сообщения
         * @param text текст сообщения
         */
        Engine.prototype.addNewMessage = function (type, text) {
            if (this._messagesSpot) {
                //зверски вычищаем детей до последнего внутри родительского нода бууугагагага
                while (this._messagesSpot.lastChild) {
                    this._messagesSpot.removeChild(this._messagesSpot.lastChild);
                }
                //чтоб создать стандартное новое сообщение
                var newMessage = new Components.Message(this._messagesSpot, text, type);
            }
        };
        /**
         * кастует работника в директора
         * @param emp базовый класс работника
         * @returns возвращает класс директора
         */
        Engine.prototype.castNewDirector = function (emp) {
            var np = new Director();
            np.id = emp.id;
            np.birthday = emp.birthday;
            np.familyname = emp.familyname;
            np.name = emp.name;
            np.department = emp.department;
            np.subordinates = [];
            return np;
        };
        /**
         * кастует работника в главу отдела
         * @param emp базовый класс работника
         * @returns возвращает класс директора
         */
        Engine.prototype.castNewDepartmentHead = function (emp) {
            var np = new DepartmentHead();
            np.id = emp.id;
            np.birthday = emp.birthday;
            np.familyname = emp.familyname;
            np.name = emp.name;
            np.department = emp.department;
            np.subordinates = [];
            return np;
        };
        /**
         * кастует работника в директора
         * @param emp базовый класс работника
         * @returns возвращает класс директора
         */
        Engine.prototype.castNewInspector = function (emp) {
            var np = new Inspector();
            np.id = emp.id;
            np.birthday = emp.birthday;
            np.familyname = emp.familyname;
            np.name = emp.name;
            np.department = emp.department;
            return np;
        };
        /**
         * Метод проверяет может ли человек занять новую позицию,
         * по "бизнес" логике метода человек не может занять новую позицию, пока должность не освобождена
         * также не может занять позицию выше директора. Еще функция выводит сообщения о невозможности действия
         * @param nextLevel номер новой позиции
         * @param departmentId номер отдела работника
         * @returns правду если человек может занять новую должность и ложь, если нет
         */
        Engine.prototype.IcanGetNewPosition = function (nextLevel, departmentId) {
            var result = false;
            //проверяем возможность занять новую должность
            if (nextLevel == positionList.director) {
                var bossId = this._departments[departmentId].employes.findIndex(function (e) { return e.getPosition().id == positionList.director; });
                //если босс уже есть, то сообщаем об этом  
                if (bossId != -1) {
                    this.addNewMessage(Components.messageType.warning, "\u041E\u0439, \u043E\u0448\u0438\u0431\u043E\u0447\u043A\u0430 \u0432\u044B\u0448\u043B\u0430. \u041D\u0435\u043B\u044C\u0437\u044F \u043F\u043E\u0432\u044B\u0441\u0438\u0442\u044C \u0440\u0430\u0431\u043E\u0442\u043D\u0438\u043A\u0430 \u0434\u043E \"".concat(positions[positionList.director].name, "\" \u043F\u043E\u043A\u0430 \u0441 \u044D\u0442\u043E\u0439 \u0434\u043E\u043B\u0436\u043D\u043E\u0441\u0442\u0438 \u043D\u0435 \u0443\u0432\u043E\u043B\u0435\u043D \u0447\u0435\u043B\u043E\u0432\u0435\u043A"));
                }
                else {
                    result = true;
                }
            }
            else if (nextLevel == positionList.departmentHead) {
                var bossId = this._departments[departmentId].employes.findIndex(function (e) { return e.getPosition().id == positionList.departmentHead; });
                if (bossId != -1) {
                    this.addNewMessage(Components.messageType.warning, "\u041E\u0439, \u043E\u0448\u0438\u0431\u043E\u0447\u043A\u0430 \u0432\u044B\u0448\u043B\u0430. \u041D\u0435\u043B\u044C\u0437\u044F \u043F\u043E\u0432\u044B\u0441\u0438\u0442\u044C \u0440\u0430\u0431\u043E\u0442\u043D\u0438\u043A\u0430 \u0434\u043E \"".concat(positions[positionList.departmentHead].name, "\" \u043F\u043E\u043A\u0430 \u0441 \u044D\u0442\u043E\u0439 \u0434\u043E\u043B\u0436\u043D\u043E\u0441\u0442\u0438 \u043D\u0435 \u0443\u0432\u043E\u043B\u0435\u043D \u0447\u0435\u043B\u043E\u0432\u0435\u043A"));
                }
                else {
                    result = true;
                }
            }
            else if (nextLevel == positionList.inspector) {
                result = true;
            }
            else if (nextLevel < positionList.director) {
                this.addNewMessage(Components.messageType.warning, "\u041D\u0435\u043B\u044C\u0437\u044F \u043F\u043E\u0432\u044B\u0441\u0438\u0442\u044C \u0440\u0430\u0431\u043E\u0442\u043D\u0438\u043A\u0430 \u0432\u044B\u0448\u0435 \u0434\u043E\u043B\u0436\u043D\u043E\u0441\u0442\u0438 \"".concat(positions[positionList.director].name, "\""));
            }
            return result;
        };
        Object.defineProperty(Engine.prototype, "Settings", {
            get: function () {
                return this._settings;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Engine.prototype, "element", {
            get: function () {
                return this._element;
            },
            enumerable: false,
            configurable: true
        });
        return Engine;
    }());
    BigEntreprise.Engine = Engine;
})(BigEntreprise || (BigEntreprise = {}));
//функция инициализации приложени, единая точка входа в приложение
function enterprise_init() {
    var settings = new BigEntreprise.Settings();
    var el = document.getElementsByClassName(settings.className);
    //создаем движки приложения (если элементов с классом enterprise несколько)
    for (var i = 0; i < el.length; i++) {
        var engine = new BigEntreprise.Engine(el[i]);
    }
}
//подгружает приложение после загрузки страницы
window.addEventListener('load', enterprise_init, false);
//# sourceMappingURL=enterprise.js.map