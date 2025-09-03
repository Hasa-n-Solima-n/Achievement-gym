import LoginPage from "./Components/LoginPage";
import Forgot from "./Components/Forgot";
import {
  BrowserRouter,
  Route,
  Switch,
} from "react-router-dom/cjs/react-router-dom.min";
import ResetPassword from "./Components/ResetPassword";
import CreateAccount from "./Components/CreateAccount";
import HomePost from "./Components/HomePost";
import AddSession from "./Components/AddSession";
import Sessions from "./Components/Sessions";
import MembersPage from "./Components/MembersPage";
import MemberDashboard from "./Components/MemberDashboard";
import SessionData from "./Components/SessionData";
// import SessionData from "./Components/SessionData";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        {localStorage.getItem("authToken") && (
          <Route exact path="/">
            <Sessions />
          </Route>
        )}
        {!localStorage.getItem("authToken") && (
          <Route exact path="/">
            <LoginPage />
          </Route>
        )}

        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route exact path="/Forgot">
          <Forgot />
        </Route>
        <Route exact path="/Reset">
          <ResetPassword />
        </Route>
        <Route exact path="/Create">
          <CreateAccount />
        </Route>
        <Route exact path="/homePost">
          <HomePost />
        </Route>
        <Route exact path="/addSession/:memberId">
          <AddSession />
        </Route>
        <Route exact path="/Sessions">
          <Sessions />
        </Route>
        <Route exact path="/SessionData/:sessionId">
          <SessionData />
        </Route>
        <Route exact path="/members">
          <MembersPage />
        </Route>
        <Route exact path="/profile/:memberId">
          <MemberDashboard />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
