import * as React from "react";

import { CodeEditor } from "./../../components/CodeEditor"

import "./style.scss";

export function CodeDeployView() {
    return <div className="container">
        <h1>Choreo Code Editor</h1>
        <CodeEditor onChange={() => undefined }/>
    </div>
}