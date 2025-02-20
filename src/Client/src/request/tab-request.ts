import { bindable, BindingMode } from "aurelia";
import { RequestEntity } from "../entities/request-entity";
import { RequestHeaders } from "./headers/request-headers";
import { RequestQuery } from "./query/request-query";
import { RequestBody } from "./body/request-body";

export class TabRequest {
    static dependencies = [
        RequestQuery,
        RequestHeaders,
        RequestBody
    ]

    @bindable public request: RequestEntity;

    @bindable({ mode: BindingMode.twoWay }) public showQuery: boolean = true;
    public showHeaders: boolean = false;
    public showAuth: boolean = false;
    public showBody: boolean = false;

    public triggerQueryTab(): void {
        this.showQuery = true;
        this.showHeaders = false;
        this.showAuth = false;
        this.showBody = false;
    }

    public triggerHeadersTab(): void {
        this.showQuery = false;
        this.showHeaders = true;
        this.showAuth = false;
        this.showBody = false;
    }

    public triggerAuthTab(): void {
        this.showQuery = false;
        this.showHeaders = false;
        this.showAuth = true;
        this.showBody = false;
    }

    public triggerBodyTab(): void {
        this.showQuery = false;
        this.showHeaders = false;
        this.showAuth = false;
        this.showBody = true;
    }
}