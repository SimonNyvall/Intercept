import { KeyValueEntity } from "./key-value-entity";

export class RequestEntity {
    public id: string = '';
    public name: string = '';
    public url: string = '';
    public method: string = 'GET';
    public headers: KeyValueEntity[] = [];
    public queryParameters: KeyValueEntity[] = [];
}