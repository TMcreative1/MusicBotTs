// @ts-ignore
import buttonsFile from "./buttons.json";
import {ButtonType} from "../typings/ButtonType";

export interface Buttons {
    buttons: ButtonType[]
}

export const buttons: Buttons = buttonsFile as Buttons;

