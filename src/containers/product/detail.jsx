import React, { Component } from 'react'

export default class Detail extends Component {
 render() {
  return (
   <div>
     detail{this.props.match.params.id}
     <button onClick={()=>this.props.history.goBack()}>返回</button>
   </div>
  )
 }
}
