import React, { useState } from "react";

import { FaceID } from "../FaceID";

import loginpage from "../assets/loginpage.png";

import Divider from "@material-ui/core/Divider";

import { useHistory } from "react-router-dom";

import CircularIndeterminate from "../components/Loading";
import firebase from "../firebase";
import { container } from "../state";

function VoterloginPage() {
    let history = useHistory();

    const con = container.useContainer();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const doLogIn = () => {
        setLoading(true);
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(user => {
                setLoading(false);
                con.setUserId(user.user?.uid || "");
                con.setUserEmail(user.user?.email || "");
                history.push("/video-auth");
            })
            .catch(err => {
                setError(true);
            });
    };

    return (
        <>
            {loading ? (
                <CircularIndeterminate />
            ) : (
                <div
                    style={{
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "column",
                        marginTop: 100,
                    }}
                >
                    <h3 style={{ fontSize: 24, fontWeight: "bold" }}>
                        Voter Verification
                    </h3>
                    {error ? <h1>Login Failed Try Again</h1> : null}

                    <Divider />

                    <img src={loginpage} style={{ width: 500 }} alt="Logo" />

                    <form
                        onSubmit={doLogIn}
                        style={{ flexDirection: "column", display: "flex" }}
                        className="space-y-3"
                    >
                        <div className="text-2xl self-center">Login</div>

                        <input
                            type="text"
                            placeholder="Email"
                            autoComplete={"off"}
                            className="rounded-lg p-3 w-full border-black border-2"
                            onChange={e => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="password...ssh"
                            autoComplete={"off"}
                            className="rounded-lg p-3 w-full border-black border-2"
                            onChange={e => setPassword(e.target.value)}
                        />

                        <input
                            type="submit"
                            onClick={doLogIn}
                            style={{
                                backgroundColor: "#000",
                                color: "#fff",
                                fontSize: 20,
                                marginTop: 60,
                                padding: 10,
                                borderRadius: 5,
                                margin: 10,
                                cursor: "pointer",
                            }}
                        />
                    </form>

                    <button
                        onClick={() => history.push("user-onboarding")}
                        type="button"
                        style={{
                            backgroundColor: "#000",
                            color: "#fff",
                            fontSize: 15,
                            marginTop: 60,
                            padding: 10,
                            borderRadius: 5,
                            margin: 10,
                        }}
                    >
                        Do On Boarding
                    </button>

                    <div className="text-center">
                        <h1>
                            <b>Test User</b>
                        </h1>
                        <ul>
                            <li> email: test@test.com </li>
                            <li> Password: bricks </li>
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
}

export default VoterloginPage;
