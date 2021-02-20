import React from 'react'
import CandidateCard from '../components/CandidateCard'

import CANDIDATE_LOGO_TOP from '../assets/top.png'
import VotePointsOptions from '../components/VotePointsOptions'

import '../styles/vote-page.css'
import { Button } from '@material-ui/core'
export interface Candidate {
    name: string;
    party: string;
    partyLeader: String;
}

const CANDIDATES = [
    { name: "Bill Blair", party: "Liberal", partyLeader: "Justin Trudeau", src:"https://media2.fdncms.com/thecoast/imager/u/zoom/4815468/douche_bag_jpg-magnum.jpg" },
    { name: "Dolly Begum", party: "NDP", partyLeader: "Jagmeet Singh", src:"https://media2.fdncms.com/thecoast/imager/u/zoom/4815468/douche_bag_jpg-magnum.jpg" },
    { name: "Doug Ford", party: "Conservative", partyLeader: "Erin O'Toole", src:"https://media2.fdncms.com/thecoast/imager/u/zoom/4815468/douche_bag_jpg-magnum.jpg" },
    { name: "Elric Bakmen", party: "Green Party", partyLeader: "Annamie Paul" , src:"https://media2.fdncms.com/thecoast/imager/u/zoom/4815468/douche_bag_jpg-magnum.jpg"},
]


function VotePage() {
    return (
        <div className="container mx-auto">
            <div 
                style={{ display : "flex", justifyContent : "center", alignItems: "center"}} 
                className="header-vote-page-wrapper flex flex-col justify-center mx-auto p-10 bg-gray-100 border-2 mb-2">
                <img className="w-20 mb-2" src={CANDIDATE_LOGO_TOP}></img>
                <h1 className="text-2xl font-semibold pt-2">Your Candidates</h1>
            </div>

            <h1 className="text-2xl font-semibold p-5">Pick By Rank</h1>
            <hr></hr>
            <div>
            {
                CANDIDATES.map((item: Candidate, index: number) => (
                    <div className="flex flex-row m-5">
                        
                        <VotePointsOptions/>
    
                        <CandidateCard item={item} />
                    </div>
                ))
            }
            </div>

            <div className="footer">
                <button className="button-vote">Submit Vote</button>
            </div>
        </div>
    )
}

export default VotePage
