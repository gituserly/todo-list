import React from "react";
import "./Trytodo.css";
const tabs = [
  { key: 1, value: "All" },
  { key: 2, value: "Active" },
  { key: 3, value: "Completed" },
];

export default class Trytodo extends React.Component {
  id = 0;
  state = {
    shuru: "",
    list: [],
    inputid: null,
    activetabs: 1,
    temporaryvalue: null,
  };
  componentDidMount() {
    document.body.addEventListener('click',this.restoreTodo)
  }
  componentWillUnmount() {
    document.body.removeEventListener('click', this.restoreTodo)
  }

  handleChange = (e) => {
    this.setState({ shuru: e.target.value });
    //* console.log(e.target.value)
  };

  handleKeyDown = (e) => {
    //* console.log(this.state.shuru)

    if (e.keyCode === 13) {
      //或者写成（e.keyCode === 13  && this.state.shuru !==""）
      if (this.state.shuru === "") {
        return;
      }
      const { list, shuru } = this.state;

      this.setState({
        list: [
          ...list,
          {
            id: this.id++,
            isCompleted: false,
            value: shuru,
          },
        ],
        shuru: "",
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
      ),
    });
  };
  ShanchuStatus = (id) => {
    const alist = this.state.list.filter((listitem) => {
      return listitem.id !== id;
    });
    this.setState({ list: alist });
  };

  changeValue = (e, id) => {
    const evalue = e.target.value;
    this.setState({ temporaryvalue: evalue });

    //* const vlist = this.state.list.map((item) => {
    //   return item.id === id ? { ...item, value: evalue } : item;
    //});

    // this.setState({ list: vlist });*//
  };
  onDoubleClick = (id, value) => {
    this.setState({ inputid: id });
  };

  saveValue = (e, va) => {
    console.log(va);
    if (e.keyCode === 13 && va !== "") {
      this.setState({ inputid: null });
    }
    const tem = this.state.list.map((listitem) => {
      return { ...listitem, value: this.state.temporaryvalue };
    });
    this.setState({ list: tem });

  };
  changeActivetab = (key) => {
    this.setState({ activetabs: key });
  };
  clearAll = () => {
    this.setState({ list: [] });
  };
  clearCurrentList = () => {
    {
      const clearcurr = this.state.list.filter((listitem) => {
        return listitem.isCompleted === true;
      });
      this.setState({ list: clearcurr });
    }
  };
  clearCompletedList = () => {
    {
      const clearcom = this.state.list.filter((listitem) => {
        return listitem.isCompleted === false;
      });
      this.setState({ list: clearcom });
    }
  };
  changCompletedList = () => {
    {
      const changcom = this.state.list.map((listitem) => {
        return { ...listitem, isCompleted: false };
      });
      this.setState({ list: changcom });
    }
  };
  changeCurrentList = () => {
    const changecurr = this.state.list.map((listitem) => {
      return { ...listitem, isCompleted: true };
    });
    this.setState({ list: changecurr });
  };
  changeZhuangtai = () => {
    const al = this.state.list.filter((item) => {
      return item.isCompleted === false;
    }).length;
    console.log(al);
    console.log(this.state.list);
    if (al === 0) {
      const changcom = this.state.list.map((listitem) => {
        return { ...listitem, isCompleted: false };
      });
      this.setState({ list: changcom });
    } else {
      const changecurr = this.state.list.map((listitem) => {
        return { ...listitem, isCompleted: true };
      });
      console.log("changecurr", changecurr);

      this.setState({ list: changecurr });
    }
  };

  restoreTodo = () =>{
    console.log(1);
    this.setState({temporaryvalue:null,inputid:null})
  }

  render() {
    const currentList = this.state.list.filter((item) => !item.isCompleted);

    const completedList = this.state.list.filter((item) => item.isCompleted);

    return (
      <div className="todolist">
        <h1 className="h1">todos</h1>
        <div className="content" >
          <div className="header">
            <button onClick={this.changeZhuangtai} className="button-status">
              {this.state.list.filter((item) => {
                return item.isCompleted === false;
              }).length === 0
                ? "changecur"
                : "changecom"}
            </button>
            <input
              className="inputbox"
              type="text"
              placeholder="what needs to be done?"
              value={this.state.shuru}
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
            />
          </div>

          {this.state.activetabs !== 3 ? (
            <div>
              {currentList.map((item) => (
                <div key={item.id} className="todo-list" onClick={(e)=> e.stopPropagation()}>
                  {this.state.inputid === item.id ? null : (
                    <div className="check-box">
                      <input
                        className="check-radio"
                        type="radio"
                        onChange={(e) => this.changeStatus(e, item.id)}
                      />
                      <div className="check-ui"></div>
                    </div>
                  )}

                  {this.state.inputid === item.id ? (
                    <div className="todo-input">
                      <input
                        className="input-value"
                        value={this.state.temporaryvalue}
                        onChange={(e) => this.changeValue(e, item.id)}
                        onKeyDown={(e) => this.saveValue(e, item.value)}
                      />
                    </div>
                  ) : (
                    <div className="todovalue">
                      <div
                        onDoubleClick={() =>
                          this.onDoubleClick(item.id, item.value)
                        }
                      >
                        {item.value}
                      </div>
                    </div>
                  )}

                  <div className="todobutton">
                    <span
                      className="detele"
                      onClick={() => this.ShanchuStatus(item.id)}
                    >
                      x
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          {this.state.activetabs !== 2 ? (
            <div>
              {completedList.map((item) => (
                <div key={item.id} className="todo-list">
                  {this.state.inputid === item.id ? null : (
                    <div className="check-box">
                      <input
                        className="check-radio"
                        type="radio"
                        onChange={(e) => this.changeStatus(e, item.id)}
                      />
                      <div
                        className={`check-ui ${
                          item.isCompleted ? "checked" : ""
                        }`}
                      >
                        {item.isCompleted ? "√" : ""}
                      </div>
                    </div>
                  )}
                  <div className="todovalue">
                    {this.state.inputid === item.id ? (
                      //inputdi没用定义必须用this.state.inputid
                      <input
                        className="input-value"
                        value={item.value}
                        onChange={(e) => this.changeValue(e, item.id)}
                        onKeyDown={(e) => this.saveValue(e, item.value)}
                      />
                    ) : (
                      <span onDoubleClick={() => this.onDoubleClick(item.id)}>
                        {item.value}
                      </span>
                    )}
                  </div>
                  <div className="todobutton">
                    <button
                      className="detele"
                      onClick={
                        () => this.ShanchuStatus(item.id)
                        //传入参数item.id，在函数中传入的第一个参数就是item.id，
                        //可以用a，b，c，任意一个代替，表示第一个参数意义就是item.id
                      }
                    >
                      x
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
          {/*
          <button className="button"onClick={this.clearAll}> clear ALL</button>
      <button  className= "button" onClick={()=>this.clearCurrentList()}>
           clear currentList</button>   
      <button  className= "button" onClick={()=>this.clearCompletedList()}>
           clear completedList</button>      
      <button  className= "button" onClick={this.changCompletedList}>
           chang completedList</button>       
      <button className = 'button' onClick={this.changeCurrentList}>
change CurretList</button> */}
          {this.state.list.length !== 0 ? (
            <div className="bottom">
              <div>{currentList.length}items left</div>
              <div className="text">
                {tabs.map((tab) => {
                  return (
                    <span
                      key={tab.key}
                      //* onClick={()=>{this.setState({activetabs:tab.key})}}
                      onClick={() => this.changeActivetab(tab.key)}
                    >
                      <span className={tab.value}>{tab.value}</span>
                    </span>
                  );
                })}
              </div>

              <div className="clear">
                {completedList.length !== 0 ? (
                  <button
                    className="All"
                    onClick={() => this.clearCompletedList()}
                  >
                    clear completed
                  </button>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}
