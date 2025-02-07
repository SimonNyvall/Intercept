import { bindable } from "aurelia";

export class InputComponent {
    @bindable public class: string = '';
    @bindable public value: string;
}