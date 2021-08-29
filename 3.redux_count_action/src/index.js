import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from "./redux/store";


ReactDOM.render(<App store={store} />, document.getElementById("root"));

//redux更新状态时render页面
store.subscribe(() => {
  ReactDOM.render(<App store={store} />, document.getElementById("root"));
});
