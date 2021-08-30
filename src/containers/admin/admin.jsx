import { Component } from "react";
import {connect} from "react-redux"
import {createDemo1Action} from "../../redux/actions/testAction"

class Admin extends Component{
    componentDidMount(){
        console.log("admin----",this.props);
    }
    render(){
        return(
            <h1>Admin</h1>
        )
    }
}
export default connect(
    state=>({test:state.test}),
    {
        demo1:createDemo1Action
    }
)(Admin)
