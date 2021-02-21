import { useState } from "react";
import { createContainer } from "unstated-next";

export const container = createContainer(() => {
    const [isAuthenticated, setIsAutheticated] = useState(true);
    const [webCamPhoto, setWebCamPhoto] = useState("");
    const [takingPhoto, setTakingPhoto] = useState(true);
    const [faceDesc, setFaceDesc] = useState(new Float32Array());


    // Voting States
    const [firstOption, setFirstOption] = useState(null);
    const [secondOption, setSecondOption] = useState(null);
    const [thridOption, setThirdOption] = useState(null);
    const [forthOption, setFourthOption] = useState(null);
    const [fifthOption, setFifthOption] = useState(null);

    // View State
    const [ sumbitVote, setSumbitVote ] = useState(false);

    return {
        isAuthenticated,
        setIsAutheticated,

        // voting
        firstOption, setFirstOption,
        secondOption, setSecondOption,
        thridOption, setThirdOption,
        forthOption, setFourthOption,
        fifthOption, setFifthOption,

        // View States
        sumbitVote, setSumbitVote,

        webCamPhoto,
        setWebCamPhoto,
        takingPhoto,
        setTakingPhoto,
        faceDesc,
        setFaceDesc
    };
});
