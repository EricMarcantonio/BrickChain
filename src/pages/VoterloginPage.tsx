import React from 'react'

import {FaceID} from '../FaceID'

import loginpage from '../assets/loginpage.png'

function VoterloginPage() {
    return (
        <>
            <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column'}}>  
            <h3>Voter Verification</h3>

            <img src="https://cdn.discordapp.com/attachments/812517678140227614/812756666331299910/image.png"alt="Logo" />
            
            <form>
                <label>Name:
                    <input type="text" name="name" />
                </label>
                <input type="submit" value="Submit" />
            </form>
            </div>
        </>
    )
}

export default VoterloginPage
