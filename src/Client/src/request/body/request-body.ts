import { bindable, BindingMode } from "aurelia";
import * as monaco from 'monaco-editor';
import { GroupedDropdown } from "../../common/dropdowns/grouped-dropdown/grouped-dropdown";

export class RequestBody {
    @bindable({ mode: BindingMode.twoWay }) public selectedBodyType: string = 'no-body';
    @bindable({ mode: BindingMode.twoWay }) public content: string = '';

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

    private editor: monaco.editor.IStandaloneCodeEditor;
    private editorContainer: HTMLElement;

    public attached(): void {
        try {
            this.initializeEditor();
        // eslint-disable-next-line no-empty
        } catch  {}
    }

    private initializeEditor(): void {
        try {
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
        // eslint-disable-next-line no-empty
        } catch {}

    }

    public selectedBodyTypeChanged(newValue: string): void {
        try {
            let language = 'plaintext';
            switch (newValue) {
                case 'json':
                    language = 'json';
                    break;
                case 'xml':
                    language = 'xml';
                    break;
                case 'yaml':
                    language = 'yaml';
                    break;
                case 'plain-text':
                    language = 'plaintext';
                    break;
                case 'no-body':
                    language = 'plaintext';
                    break;
                default:
                    language = 'plaintext';
            }
            monaco.editor.setModelLanguage(this.editor.getModel(), language);
        // eslint-disable-next-line no-empty
        } catch {}
    }
}
