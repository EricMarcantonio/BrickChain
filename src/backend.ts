import a from "axios";

const axios = a.create({
    baseURL:
        "https://us-central1-aiot-fit-xlab.cloudfunctions.net/brickchainfunctions",
    headers: "",
});

export const SendFaceDesc = (userid: string, desc: Float32Array) => {
    return axios.post("/", {
        action: "setuserface",
        userid: userid,
        userface: desc.toString(),
    });
};

export const GetFaceDesc = (userid: string) => {
    return axios.post("/", {
        action: "getuserface",
        userid: userid,
    });
};

export const CreateUser = (userid: string, desc: Float32Array) => {
    return axios.post("/", {
        action: "createuser",
        userid: userid,
        userface1: desc.toString(),
        userface2: "",
    });
};


//response
export const SendVote = (
    userid: string,
    userface: Float32Array,
    first: string,
    second: string,
    third: string
) => {
    return axios.post("/", {
        action: "vote",
        userid: userid.toString(),
        userface: userface.toString(),
        first: first.toString(),
        second: second.toString(),
        third: third.toString(),
    });
};


export const GetVotes = () => {
    return a.get("http://4fe772188339.ngrok.io/chain")
}


export const AddToBlockChain = (vote: string, hash: string) => {
    return a.post('http://4fe772188339.ngrok.io/add2chain', {
        vote: vote,
        hash: hash
    })
}
