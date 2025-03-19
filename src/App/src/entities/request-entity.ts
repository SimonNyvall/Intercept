import { AuthEntity, NoneAuth } from "./auth-entity";
import { BodyEntiry } from "./body-entity";
import { KeyValueEntity } from "./key-value-entity";

export class RequestEntity {
    public id: string = '';
    public name: string = '';
    public url: string = '';
    public method: string = 'GET';
    public headers: KeyValueEntity[] = [];
    public queryParameters: KeyValueEntity[] = [];
    public body: BodyEntiry = new BodyEntiry();
    public auth: AuthEntity = { type: 'none', enabled: false } as NoneAuth;
}