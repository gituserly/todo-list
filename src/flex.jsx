import React from "react";
import "./Flex.css"
export default class Flex extends React.Component {
  render() {
    return (
      <div>
        <h1>nihao</h1>
        <div className="flex">
            <div className="flex1">1</div>
            <div className="flex2">2</div>
            <div className="flex3">3</div>
            <div className="flex4">4</div>
            <div className="flex5">5</div>
        </div>
        <div className="abso">abc</div>
      </div>
    );
  }
}
