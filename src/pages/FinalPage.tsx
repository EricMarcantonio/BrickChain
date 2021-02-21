import React from 'react'
import Chart from '../components/Chart'

import "../styles/vote-page.css"

const blockChain = [1, 2, 3, 4, 5, 6, 7,8,9,10,11,12,13,14,15,16]

function FinalPage() {
    return (
        <div className="text-center text-4xl p-10">
            <h1 className="">Election Results</h1>
            <div className="flex flex-col justify-center align-center text-center m-10">
                <Chart />

                <div className="flex flex-col ustify-center align-center m-10">
                    <h1>Your Vote In the Chain</h1>

                    <div className="block-chain">
                        {
                            blockChain.map((item, index) => (
                                item === 15 ? <a className="block block-unique">Your Vote</a> :  <span className="block"/>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FinalPage
