import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Component } from "react";
import Admin from "./pages/admin/admin";
import Login from "./pages/login/login";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/admin" component={Admin} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
