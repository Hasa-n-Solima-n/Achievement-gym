import React from "react";
import LoginPage from "./Components/LoginPage";
import Forgot from "./Components/Forgot";
import {
  BrowserRouter,
  Route,
  Switch,
} from "react-router-dom/cjs/react-router-dom.min";
import ResetPassword from "./Components/ResetPassword";
import CreateAccount from "./Components/CreateAccount";

const App = () => {
  return (
    // <BrowserRouter>
    //   <Switch>
    //     <Route exact path="/">
    //       <LoginPage />
    //     </Route>
    //     <Route exact path="/Forgot">
    //       <Forgot />
    //     </Route>
    //     <Route exact path="/Reset">
    //       <ResetPassword />
    //     </Route>
    //   </Switch>
    // </BrowserRouter>
    <CreateAccount></CreateAccount>
  );
};

export default App;
