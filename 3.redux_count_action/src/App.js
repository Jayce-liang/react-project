import { Component } from "react";

class App extends Component {
  //+
  increment = () => {
    let value = this.value.value;
    this.props.store.dispatch({
      type: "add",
      data: value,
    });
  };
  //-
  decrement = () => {
    let value = this.value.value;
    this.props.store.dispatch({
      type: "jian",
      data: value,
    });
  };

  //odd
  incrementOdd = () => {
    let value = this.value.value;
    let count = this.props.store.getState();
    if (count % 2 === 1) {
      this.props.store.dispatch({
        type: "add",
        data: value,
      });
    }
  };

  //async
  incrementAsync = () => {
    let value = this.value.value;
    setTimeout(() => {
      this.props.store.dispatch({
        type: "add",
        data: value,
      });
    }, 1000);
  };
  render() {
    return (
      <div>
        <h3>当前计数为{this.props.store.getState()}</h3>
        <select ref={(value) => (this.value = value)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        &nbsp;
        <button onClick={this.increment}>+</button>
        <button onClick={this.decrement}>-</button>
        <button onClick={this.incrementOdd}>odd</button>
        <button onClick={this.incrementAsync}>async</button>
      </div>
    );
  }
}

export default App;
