import * as React from "react";
import Button from "@material-ui/core/Button"

import "./styles.scss";

export function Home() {
    return <div className="container">
        <h1>Welcome to Choreo Console</h1>
        <Button>Start</Button>
    </div>
}