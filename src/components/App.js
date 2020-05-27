import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import EntrancePage from "../screens/Entrance";
import RoomPage from "../screens/Room";
import ResizeHandler from "./ResizeHandler";


const App = () => {
    return (
        <ResizeHandler>
            <Router>
                <Switch>
                    <Route exact path="/" component={EntrancePage}/>
                    <Route exact path="/room" component={RoomPage}/>
                </Switch>
            </Router>
        </ResizeHandler>
    );
};


export default App;
