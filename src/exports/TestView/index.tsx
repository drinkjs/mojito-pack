import * as React from "react";

interface TestViewProps{
  label:string
}

export default class TestView extends React.Component<TestViewProps>{
  render(){
    const {label} = this.props;
    return <div>TestView---{label}</div>
  }
}