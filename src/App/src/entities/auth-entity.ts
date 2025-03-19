export type AuthType = 'none' | 'basic' | 'bearer-token' | 'api-key';

export interface NoneAuth {
    type: 'none';
    enabled: boolean;
}

export interface BasicAuth {
    type: 'basic';
    enabled: boolean;
    username: string;
    password: string;
}

export interface BearerTokenAuth {
    type: 'bearer-token';
    enabled: boolean;
    token: string;
    prefix: string;
}

export interface ApiKeyAuth {
    type: 'api-key';
    enabled: boolean;
    key: string;
    value: string;
}

export type AuthEntity = NoneAuth | BasicAuth | BearerTokenAuth | ApiKeyAuth;