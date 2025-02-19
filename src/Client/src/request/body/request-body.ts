import { bindable } from "aurelia";
import * as monaco from 'monaco-editor';
import { GroupedDropdown } from "../../common/dropdowns/grouped-dropdown/grouped-dropdown";

export class RequestBody {
    @bindable public type: string = 'None'; 
    @bindable public content: string = '';

    static dependencies = [
        GroupedDropdown
    ];

    public bodyTypeOptions: Array<{ label: string, imageUrl?: string, imageClass?: string, options: Array<{ label: string, value: string }> }> = [
        {
            label: 'Text',
            imageUrl: '../../../../assets/json.png',
            imageClass: 'json-image',
            options: [
                { label: 'JSON', value: 'json' },
                { label: 'XML', value: 'xml' },
                { label: 'YAML', value: 'yaml' },
                { label: 'Plain Text', value: 'plain-text' }
            ]
        },
        {
            label: 'Other',
            imageUrl: '../../../../assets/dotdotdot.png',
            imageClass: 'dotdotdot-image',
            options: [
                { label: 'No Body', value: 'no-body' }
            ]
        }
    ];
    public selectedBodyType: string = 'json';

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
