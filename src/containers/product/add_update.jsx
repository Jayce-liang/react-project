import React, { Component } from 'react'

export default class AddUpdate extends Component {
 render() {
  return (
   <div>
    AddUpdate{this.props.match.params.id}
    <button onClick={()=>this.props.history.goBack()}>返回</button>
   </div>
  )
 }
}
