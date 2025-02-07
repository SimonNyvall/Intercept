import { RequestEntity } from "./entities/request-entity";
import { TabRequest } from "./request/tab-request";

export class App {
    static dependencies = [
        TabRequest,
    ];

    public request: RequestEntity = new RequestEntity();
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
