import { bindable, EventAggregator, inject} from "aurelia";
import { KeyValueEntity } from "../../entities/key-value-entity";

@inject(EventAggregator)
export class TableComponent {
  @bindable public keyValuePairs: KeyValueEntity[] = [];

  private _eventAggregator: EventAggregator;
  private _previousValues: Map<string, { key: string, value: string }> = new Map();

  constructor(eventAggregator: EventAggregator ) {
    this._eventAggregator = eventAggregator;
  }

  public attached(): void {
    if (this.keyValuePairs.length === 0) {
      this._addEmptyRow();
    }
  }

   public addEmptyRow(): void {
    const lastRow = this.keyValuePairs[this.keyValuePairs.length - 1];

    if (lastRow.key === "" && lastRow.value === "") {
      return;
    }

    this._addEmptyRow();
  }

  public shouldShowRemoveButton(id: string): boolean {
    return this.keyValuePairs.length > 1 && this.keyValuePairs[this.keyValuePairs.length - 1].id !== id 
  }

  public removeKeyValuePair(id: string): void {
    const index = this.keyValuePairs.findIndex((pair) => pair.id === id);

    if (index === -1) {
      return;
    }

    const lastRowId = this.keyValuePairs[this.keyValuePairs.length - 1].id;

    this.keyValuePairs.splice(index, 1);

    this._eventAggregator.publish('query-parameters-changed', this.keyValuePairs);

    if (id === lastRowId) {
      this._addEmptyRow();
    }
  }

  public onChackboxChange(): void {
    this._eventAggregator.publish('query-parameters-changed', this.keyValuePairs);
  }

  public onInputChange(event: KeyboardEvent, keyValue: KeyValueEntity): void {
    event.preventDefault();
    event.stopPropagation();

    const previousKeyLength = this._previousValues.get(keyValue.id)?.key.length || 0;
    const previousValueLength = this._previousValues.get(keyValue.id)?.value.length || 0;

    const target = event.target as HTMLInputElement;
    const newValue = target.value;

    if (target.placeholder === "Key") {
      keyValue.key = newValue;
    } else if (target.placeholder === "Value") {
      keyValue.value = newValue;
    }

    if (!keyValue.isSelected && previousKeyLength + previousValueLength === 0 && newValue.length >= 1) {
      console.log('here');
      keyValue.isSelected = true;
    }

    this._eventAggregator.publish('query-parameters-changed', this.keyValuePairs);

    const lastRow = this.keyValuePairs[this.keyValuePairs.length - 1];

    if (lastRow.key === '' && lastRow.value === '') {
      return;
    }

    this._addEmptyRow();
    setTimeout(() => {
      target.focus();
    }, 0);

    this._previousValues.set(keyValue.id, { key: keyValue.key, value: keyValue.value }); 
  }

  private _addEmptyRow(): void {
    this.keyValuePairs.push(new KeyValueEntity("", ""));
    this.keyValuePairs = [...this.keyValuePairs];
  }
}