/// <reference path="utilities.ts" />
/// <reference path="components.ts" />

/**
 * Интерфейсы
 * 
 * Автор: Александр Кун
 */
namespace Interfaces {

    export interface ITableCellElement {
        addAsElement: boolean;              //добавлять как DOM елемент в ячейку таблицы
        get value(): string;                //значение которое надо добавить в ячейку
        get element(): HTMLElement;         //DOM элемент
    }

    export interface IVisualComponent {
        get element(): HTMLElement;
        draw(parentNode: HTMLElement): void;
    }

    export interface IDictionary<T> {
        Add(key: string, value: T): void;
        ContainsKey(key: string): boolean;
        Size(): number;
        GetItem(key: string): T;
        RemoveItem(key: string): T;
        GetKeys(): string[];
        Values(): T[];
        GetItems(): Utilities.DictionaryItems<T>;
        SetValue(key: string, value: T): void;
        Items(v: Utilities.DictionaryItems<T>): void;
    }

    export interface IDynamicDictionary<T> {
        ContainsKey(key: string): boolean;
        GetItem(key: string): T | undefined;
        GetKeys(): string[];
        Values(): T[];
        GetItems(): Utilities.DictionaryItems<T> | null;
        Items(v: Utilities.DictionaryItems<T>): void;
    }
}