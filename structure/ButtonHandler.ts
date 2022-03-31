import {ButtonHandlerType} from "../typings/ButtonType";

export class ButtonHandler {
    constructor(buttonOptions: ButtonHandlerType) {
        Object.assign(this, buttonOptions);
    }
}