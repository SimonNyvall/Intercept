import { HttpDropdown } from "./common/dropdowns/http-dropdown/http-dropdown";
import { RequestEntity } from "./entities/request-entity";
import { TabRequest } from "./request/tab-request";

export class App {
    static dependencies = [
        TabRequest,
        HttpDropdown
    ];

    public request: RequestEntity = new RequestEntity();

    public httpMethods: Array<{ label: string, value: string, colorClass: string }> = [
        { label: 'GET', value: 'GET', colorClass: 'color-get' },
        { label: 'POST', value: 'POST', colorClass: 'color-post' },
        { label: 'PUT', value: 'PUT', colorClass: 'color-put' },
        { label: 'DELETE', value: 'DELETE', colorClass: 'color-delete' },
        { label: 'PATCH', value: 'PATCH', colorClass: 'color-patch' }
    ];
    public type: string = 'GET'; 

    public requestName: string = 'New Request';
    public isEditingName: boolean = false;
    public requestNameInput: HTMLInputElement;

    private slidingPanel: HTMLElement;
    private resizeHandle: HTMLElement;
    private isResizing: boolean = false;
    private initialHeight: number;
    private initialY: number;

    public attached(): void {
        this.resizeHandle.addEventListener('mousedown', this.onMouseDown.bind(this));
        document.addEventListener('mousemove', this.onMouseMove.bind(this));
        document.addEventListener('mouseup', this.onMouseUp.bind(this));
    }

    public sendRequest(): void {
        this.request.queryParameters.filter((query) => query.key !== '' && query.value !== '');
        this.request.headers.filter((header) => header.key !== '' && header.value !== '');

        console.log(this.request);
    }

    public editRequestName(): void {
        this.isEditingName = true;
        setTimeout(() => {
            this.requestNameInput.focus();
        }, 0);
    }

    public saveRequestName(): void {
        this.isEditingName = false;
    }

    public selectText(event: FocusEvent): void {
        const input = event.target as HTMLInputElement;
        input.select();
    }

    private onMouseDown(event: MouseEvent): void {
        this.isResizing = true;
        this.initialY = event.clientY;
        this.initialHeight = this.slidingPanel.offsetHeight;
        document.body.style.cursor = 'ns-resize';
    }

    private onMouseMove(event: MouseEvent): void {
        if (!this.isResizing) {
            return;
        }

        const deltaY = this.initialY - event.clientY;
        const newHeight = this.initialHeight + deltaY;
        this.slidingPanel.style.height = `${newHeight}px`;
    }

    private onMouseUp(): void {
        this.isResizing = false;
        document.body.style.cursor = '';
    }
}
