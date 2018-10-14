import {HandlerType} from '../enums/HandlerType';

type Handler = (data: any) => void;

export default class Dispatcher {
    private static _handlers: Map<HandlerType, Function>;

    constructor() {
        Dispatcher._handlers = new Map();
    }

    public static addHandler(type: HandlerType, handler: Handler) {
        this._handlers.set(type, handler);
    }

    public static emitTo(type: HandlerType, data?: any) {
        let handler = this._handlers.get(type);

        if (handler) handler(data);
    }
}