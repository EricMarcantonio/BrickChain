import React from 'react'

import {FaceID} from '../FaceID'

import landingpage from '../assets/landingpage.gif'

function LandingPage() {
    return (
        <>
            <div className="">Hello World with tailwindcss</div>
                <FaceID/>

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
        </>
    )
}

export default LandingPage
