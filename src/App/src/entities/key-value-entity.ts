export class KeyValueEntity {
    public id: string;
    public key: string;
    public value: string;
    public isSelected: boolean;
    public isHidden: boolean;

    constructor(key: string, value: string) {
        this.id = this._generateId();
        this.key = key;
        this.value = value;
        this.isSelected = false;
        this.isHidden = false;
    }

    private _generateId(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
            const random = Math.random() * 16 | 0;
            const value = char === 'x' ? random : (random & 0x3 | 0x8);
            return value.toString(16);
        });
    }
}