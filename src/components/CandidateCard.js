import React from 'react'
import '../styles/vote-page.css'

// Models

import PARTY from '../assets/party.jpg'
import LEADER from '../assets/icons/candidate.svg'
import CANDIDATE from '../assets/icons/leader.svg'


function CandidateCard({ item }) {
    return (
    <div className="card-body shadow">
        <img className="candidate-img" src={item.src}></img>
        <div className="card-body-sub flex flex-col justify-between p-3 ml-4">
            <p className="flex flex-row ml-5">
                <img src={LEADER} className="candidate-icon"></img>
                <span className="ml-4"><b>Party: </b>{item.party}</span>
            </p>
            <p className="flex flex-row ml-5">
                <img src={CANDIDATE} className="candidate-icon"></img>
                <span className="ml-4"><b>Candidate: </b>{item.name}</span>
            </p>
            <p className="flex flex-row ml-5">
                <img src={LEADER} className="candidate-icon"></img>
                <span className="ml-4"><b>Candidate: </b>{item.partyLeader}</span>
            </p>
        </div>
    </div>
    )
}

export default CandidateCard
