import React from "react";
import ReactDOM from 'react-dom'
import { container } from "./state";

import "./index.css";


ReactDOM.render(
    <React.StrictMode>
        <container.Provider>

        </container.Provider>
    </React.StrictMode>,
    document.getElementById("root")
);

