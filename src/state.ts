import { useState } from "react";
import { createContainer } from "unstated-next";

export const container = createContainer(() => {
    const [isAuthenticated, setIsAutheticated] = useState(true);
    const [webCamPhoto, setWebCamPhoto] = useState("");
    const [takingPhoto, setTakingPhoto] = useState(true);
    const [faceDesc, setFaceDesc] = useState(new Float32Array());
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [firstOption, setFirstOption] = useState(null);
    const [secondOption, setSecondOption] = useState(null);
    const [thridOption, setThirdOption] = useState(null);
    const [forthOption, setFourthOption] = useState(null);
    const [fifthOption, setFifthOption] = useState(null);

    const [ sumbitVote, setSumbitVote ] = useState(false);


    const [userId, setUserId] = useState("");

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


        //Auth onboarding
        webCamPhoto,
        setWebCamPhoto,
        takingPhoto,
        setTakingPhoto,
        faceDesc,
        setFaceDesc,
        userEmail,
        setUserEmail,
        userPassword,
        setUserPassword,
        userId,
        setUserId

    };
});
