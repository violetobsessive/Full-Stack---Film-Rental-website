import React from "react";
import "./App.css";
import { Navbar } from "./layout/NavbarAndFooter/Navbar";
import { Homepage } from "./layout/Homepage/Homepage";
import { Footer } from "./layout/NavbarAndFooter/Footer";
import { SearchFilmsPage } from "./layout/SearchFilmsPage/SearchFilmsPage";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import { FilmCheckoutPage } from "./layout/FilmCheckoutPage/FilmCheckoutPage";
import { oktaConfig } from "./lib/oktaConfig";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { Security, LoginCallback } from "@okta/okta-react";
import LoginWidget from "./Auth/LoginWidget";

const oktaAuth = new OktaAuth(oktaConfig);

export const App = () => {
  const customerAuthHandler = () => {
    history.push("/login");
  };

  //history object is used for navigating within the application
  const history = useHistory();

  //toRelativeUrl is commonly used to generate a relative URL based on a given path or URI
  //and the current window location origin

  const restoreOriginalUri = async (_oktaAuth: any, originalUri: any) => {
    history.replace(toRelativeUrl(originalUri || "/", window.location.origin));
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Security
        oktaAuth={oktaAuth}
        restoreOriginalUri={restoreOriginalUri}
        onAuthRequired={customerAuthHandler}
      >
        <Navbar />
        <div className="flex-grow-1">
          <Switch>
            <Route path="/" exact>
              <Redirect to="/home" />
            </Route>

            <Route path="/home">
              <Homepage />
            </Route>

            <Route path="/search">
              <SearchFilmsPage />
            </Route>

            <Route path="/checkout/:filmId">
              <FilmCheckoutPage />
            </Route>

            <Route
              path="/login"
              render={() => <LoginWidget config={oktaConfig} />}
            />

            <Route path="/login/callback" component={LoginCallback} />
          </Switch>
        </div>
        <Footer />
      </Security>
    </div>
  );
};

export default App;
