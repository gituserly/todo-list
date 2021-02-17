
import React from "react";

export default class Todolistreturn  extends React.Component{
    id = 0; 
    state = { shuru: "", list: [], inputid : null
};

handleChange = (e) => {
  this.setState({ shuru: e.target.value });
 //* console.log(e.target.value)
};

handleKeyDown = (e) => {
 //* console.log(this.state.shuru)
  
  if (e.keyCode === 13  ) {
    //或者写成（e.keyCode === 13  && this.state.shuru !==""）
    if (this.state.shuru==='') {return}
    const { list, shuru } = this.state;

this.setState({
      list: [...list,
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
  //这里的id是下面onChange={(e) => this.changeStatus(e, item.id) 
  //里面传入的item.id
  const checked = e.target.checked;
  this.setState({
    list: this.state.list.map((item) =>
      item.id === id ? { ...item, isCompleted: checked } : item
    )
  });
};
ShanchuStatus=(id)=>
{const alist=this.state.list.filter((listitem)=>{return listitem.id !==id})
  this.setState({list:alist})
}

changeValue=(e,id)=>{
  const evalue = e.target.value
 
  const vlist=this.state.list.map(
    (item)=>{return item.id ===id?{...item,value: evalue}:item})

  this.setState({list:vlist}
    )


}
onDoubleClick=(id)=>{  return this.setState({inputid:id})}

saveValue=(e,va)=>{
  console.log(va);
  if (e.keyCode ===13 && va !=="")
  {
    
  this.setState({inputid:null})
  }
}


   render()
   {
       const currentList = this.state.list.filter((item) => !item.isCompleted);
    
    const completedList = this.state.list.filter((item) => item.isCompleted);

    return (
        <div className="todolist">
          <input
            type="text"
            value={this.state.shuru}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
          />
          <div>正在进行 {currentList.length}</div>
          {currentList.map((item) => (
            
            <div key={item.id}>
              <input
                type="checkbox"
                onChange={(e) => this.changeStatus(e, item.id)
                }
              />
             {this.state.inputid === item.id ?
            <input value = {item.value} 
            onChange={(e)=>this.changeValue(e,item.id)}
           onKeyDown={(e)=>this.saveValue(e,item.value)}
            /> :
            <span onDoubleClick ={()=>this.onDoubleClick(item.id)}>
              {item.value}</span>
            }
              
              <button  onClick ={()=>this.ShanchuStatus(item.id)}>删除</button>
                
            </div>
          ))}
          <div>已完成{completedList.length}</div>
          {completedList.map((item) => (
            <div key={item.id}>
              <input
                type="checkbox"
                checked={true}
                onChange={(e) => this.changeStatus(e, item.id)
                  //在onchang，onclick中都带有默认的e参数，如果不带其他参数就可以
                  //直接使用，如onChange={this.handleChange}
                  //onKeyDown={this.handleKeyDown}
                }
              />
              {this.state.inputid === item.id?
              //inputdi没用定义必须用this.state.inputid 
              <input value = {item.value}  
              onChange={(e)=>this.changeValue(e,item.id)}
              onKeyDown={(e)=>this.saveValue(e,item.value)}
              />:
              <span onDoubleClick={()=>this.onDoubleClick(item.id)}
             
              >
                {item.value}</span>
              }

              
              
              <button onClick ={()=>this.ShanchuStatus(item.id)
              //传入参数item.id，在函数中传入的第一个参数就是item.id，
              //可以用a，b，c，任意一个代替，表示第一个参数意义就是item.id
            }
                >删除</button>
                
              
                
            </div>
          ))}
        </div>
      );
   }


}