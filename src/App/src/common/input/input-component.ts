import { bindable } from "aurelia";

export class InputComponent {
    @bindable public value: string;
    @bindable public inputType: string = 'text';
    @bindable public placeholder: string = '';

    public initialType: string;

    binding() {
        this.initialType = this.inputType;
    }

    public togglePasswordVisibility(): void {
        this.inputType = this.inputType === 'password' ? 'text' : 'password';
    }
}