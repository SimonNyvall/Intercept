import { bindable } from "aurelia";
import { KeyValueEntity } from "../../entities/key-value-entity";

export class TableComponent {
  @bindable public keyValuePairs: KeyValueEntity[] = [];

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

    this.keyValuePairs.push(new KeyValueEntity("", ""));
  }

  public removeKeyValuePair(id: string): void {
    const index = this.keyValuePairs.findIndex((pair) => pair.id === id);

    if (index === -1) {
      return;
    }

    const lastRowId = this.keyValuePairs[this.keyValuePairs.length - 1].id;

    this.keyValuePairs.splice(index, 1);

    if (id === lastRowId) {
      this._addEmptyRow();
    }
  }

  public onInputChange(): void {
    const lastRow = this.keyValuePairs[this.keyValuePairs.length - 1];

    if (lastRow.key === '' && lastRow.value === '') {
      return;
    }

    this._addEmptyRow();
  }

  private _addEmptyRow(): void {
    this.keyValuePairs.push(new KeyValueEntity("", ""));
  }
}