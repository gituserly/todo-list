import React from "react";
import Todo from "./Todo";
import "./TodoList.css";
const tabs=[
  {key:1,value:'全部'},
  {key:2,value:"正在进行"},
  {key:3,value:"已完成"}
];

export default class TodoList extends React.Component {
  id = 0;
  state = {
    shuru: "",
    list: [],
    activetab:1
  };;
  
  handleChange = (e) => {
    this.setState({ shuru: e.target.value });
  };

  handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      const { list, shuru } = this.state;
      this.setState({
        list: [
          ...list,
          {
            id: this.id++,
            isCompleted: false,
            value: shuru
          }
        ],
        shuru: ""
      });
    }
  };

  changeStatus = (e, id) => {
    const checked = e.target.checked;
    console.log("checked", checked);
    this.setState({
      list: this.state.list.map((item) =>
        item.id === id ? { ...item, isCompleted: checked } : item
      )
    });
  };
  shanchuStatus=(id)=>
  {const alist=this.state.list.filter((listitem)=>{return listitem.id !==id})
    this.setState({list:alist})
  }
  
  render() {
    const currentList = this.state.list.filter((item) => !item.isCompleted);
    // console.log("currentList", currentList);
    const completedList = this.state.list.filter((item) => item.isCompleted);
    

    return (

      <div className="todolist">
        <div className="tabs ">
          
        {tabs.map((v)=>{return <div  onClick={()=>{this.setState({activetab:v.key})}}  
        className={v.key===this.state.activetab ? "active":""}>
           {v.value }
           
          </div>
      
          }
        
        )}
        </div>
        
        <input  type="text"
          value={this.state.shuru}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
       {this.state.activetab !==3?<div><div>正在进行 {currentList.length}</div>
        {currentList.map((item) => (
          <Todo key={item.id} data={item} changeStatus={this.changeStatus}
          shanchuStatus={this.shanchuStatus} />
        ))}</div>:null} 
       {this.state.activetab !==2?<div><div>已完成{completedList.length}</div>
        {completedList.map((item) => (
          <Todo key={item.id} data={item} changeStatus={this.changeStatus}
          shanchuStatus={this.shanchuStatus}/>
        ))}</div>:null} 
      </div>
    );
  }
}
