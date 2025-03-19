import { bindable } from "aurelia";
import { TableComponent } from "../../common/table/table-component";
import { RequestEntity } from "../../entities/request-entity";

export class RequestQuery {
    static dependencies = [
        TableComponent
    ]

    @bindable public request: RequestEntity;

    public get queryPreview(): string {
        const queries = this.request.queryParameters
            .filter((query) => query.key !== '' || query.value !== '')
            .filter((query) => query.isSelected);

        if (queries.length === 0) {
            return `${this.request.url}/`;
        }

        const queryString: string = queries.map((query) => `${query.key}=${query.value}`).join('&');

        return `${this.request.url}/?${queryString}`;
    }
}