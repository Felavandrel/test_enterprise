
/**
 * Дополнительные функции
 * 
 * Автор: Александр Кун
 */
namespace Functions {
    /**
     * Function to togle, remove or add CSS class to a HTML element
     * @param obj HTML element
     * @param oldStateCSSClass name of CSS class to remove or to replace. If it equals "" function adds newStateCSSClass
     * @param newStateCSSClass name of CSS class to replace oldSrtateCSSclass. If it equals "" function removes oldSrtateCSSclass
     */
    export function TogleStates (obj: HTMLElement, oldStateCSSClass: string, newStateCSSClass: string): boolean {
        let result: boolean =false;
        if (typeof obj === 'undefined' || obj == null ) return result;
        if (oldStateCSSClass == null) return result;
        if (newStateCSSClass == null) return result;
        /**
         * checks if target class is in class array. 
         * Function for IE
         * @param className target CSS class name to find
         */
        function IECSSclassExists (className: string): boolean {
            let result: boolean = false;
            let o = obj.getAttribute('class');
            if (o != null) result = o.indexOf(className) > -1; 

            return result;
        }
        /**
         * adds new class to classes array 
         * Function for IE
         * @param className CSS class to add
         */
        function IEAddCSSClass (className: string): boolean {
            if (className == null || className == "") return false;
            let classExists = IECSSclassExists(className);
            if (classExists === false) {
                let attr = obj.getAttribute('class');
                let classAttr = attr ? attr : "";
                try {
                    obj.setAttribute('class', classAttr != "" ?  classAttr + ' ' + className : className);
                } catch {
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
        function IERemoveCSSClass (className: string): boolean {
            if (!className || className == "") return false;
            let classExists = IECSSclassExists(className);
            if (classExists === true) {
                try {
                    let o = obj.getAttribute('class');
                    if (o != null) {
                        obj.setAttribute('class', o.replace(className, ''));
                    }               
                } catch {
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
                } else if (oldStateCSSClass === newStateCSSClass) {
                    result = true;
                } 
                else
                {
                    if (IERemoveCSSClass(oldStateCSSClass) === true) {
                        result = IEAddCSSClass(newStateCSSClass);
                    } else {
                        result = false;
                    }              
                }
            } else {
                if (newStateCSSClass != "") {
                    result = IEAddCSSClass(newStateCSSClass);
                }
            }
        } else {
            let classIsThere: boolean = false;
            if (typeof obj.classList.contains === 'undefined' || obj.classList.contains == null) {
                classIsThere = IECSSclassExists(oldStateCSSClass);       
            } else {
                if (oldStateCSSClass == "") {
                    classIsThere = false;
                } else {
                    classIsThere = obj.classList.contains(oldStateCSSClass);
                }            
            }
            if (classIsThere === true) {
                if (newStateCSSClass == "") {
                    if (!obj.classList.remove) {
                        result = IERemoveCSSClass(oldStateCSSClass);
                    } else {
                        try {
                            obj.classList.remove(oldStateCSSClass);
                        } catch {
                            return result;
                        }
                        result = true; 
                    }                            
                } else if (newStateCSSClass === oldStateCSSClass) {
                    result = true;
                } else {
                    if (typeof obj.classList.replace === 'undefined') {
                        if (IERemoveCSSClass(oldStateCSSClass) === true) {
                            result = IEAddCSSClass(newStateCSSClass);
                        } else {
                            result = false;
                        } 
                    } else {
                        try {
                            obj.classList.replace(oldStateCSSClass, newStateCSSClass);
                        } catch {
                            return result;
                        } 
                        result = true; 
                    }                      
                }      
                
            } else {
                if (newStateCSSClass != "") {
                    if (typeof obj.classList.add === 'undefined') {
                        result = IEAddCSSClass(newStateCSSClass);
                    } else {
                        try {
                            obj.classList.add(newStateCSSClass);
                        } catch {
                            return result;
                        }  
                        result = true; 
                    }                        
                }     
            }
        }  

        return result;
    }
    export function removeEvent (obj: HTMLElement, type: string, listener: EventListenerOrEventListenerObject) {
        if (obj && obj.removeEventListener) {
            obj.removeEventListener(type, listener, false);
        } 
    }

    /**
     * Функция получения Аякс интерфейса
     * @returns возвращает аякс
     */
    export function  getXMLHttpRequestObject() : XMLHttpRequest | null {
        var ajax = null;
        if (window.XMLHttpRequest) {
            ajax = new XMLHttpRequest();
        } else if (window.ActiveXObject || "ActiveXObject" in window) {
            let ProgID = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "Microsoft.XMLHTTP"];
            for (var i = 0; i < ProgID.length; i++) {
                try {
                    ajax = new ActiveXObject(ProgID[i]);
                } catch (error) {continue;}
            }
            
            
        }
        return ajax;
    }

    /**
         * Function to get "data" attribute from HTML element.
         * @param elem HTML element including "data" attribute
         * @param property Name of a property. Shell be given without "data-", example: "animation-iterations", the function will be looking for "data-animation-iterations" 
         */
    export function readDataAttr (elem: HTMLElement, property: string): string {
        let result: string = "";
        if (property == "") return result;
        if (elem == null) return result;

        let attrName: string = 'data-' + property;
        let gar = elem.getAttribute(attrName);
        result = gar === null ? "" : gar;

        return result;
    }

}

