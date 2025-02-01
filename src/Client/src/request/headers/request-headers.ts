import { bindable } from "aurelia"
import { KeyValueEntity } from "../../entities/key-value-entity";
import { TableComponent } from "../../common/table/table-component";

export class RequestHeaders {
    static dependencies = [
        TableComponent
    ]

    @bindable public headers: KeyValueEntity[] = [];
}