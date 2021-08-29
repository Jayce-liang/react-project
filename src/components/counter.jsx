import { Component } from "react";
//ui组件
class Counter extends Component {
  componentDidMount(){
    console.log(this.props.increment);
  }

  //+
  increment = () => {
    let value=this.value.value;
    this.props.increment(value);
  };
  
  //-
  decrement = () => {
    let value=this.value.value;
    this.props.decrement(value);
  };

  //odd
  incrementOdd = () => {
  };

  //async
  incrementAsync = () => {
  };
  render() {
    return (
      <div>
        <h3>当前计数为{this.props.count}</h3>
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

export default Counter;
