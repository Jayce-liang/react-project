import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Component } from "react";
import Admin from "./containers/admin/admin";
import Login from "./containers/login/login";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/admin" component={Admin} />
            <Route path="/" component={Admin} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
