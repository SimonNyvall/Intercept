import { RequestEntity } from "./entities/request-entity";
import { TabRequest } from "./request/tab-request";

export class App {
    static dependencies = [
        TabRequest,
    ];

    public request: RequestEntity = new RequestEntity();

    public sendRequest(): void {
        console.log(this.request);
    }
}
