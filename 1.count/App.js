import { Component } from "react";

class App extends Component {
  state = {
    count: 0,
  };
  //+
  increment = () => {
    let value = this.value.value;
    let count = this.state.count + value * 1;
    this.setState({
      count,
    });
  };
  //-
  decrement = () => {
    let value = this.value.value;
    let count = this.state.count - value * 1;
    this.setState({
      count,
    });
  };

  //odd
  incrementOdd = () => {
    let value = this.value.value;
    let count = this.state.count;
    if (count % 2 === 1) {
      count = count + value * 1;
    }
    this.setState({
      count,
    });
  };

  //async
  incrementAsync = () => {
    let value = this.value.value;
    let count = this.state.count;
    count = count + value * 1;
    setTimeout(() => {
      console.log(1);
      this.setState({
        count,
      });
    }, 1000);
  };
  render() {
    return (
      <div>
        <h3>当前计数为{this.state.count}</h3>
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
