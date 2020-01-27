import * as React from "react";
import MonacoEditor, { ChangeHandler } from "react-monaco-editor";
import { editor } from "monaco-editor/esm/vs/editor/editor.api"
import * as grammar from "./ballerina.monarch.json";

const BALLERINA_LANG = "ballerina";

import "./style.scss";

const MONACO_OPTIONS: editor.IEditorConstructionOptions  = {
    autoIndent: "full",
    automaticLayout: true,
    contextmenu: false,
    fontFamily: "\"Lucida Console\", Monaco, monospace",
    fontSize: 13,
    hideCursorInOverviewRuler: true,
    lineNumbersMinChars: 1,
    matchBrackets: "always",
    minimap: {
        enabled: false,
    },
    overviewRulerBorder: false,
    overviewRulerLanes: 0,
    renderIndentGuides: false,
    scrollBeyondLastLine: false,
    scrollbar: {
        useShadows: true,
    },
};

export interface CodeEditorProps {
    onChange: ChangeHandler;
}

export function CodeEditor(props: CodeEditorProps) {
    return <div className="code-editor w3-container">
        <MonacoEditor
            language={BALLERINA_LANG}
            value={"function name() {}"}
            options={MONACO_OPTIONS}
            onChange={props.onChange}
            editorDidMount={(monacoEditor, { languages }) => {
                languages.register({ id: BALLERINA_LANG });
                languages.setMonarchTokensProvider(BALLERINA_LANG, {
                    tokenizer: grammar as any,
                });

            }}
        />
    </div>;
}
