import { bindable } from 'aurelia';

export class GroupedDropdown {
    @bindable public options: Array<{ label: string, imageUrl?: string, imageClass?: string, options: Array<{ label: string, value: string }> }> = [];
    @bindable public selectedValue: string;
    public isOpen: boolean = false;
    private optionElements: HTMLElement[] = [];

    get selectedLabel(): string {
        for (const group of this.options) {
            const selectedOption = group.options.find(option => option.value === this.selectedValue);
            if (selectedOption) {
                return selectedOption.label;
            }
        }
        return 'Select an option';
    }

    public toggleDropdown(): void {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            setTimeout(() => {
                this.optionElements = Array.from(document.querySelectorAll('.dropdown-option'));
                this.optionElements[0]?.focus();
            }, 0);
        }
    }

    public selectOption(option: { label: string, value: string }): void {
        this.selectedValue = option.value;
        this.isOpen = false;
    }

    public onKeyDown(event: KeyboardEvent): void {
        if (!this.isOpen) {
            if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
                this.toggleDropdown();
                event.preventDefault();
            }
            return;
        }

        const currentIndex = this.optionElements.findIndex(el => el === document.activeElement);

        if (event.key === 'ArrowDown') {
            const nextIndex = (currentIndex + 1) % this.optionElements.length;
            this.optionElements[nextIndex].focus();
            event.preventDefault();
        } else if (event.key === 'ArrowUp') {
            const prevIndex = (currentIndex - 1 + this.optionElements.length) % this.optionElements.length;
            this.optionElements[prevIndex].focus();
            event.preventDefault();
        } else if (event.key === 'Enter') {
            this.optionElements[currentIndex].click();
            event.preventDefault();
        } else if (event.key === 'Escape') {
            this.isOpen = false;
            event.preventDefault();
        }
    }
}