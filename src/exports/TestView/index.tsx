import * as React from "react";
import {Button, Modal} from "antd"
interface TestViewProps{
  label:string
}

export default class TestView extends React.Component<TestViewProps>{
  
  state = {
    visible:false
  }

  onShow = (visible:boolean)=>{
    this.setState({
      visible
    })
  }

  render(){
    const {label} = this.props;
    const {visible} = this.state;
    return <div><Button onClick={()=>{this.onShow(true)}}>show modal</Button>---{label}<Modal title="antd modal" visible={visible} onCancel={()=>{this.onShow(false)}}>xxxxxxxxxxxx</Modal></div>
  }
}