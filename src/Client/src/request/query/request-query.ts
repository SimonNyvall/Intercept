import { bindable } from "aurelia";
import { TableComponent } from "../../common/table/table-component";
import { KeyValueEntity } from "../../entities/key-value-entity";

export class RequestQuery {
    static dependencies = [
        TableComponent
    ]

    @bindable public queryParameters: KeyValueEntity[];
}