import { bindable, customElement } from 'aurelia';

@customElement('tab')
export class Tab {
  @bindable name!: string; // Tab name
  @bindable activeTab!: string; // The currently active tab
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @bindable parent!: any; // Reference to the parent Tabs component

  attached(): void {
    // Register the tab with the parent Tabs component
    this.parent?.addTab(this.name);
  }

  get isActive(): boolean {
    return this.name === this.activeTab; // Check if the tab is active
  }
}
