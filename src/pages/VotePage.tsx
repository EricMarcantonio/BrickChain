import React, {useState } from 'react'
import CandidateCard from '../components/CandidateCard'

import CANDIDATE_LOGO_TOP from '../assets/top.png'
import VotePointsOptions from '../components/VotePointsOptions'
import CircularIndeterminate from '../components/Loading'

import '../styles/vote-page.css'
import { Button } from '@material-ui/core'

import { useHistory } from "react-router-dom";


// Sate
import { container } from "../state";

export interface Candidate {
    name: string;
    party: string;
    partyLeader: String;
}

const CANDIDATES = [
    { name: "Candidate A", party: "Party A", partyLeader: "Leader A", src:"https://images-platform.99static.com//JBUCJ4ZTzO2yShW2oVYEiB69DUc=/101x0:866x765/fit-in/500x500/99designs-contests-attachments/51/51405/attachment_51405319" },
    { name: "Candidate B", party: "Party B", partyLeader: "Leader B", src:"https://www.graphicsprings.com/filestorage/stencils/3378bef47673cbd31dd9a8c23ccf909d.png?width=500&height=500" },
    { name: "Candidate C", party: "Party C", partyLeader: "Leader C", src:"https://www.graphicsprings.com/filestorage/stencils/5dbb293a31960c27177152551937cdbf.png?width=500&height=500" },
    { name: "Candidate D", party: "Party D", partyLeader: "Leader D", src:"https://www.graphicsprings.com/filestorage/stencils/3378bef47673cbd31dd9a8c23ccf909d.png?width=500&height=500" },
    { name: "Candidate E", party: "Party E", partyLeader: "Leader E", src:"https://images-platform.99static.com//JBUCJ4ZTzO2yShW2oVYEiB69DUc=/101x0:866x765/fit-in/500x500/99designs-contests-attachments/51/51405/attachment_51405319" },
]


function VotePage() {
    let history = useHistory();

    const con  = container.useContainer()
    const [choices, setChoices] = useState([])

    const [ vote, setVote ] = useState()

    const handleVote = () => {

        // SEND VOTE TO BACK END
        console.log(vote)
    
        con.setSumbitVote(true)
        setTimeout(() => {
            con.setSumbitVote(false)
            history.push('/done')

        }, 800);

    }

    const handleReset = () => {
        setChoices([])
        setVote({})
    }


    return (
        con.sumbitVote ? 
        <CircularIndeterminate /> :
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
                        <CandidateCard item={item} />
                        <VotePointsOptions item={item} choices={choices} setChoices={setChoices} setVote={setVote} vote={vote} index={index}/>
                    </div>
                ))
            }
            </div>

            <div className="footer">
                <button 
                    onClick={handleReset}
                    className="button-vote">Reset</button>

                <button 
                    onClick={handleVote}
                    disabled={!vote} 
                    className="button-vote">Submit Vote</button>
            </div>
        </div>
    )
}

export default VotePage
