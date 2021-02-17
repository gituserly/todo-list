import React from "react";

export default class Todo extends React.Component {
  
  render() {
    const { data, changeStatus, shanchuStatus } = this.props;
    //写成 const {inputid} = this.state 后你才可以直接用
    return (
      <div>
        <input
          checked={data.isCompleted}
          type="checkbox"
          onChange={(e) => changeStatus(e, data.id)}
        />
        {data.value}
        <button onClick={()=>shanchuStatus(data.id)}>删除</button>
      </div>
    );
  }
}
