import a from "axios";

const axios = a.create({
    baseURL:
        "https://us-central1-aiot-fit-xlab.cloudfunctions.net/brickchainfunctions",
        headers: ""
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
