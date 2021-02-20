import React, {useState} from "react";
import ReactDOM from 'react-dom'
import { container } from "./state";

// States


// Routes
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";

// Pages
import LandingPage from "./pages/LandingPage"
import FinalPage from "./pages/FinalPage"
import VideoAuthPage from "./pages/VideoAuthPage"
import VotePage from "./pages/VotePage"
import VoterloginPage from "./pages/VoterloginPage"
import UserOnboardingPage from "./pages/UserOnboardingPage"

import "./index.css";


const AuthRoute = () => (
        <Router>
            <Switch>
                <Route exact path="/">
                    <LandingPage />
                </Route>
                <Route path="/voter-login">
                    <VoterloginPage />
                </Route>
                <Route path="/user-onboarding">
                    <UserOnboardingPage />
                </Route>
            </Switch>
        </Router>
    )

const AppRoute = () => 
    (<Router>
        <Switch>
            <Route exact path="/">
                <LandingPage />
            </Route>
            <Route path="/voter-login">
                <VoterloginPage />
            </Route>
            <Route path="/video-auth">
                <VideoAuthPage />
            </Route>
            <Route path="/vote">
                <VotePage />
            </Route>
            <Route path="/done">
                <FinalPage />
            </Route>
            <Route path="/user-onboarding">
                <UserOnboardingPage />
            </Route>
        </Switch>
    </Router>)

const App = () => {

    // This state is suppose to come from Unstated States in container
    const con  = container.useContainer()

    console.log(con.isAuthenticated)

    return (
        con.isAuthenticated ? <AppRoute /> : <AuthRoute />
    )
}


ReactDOM.render(
    <React.StrictMode>
        <container.Provider>
            <App />
        </container.Provider>
    </React.StrictMode>,
    document.getElementById("root")
);

