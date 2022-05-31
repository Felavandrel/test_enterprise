/// <reference path="interfaces.ts" />

/**
 * Утилиты для работы приложения
 * 
 * Автор: Александр Кун
 */
namespace Utilities {
    export type DictionaryItems<T> = {[index: string]: T}
    export type ExternalItems<T> = () => DictionaryItems<T> | null;

    /**
     * простой класс для урлов. Его задача просто объединять данные (протокол, домен, параметры и пр.) в урл
     */
    export class Url {
        private _url: string = '';
        private _schema: string = '';
        private _domain: string = '';
        private _path: string = '';
        private _params: Interfaces.IDictionary<string> | null = new Utilities.Dictionary<string> ();
        public set schema(value: string) {
            this._schema = value;
        }

        public get schema(): string {
            return this._schema;
        }

        public set domain(value: string) {
            this._domain = value;
        }

        public get domain(): string {
            return this._domain;
        }

        public set path(value: string) {
            this._path = value;
        }

        public get path(): string {
            return this._path;
        }

        public get url (): string {
            this.generateUrl();
            return this._url;
        }

        public set parameters (o: Interfaces.IDictionary<string> | null) {
            this._params = o;
        }

        public get parameters ():  Interfaces.IDictionary<string> | null {
            return this._params;
        }

        /**
         * генерирует урл по заданной схеме, домену, пути и параметрам
         * ограничения: не проверяет отсутствие какого-либо из параметров урла и не учитывает порт
         */
        private generateUrl () {
            this._url = this._schema + '://' + this._domain + '/' + this._path + this.paramsToUrl();
        }

        /**
         * создает строку с параметрами для урла
         * @returns строка с параметрами урла
         */
        private paramsToUrl (): string {
            let result: string = '';
            if (this._params === null) return result;
            if (this._params.Size() == 0) return result;

            let obj = this._params.GetItems();
            result = '?' + Object.keys(obj).map(function(key:string) {
                return key + '=' + encodeURIComponent(obj[key]);
              }).join('&');
    
            return result;
        }
    }

    /**
     * класс для работы с простыми хэшами.
     * умеет создавать рандумный хэш из букв и цифр произвольного размера (не для шифровки)
     */
    export class Hasher {
        private _length: number = 32;
        private _numMin: number = 48;
        private _numMax: number = 57;
        private _minUpper: number = 65;
        private _maxUpper: number = 90;
        private _minLower: number = 97;
        private _maxLower: number = 122;

        private getRndCharNumber(): number {
            let n = this._numMax - this._numMin + 1;
            return Math.floor(this._numMin + n * Math.random());
        }

        private getRndUpper(): number {
            let n = this._maxUpper - this._minUpper + 1;
            return Math.floor(this._minUpper + n * Math.random());
        }

        private getRndLower(): number {
            let n = this._maxLower - this._minLower + 1;
            return Math.floor(this._minLower + n * Math.random());
        }

        /**
         * генерирует рандумный хэш 
         * @param len длина хэша
         * @returns строка хэша
         */
        getRandomHash (len: void | number): string {
            let result: string = "";
            let l: number = len && len > 0 ? len : this._length;
            
            for(let i=0; i < l;i++) {
                let n = Math.floor(Math.random() * 3);
                if (n == 0) {
                    result += String.fromCharCode(this.getRndCharNumber());
                } else if (n == 1) {
                    result += String.fromCharCode(this.getRndUpper());
                } else if (n == 2) {
                    result += String.fromCharCode(this.getRndLower());
                }
            }

            return result;
        }
    }

    /**
     * класс для хранения данных ключ-значение
     */
    export class Dictionary<T> implements Interfaces.IDictionary<T> {
        private _items: DictionaryItems<T> = {};
        private _count: number = 0;
        DynamicItems: ExternalItems<T> = () => {return null};

        private Merge () {
            let di = this.DynamicItems();
            if (di !== null) {
                Object.assign(this._items, di);
            }
        }

        public GetItems (): DictionaryItems<T> {                  
            return this._items;
        }

        public Items (v: DictionaryItems<T>) {
            this._items = v;
        }

        public Add(key: string, value: T) {
            if (!this._items.hasOwnProperty(key)) {
                this._count++;
            }

            this._items[key] = value;
        }

        public ContainsKey(key: string): boolean {
            return this._items.hasOwnProperty(key);
        }

        public Size(): number {
            return this._count;
        }

        public GetItem(key: string) : T {
            return this._items[key];
        }

        public SetValue(key: string, value: T) {
            if (this._items.hasOwnProperty(key)) {
                this._items[key] = value;
            } else {
                this._items[key] = value;
            }
        }

        public RemoveItem(key: string) : T {
            let value = this._items[key];
            delete this._items[key];
            this._count--;
            return value;
        }

        public GetKeys(): string[] {
            let keySet: string[] = [];
            for (let property in this._items) {
                if (this._items.hasOwnProperty(property)) {
                    keySet.push(property);
                }
            }
            return keySet;
        }

        public Values(): T[] {
            let values: T[] = [];
            for (let property in this._items) {
                if (this._items.hasOwnProperty(property)) {
                    values.push(this._items[property]);
                }
            }

            return values;
        }
    }
}