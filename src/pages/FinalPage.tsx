import React, { useEffect, useState } from "react";
import Chart from "../components/Chart";
import { GetAllVotes } from "../backend";

import "../styles/vote-page.css";

const blockChain = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function FinalPage() {
    const [data, setData] = useState();

    useEffect(() => {
        GetAllVotes().then(data => {
            console.log(data.data.candidates);
            let lol = [
                {
                    name: "Candidate A",
                    votes: data.data.candidates.A, // changeme
                },
                {
                    name: "Candidate B",
                    votes: data.data.candidates.B,
                },
                {
                    name: "Candidate C",
                    votes: data.data.candidates.C,
                },
                {
                    name: "Candidate D",
                    votes: data.data.candidates.D,
                },
                {
                    name: "Candidate E",
                    votes: data.data.candidates.E,
                },
            ];

            setData(lol);
        });
    }, []);

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
