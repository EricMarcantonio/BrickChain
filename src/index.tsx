import React from "react";
import ReactDOM from 'react-dom'
import { container } from "./state";
import "./index.css";

ReactDOM.render(
    <React.StrictMode>
        <container.Provider>
            <img src="https://cdn.discordapp.com/attachments/812517678140227614/812756666331299910/image.png"alt="Logo" />

            <h3>BrickChain Voting</h3>
            <text>A block chain based transparent yet anonymous voting system</text>
            <text>1. Login using your voter ID </text>
            <text>2. Do Facial Authentication</text>
            <text>3. Rank Your Vote</text>
            <text>4. Submit Vote</text>
            <text>5. See Current Results</text>
            <text>6. See your Vote Block in the Chain</text>

            <img src="https://cdn.discordapp.com/attachments/812517678140227614/812756666331299910/image.png"alt="Logo" />

        </container.Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
