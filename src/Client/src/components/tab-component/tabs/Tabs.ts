export class Tabs {
  tabs: string[] = []; // List of tabs
  activeTab: string = ''; // Currently active tab

  addTab(tabName: string): void {
    if (!this.tabs.includes(tabName)) {
      this.tabs.push(tabName);
      if (this.tabs.length === 1) {
        this.activeTab = tabName; // Activate the first tab by default
      }
    }
  }

  setActiveTab(tabName: string): void {
    this.activeTab = tabName; // Update the active tab
  }
}
