import { logger } from "@lib/utils/logger";

type AnyFn = (...args: any[]) => any;

export class Emitter {
    _listeners: Record<string, Set<AnyFn>> = {};

    emit(event: string, payload: any = null) {
        if (!this._listeners[event]) return;

        for (const callbacks of this._listeners[event]) {
            try {
                callbacks(payload);
            } catch {
                logger.error(`Failed to fire event for ${event}`);
            }
        }
    }

    on(event: string, callback: AnyFn) {
        this.addListener(event, callback);
    }

    off(event: string, callback: AnyFn) {
        this.removeListener(event, callback);
    }

    once(event: string, callback: AnyFn) {
        const once = (payload: any) => {
            this.off(event, once);
            callback(payload);
        };

        this.on(event, once);
    }

    addListener(event: string, callback: AnyFn) {
        this._listeners[event] ??= new Set();
        this._listeners[event].add(callback);
    }

    removeListener(event: string, callback: AnyFn) {
        if (!this._listeners[event]) return;

        this._listeners[event].delete(callback);

        if (!this._listeners[event].size) {
            delete this._listeners[event];
        }
    }
}
