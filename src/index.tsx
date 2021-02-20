import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { container } from "./state";

ReactDOM.render(
    <React.StrictMode>
        <container.Provider>
            <div className="">Hello World with tailwindcss</div>
        </container.Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
