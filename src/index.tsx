import React from "react";
import ReactDOM from 'react-dom'
import { container } from "./state";
import "./index.css";
import landingpage from './assets/landingpage.gif'

ReactDOM.render(
    <React.StrictMode>
        <container.Provider>
            <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column'}}>  
            <img src="https://cdn.discordapp.com/attachments/812517678140227614/812756666331299910/image.png"alt="Logo" />

            <h3>BrickChain Voting</h3>
            <text>A block chain based transparent yet anonymous voting system</text>

            <img src={landingpage}/>
            <ul> 
            <li>1. Login using your voter ID </li>
            <li>2. Do Facial Authentication</li>
            <li>3. Rank Your Vote</li>
            <li>4. Submit Vote</li>
            <li>5. See Current Results</li>
            <li>6. See your Vote Block in the Chain</li>
            </ul>
            <img src="https://cdn.discordapp.com/attachments/812517678140227614/812756666331299910/image.png"alt="Logo" />
            </div>
        </container.Provider>
    </React.StrictMode>,
    document.getElementById("root")
);

