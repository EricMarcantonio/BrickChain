import React from 'react'

import {FaceID} from '../FaceID'

import landingpage from '../assets/landingpage.gif'

import { useHistory } from "react-router-dom";


function LandingPage() {
    let history = useHistory();

    return (
        <>
            <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column'}}>  
            <img style={{width: "100%", height: "50px" , padding: "0px"}} src="https://cdn.discordapp.com/attachments/812517678140227614/812756666331299910/image.png"alt="Logo" />

            <h3 style={{ fontSize: 30, fontWeight: '700', fontSize: "50px", marginTop: "20px"}}>BrickChain Voting</h3>
            <text className="text-gray-500 mb-4" style={{ fontSize: 18, paddingBottom: 10}}>A block chain based transparent yet anonymous voting system</text>

            <img className="border-2 rounded m-2" src={landingpage} style={{ width: 350 }}/>
            <ul className="border p-5 cursor-pointer"> 
                <li className="border mb-2  p-2" style={{ display: 'flex', alignItems: "center",  fontSize: 18}}>
                    <img style={{ width: "40px", marginLeft: '5px'}}src="https://img.freepik.com/free-vector/illustration-lock-icon_53876-5633.jpg?size=338&ext=jpg" ></img>
                    Login using your voter ID 
                </li>
                <li className="border mb-2  p-2" style={{ display: 'flex', alignItems: "center",  fontSize: 18}}>
                    <img style={{ width: "40px", marginLeft: '5px'}}src="https://media.istockphoto.com/vectors/facial-recognition-system-concept-icons-simple-vector-illustration-vector-id1138172609?k=6&m=1138172609&s=612x612&w=0&h=A7xD4vlnLT5pGfGprcrRzrgNvHHW8qO3fy1HxAOTmhE=" ></img>
                    Do Facial Authentication
                </li>
                <li className="border mb-2  p-2" style={{ display: 'flex', alignItems: "center",  fontSize: 18}}>
                    <img style={{ width: "50px", marginRight: '5px'}} src="https://image.freepik.com/free-vector/clipboard-vector-illustration_138676-249.jpg" ></img>
                    Rank Your Vote & Submit 
                </li>
                <li className="border mb-2  p-2" style={{ display: 'flex', alignItems: "center",  fontSize: 18}}>
                    <img style={{ width: "50px", marginRight: '5px'}} src="https://dm0qx8t0i9gc9.cloudfront.net/thumbnails/video/uh59Wh0/bar-graph-arrow-going-up-line-drawing-illustration-animation-with-transparent-background_bxg6isd-g_thumbnail-1080_07.png" ></img>
                    See your Vote Block in the Chain
                </li>
            </ul>
            <button style={{ backgroundColor: "#000", color: "#fff", fontSize: 20, padding: 10, borderRadius: 5, margin: 10}} onClick={() => { history.push("/voter-login")}}>Get Started!</button>
                <img style={{width: "100%", height: "50px" , padding: "0px"}} src="https://cdn.discordapp.com/attachments/812517678140227614/812756666331299910/image.png"alt="Logo" />
            </div>
        </>
    )
}

export default LandingPage
