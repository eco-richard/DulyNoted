import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import SplashPage from "./components/SplashPage";
import HomePage from "./components/HomePage";
import Notes from "./components/Notes";
import Notebooks from "./components/Notebooks";
import SingleNotebook from "./components/Notebooks/SingleNotebook";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {/* <Navigation isLoaded={isLoaded} /> */}
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/">
            <SplashPage />
          </Route>
          <Route exact path="/home">
            <HomePage />
          </Route>
          <Route path="/notes/:noteId">
            <Notes />
          </Route>
          <Route exact path="/notebooks">
            <Notebooks />
          </Route>
          <Route exact path="/notebooks/:notebookId">
            <SingleNotebook />
          </Route>
          <Route exact path="/notebooks/:notebookId/notes/:noteId">
            <Notes />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
