import React from 'react'

import {FaceID} from '../FaceID'

import landingpage from '../assets/landingpage.gif'

import { useHistory } from "react-router-dom";


function LandingPage() {
    let history = useHistory();

    return (
        <>
            <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column'}}>  
            <img src="https://cdn.discordapp.com/attachments/812517678140227614/812756666331299910/image.png"alt="Logo" />

            <h3 style={{ fontSize: 30, fontWeight: 'bold'}}>BrickChain Voting</h3>
            <text style={{ fontSize: 18, paddingBottom: 10}}>A block chain based transparent yet anonymous voting system</text>

            <img src={landingpage} style={{ width: 500 }}/>
            <ul> 
                <li style={{ fontSize: 18, paddingTop: 20}}>1. Login using your voter ID </li>
                <li style={{ fontSize: 18}}>2. Do Facial Authentication</li>
                <li style={{ fontSize: 18}}>3. Rank Your Vote</li>
                <li style={{ fontSize: 18}}>4. Submit Vote</li>
                <li style={{ fontSize: 18, paddingBottom: 20}}>6. See your Vote Block in the Chain</li>
            </ul>
            <button style={{ backgroundColor: "#000", color: "#fff", fontSize: 20, padding: 10, borderRadius: 5, margin: 10}} onClick={() => { history.push("/voter-login")}}>Get Started!</button>
            <img src="https://cdn.discordapp.com/attachments/812517678140227614/812756666331299910/image.png"alt="Logo" />
            </div>
        </>
    )
}

export default LandingPage
