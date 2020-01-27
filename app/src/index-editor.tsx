import * as React from "react";
import * as ReactDOM from "react-dom";

import { CodeDeployView  } from "./views/CodeDeploy";

import "./styles/index.scss"

ReactDOM.render(
    <CodeDeployView />,
    document.getElementById("container"),
);
