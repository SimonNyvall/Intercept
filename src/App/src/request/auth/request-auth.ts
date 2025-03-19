import { bindable, BindingMode, EventAggregator, inject, observable } from "aurelia";
import { GroupedDropdown } from "../../common/dropdowns/grouped-dropdown/grouped-dropdown";
import { ApiKeyAuth, AuthEntity, AuthType, BasicAuth, BearerTokenAuth } from "../../entities/auth-entity";
import { InputComponent } from "../../common/input/input-component";

@inject(EventAggregator)
export class RequestAuth {
    @bindable({ mode: BindingMode.twoWay }) public auth: AuthEntity;
    @bindable({ mode: BindingMode.twoWay }) public selectedAuthType: string = 'none';
    @observable public selectedApiKeyLocation: string = 'header';

    static dependencies = [
        GroupedDropdown,
        InputComponent
    ];

    public username: string = '';
    public password: string = '';
    public token: string = '';
    public prefix: string = '';
    public key: string = '';
    public value: string = '';

    private _eventAggregator: EventAggregator;
    
    constructor(eventAggregator: EventAggregator) {
        this._eventAggregator = eventAggregator;
    }

    public authTypeOptions: Array<{ label: string, imageUrl?: string, imageClass?: string, options: Array<{ label: string, value: string }>}> = [
        {
            label: 'Other',
            options: [
                { label: 'None', value: 'none'}
            ]
        },
        {
            label: 'Auth types',
            options: [
                { label: 'API Key', value: 'api-key' },
                { label: 'Basic', value: 'basic' },
                { label: 'Bearer Token', value: 'bearer-token' },
            ]
        }
    ];

    public apiKeyLocationOptions: Array<{ label: string, imageUrl?: string, imageClass?: string, options: Array<{ label: string, value: string }>}> = [
        {
            label: '',
            options: [
                { label: 'Header', value: 'header' },
                { label: 'Query Param', value: 'query-param' },
                { label: 'Cookie', value: 'cookie' }
            ]
        }
    ];

    public selectedApiKeyLocationChanged(newValue: string): void {
        console.log('sending event');
        console.log(this.auth);
        const apiKeyAuth = this.auth as ApiKeyAuth;
        console.log(apiKeyAuth);
        const eventPayload: string = `43a7e5dd-5532-474c-9ac5-795260c7d321:${newValue}:${apiKeyAuth.key}:${apiKeyAuth.value}`;

        this._eventAggregator.publish('api-key-location-changed', eventPayload);        
    }

    public selectedAuthTypeChanged(newValue: AuthType): void {
        if (newValue === this.auth.type) {
            return;
        }

        if (this.auth.type === 'none') {
            this.auth.enabled = true;
        }

        switch (newValue) {
            case 'none':
                this.auth = { type: 'none', enabled: false };
                break;
            case 'basic':
                this.auth = { 
                    type: 'basic', 
                    enabled: this.auth.enabled, 
                    username: this.username, 
                    password: this.password
                };
                break;
            case 'bearer-token':
                this.auth = { 
                    type: 'bearer-token', 
                    enabled: this.auth.enabled, 
                    token: this.token,
                    prefix: this.prefix
                };
                break;
            case 'api-key':
                this.auth = { 
                    type: 'api-key', 
                    enabled: this.auth.enabled, 
                    key: this.key,
                    value: this.value
                };
                break;
        }
    }

    public usernamePlaceholder: string = 'John Doe';
    public passwordType: string = 'password';
}