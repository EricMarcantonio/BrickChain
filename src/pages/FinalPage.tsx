import React, { useEffect, useState } from "react";
import Chart from "../components/Chart";
import { GetVotes } from "../backend";

import "../styles/vote-page.css";

const blockChain = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function FinalPage() {
    const [data, setData] = useState();

    useEffect(() => {
        GetVotes().then(data => {
            let lol = [
                {
                    name: "Candidate A",
                    votes: 10, // changeme
                },
                {
                    name: "Candidate B",
                    votes: 2,
                },
                {
                    name: "Candidate C",
                    votes: 3,
                },
                {
                    name: "Candidate D",
                    votes: 44,
                },
                {
                    name: "Candidate E",
                    votes: 2,
                },
            ];

            setData(lol);
        });
    });

    return (
        <div className="text-center text-4xl p-10">
            <h1 className="">Election Results</h1>
            <div className="flex flex-col justify-center align-center text-center m-10 w-full -ml-4">
                <div className="self-center">
                    <Chart data={data} />
                </div>

                <div className="flex flex-col justify-center align-center m-10">
                    <h1>Your Vote In the Chain</h1>

                    <div className="block-chain self-center">
                        {blockChain.map((item, index) =>
                            item === 8 ? (
                                <a className="block block-unique">Your Vote</a>
                            ) : (
                                <span className="block" />
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FinalPage;
