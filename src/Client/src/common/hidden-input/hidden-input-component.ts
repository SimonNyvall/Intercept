import { bindable } from "aurelia";

export class HiddenInputComponent {
    @bindable public class: string = '';
    @bindable public value: string;
}