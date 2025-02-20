import { HttpDropdown } from "./common/dropdowns/http-dropdown/http-dropdown";
import { KeyValueEntity } from "./entities/key-value-entity";
import { RequestEntity } from "./entities/request-entity";
import { TabRequest } from "./request/tab-request";
import { EventAggregator, inject } from "aurelia";

@inject(EventAggregator)
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

    public isQueryTabOpen: boolean = true;

    private slidingPanel: HTMLElement;
    private resizeHandle: HTMLElement;
    private isResizing: boolean = false;
    private initialHeight: number;
    private initialY: number;

    private _eventAggregator: EventAggregator;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private _subscription: any;

    constructor(eventAggregator: EventAggregator) {
        this._eventAggregator = eventAggregator;
    }

    public attached(): void {
        this.resizeHandle.addEventListener('mousedown', this.onMouseDown.bind(this));
        document.addEventListener('mousemove', this.onMouseMove.bind(this));
        document.addEventListener('mouseup', this.onMouseUp.bind(this));

        this._subscription = this._eventAggregator.subscribe('query-parameters-changed', (keyValuePairs: KeyValueEntity[]) => {
            this.onQueryParametersChanged(keyValuePairs);
        });
    }

    public detached(): void {
        this._subscription.dispose();
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

    public onQueryParametersChanged(keyValuePairs: KeyValueEntity[]): void {
        if (!this.isQueryTabOpen) {
            return;
        }

        const queries = keyValuePairs
            .filter((query) => query.key !== '' || query.value !== '')
            .filter((query) => query.isSelected);

        if (queries.length === 0) {
            const url = this.request.url.split('?')[0];
            this.request.url = url;
            return;
        }

        if (!this.request.url.includes('?')) {
            this.request.url += '?';
        }

        const queryString: string = queries.map((query) => `${query.key}=${query.value}`).join('&');
        const url = this.request.url.split('?')[0];

        this.request.url = `${url}?${queryString}`;
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
