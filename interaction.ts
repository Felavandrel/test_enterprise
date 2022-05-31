namespace Interaction {
    export interface ISignal<S, T> {
        on(handler: (source: S, data: T) => void): void;
        off(handler: (source: S, data: T) => void): void;
    }

    export interface IAsyncSignal<S, T> {
        bind(listener: string, handler: (source: S, data: T) => Promise<void>): void;
        unbind(listener: string): void;
    }

    export interface ISignalBindingAsync<S, T> {
        listener?: string;
        handler: (source: S, data: T) => Promise<void>;
    }

    /**
     * the signal component to create multiple deligates
     */
    export class Signal<S, T> implements ISignal<S,T> {
        private handlers: Array<(source: S, data: T) => void> = [];

        /**
         * this adds handler delegate to the array of deligates
         * @param handler handler function
         */
        public on(handler: (source: S, data: T)=> void): void {
            this.handlers.push(handler);
        }

        /**
         * this deletes handler deligate from the array of deligates
         * @param handler handler function
         */
        public off(handler: (source: S, data: T) => void): void {
            this.handlers = this.handlers.filter(h => h!== handler);
        }

        /**
         * this triggers all events 
         * @param source source of event
         * @param data data to pass
         */
        public trigger(source: S, data: T): void {
            this.handlers.slice(0).forEach(h => h(source, data));
        }

        /**
         * this expose only interface to avoid unnecessary access 
         * @returns 
         */
        public expose(): ISignal<S, T> {
            return this;
        }
    }
  
    export class AsyncSignal<S, T> implements IAsyncSignal<S, T> {
        private _handlers: Array<ISignalBindingAsync<S, T>> = [];

        public bind(listener: string, handler: (source: S, data: T) => Promise<void>): void {
            if (this.contains(listener)) {
                this.unbind(listener);
            }
            this._handlers.push({ listener, handler });
        }

        public unbind(listener: string): void {
            this._handlers = this._handlers.filter(h => h.listener !== listener);
        }

        public contains(listener: string): boolean {
            return this._handlers.some(h => h.listener === listener);
        }

        public async trigger(source: S, data: T): Promise<void> {
            this._handlers.slice(0).map(h => h.handler(source, data));
        }

        public async triggerAwait(source: S, data: T): Promise<void> {
            // Duplicate the array to avoid side effects during iteration.
            const promises = this._handlers.slice(0).map(h => h.handler(source, data));
            await Promise.all(promises);
        }

        public expose(): IAsyncSignal<S, T> {
            return this;
        }
    }
}