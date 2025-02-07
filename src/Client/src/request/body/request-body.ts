import { bindable } from "aurelia";
import * as monaco from 'monaco-editor';

export class RequestBody {
    @bindable public type: string = 'None'; 
    @bindable public content: string = '';

    private editor: monaco.editor.IStandaloneCodeEditor;
    private editorContainer: HTMLElement;

    public attached(): void {
        this.initializeEditor();
    }

    private initializeEditor(): void {
        this.editor = monaco.editor.create(this.editorContainer, {
            value: this.content,
            language: 'json',
            theme: 'vs-dark',
            automaticLayout: true,
            minimap: { enabled: false } 
        });

        this.editor.onDidChangeModelContent(() => {
            this.content = this.editor.getValue();
        })
    }
}
