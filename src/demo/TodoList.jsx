import React from "react";
import Header from "./Header";
import Todo from "./Todo";
import Footer from "./Footer";
import "./TodoList.css";

export default class TodoList extends React.Component {
  state = {
    addValue: "",
    list: [],
    editTodo: {
      id: null,
      value: null,
    },
    currentTab: "all",
  };
  id = 0;
  componentDidMount() {
    //生命周期，在body上触发监听效果
    document.body.addEventListener('click', this.clearEditTodo)
  }
  componentWillUnmount() {
    //离开网页解除监听效果
    document.body.removeEventListener('click', this.clearEditTodo)
  }

  changeAddValue = (e) => {
    this.setState({ addValue: e.target.value });
  };

  // 添加tofo
  addTodoItem = (e) => {
    if (e.keyCode !== 13 || !this.state.addValue) return;
    // || 或者
    this.setState(
      {
        list: [
          ...this.state.list,
          {
            id: this.id++,
            value: this.state.addValue,
            isCompleted: false,
          },
        ],
        addValue: "",
      },
      () => {
        console.log("this.state.list", this.state.list);
      }
    );
  };

  // 改变todo完成状态
  toggleCompleted = (currentTodoId) => {
    console.log("currentTodoId", currentTodoId);
    this.setState({
      list: this.state.list.map((listItem) =>
        listItem.id === currentTodoId
          ? {
              ...listItem,
              isCompleted: !listItem.isCompleted,
            }
          : listItem
      ),
    });
  };

  // 删除todo
  deleteTodo = (currentTodoId) => {
    this.setState({
      list: this.state.list.filter((listItem) => listItem.id !== currentTodoId),
    });
  };
  // 设置可编辑的
  setEditTodo = (editTodo) => {
    this.setState({
      editTodo,//相当于editTodo：editTodo
    });
  };
  // 更新编辑信息
  changeEditTodo = (e) => {
    this.setState({
      editTodo: {
        ...this.state.editTodo,
        value: e.target.value,
      },
    });
  };

  // 更新todolist
  updateTodoList = (e) => {
    if (e.keyCode !== 13) return;
    const {
      list,
      editTodo: { id, value },
    } = this.state;
    this.setState(
      {
        list: list.map((listItem) =>
          listItem.id === id ? { ...listItem, value } : listItem
        ),
        editTodo: { id: null, value: null },
      },
      () => {
        console.log("list", this.state.list);
      }
    );
  };

  clearEditTodo = () => {
    this.setState({
      editTodo: { id: null, value: null },
    });
  };

  toggleAllCompleted = (isAllCompleted) => {
    this.setState({
      list: this.state.list.map((listItem) => ({
        ...listItem,
        isCompleted: !isAllCompleted,
      })),
    });
  };

  clearCompleted = () => {
    this.setState({
      list: this.state.list.filter((listItem) => !listItem.isCompleted),
    });
  };

  setCurrentTab = (tab) => {
    this.setState({
      currentTab: tab,
    });
  };

  get showList() {
    switch (this.state.currentTab) {
      case "completed":
        return this.state.list.filter((listItem) => listItem.isCompleted);
      case "current":
        return this.state.list.filter((listItem) => !listItem.isCompleted);
      default:
        return this.state.list;
    }
  }

  render() {
    const isAllCompleted = this.state.list.every(
      (listItem) => listItem.isCompleted
    );

    return (
      <div className="demo">
        <h1>todos</h1>

        <div className="demo-box">
          <Header
            isAllCompleted={isAllCompleted}
            onChange={this.changeAddValue}
            onKeyDown={this.addTodoItem}
            addValue={this.state.addValue}
            toggleAllCompleted={this.toggleAllCompleted}
          />
          {this.showList.map((listItem) => (
            <Todo
              key={listItem.id}
              listItem={listItem}
              toggleCompleted={this.toggleCompleted}
              deleteTodo={this.deleteTodo}
              setEditTodo={this.setEditTodo}
              changeEditTodo={this.changeEditTodo}
              editTodo={this.state.editTodo}
              updateTodoList={this.updateTodoList}
              clearEditTodo={this.clearEditTodo}
            />
          ))}
          {this.state.list.length 
          //这里&&相当于三元运算符，>0 执行Footer
          > 0 && (
            <Footer
              list={this.state.list}
              clearCompleted={this.clearCompleted}
              setCurrentTab={this.setCurrentTab}
            />
          )}
        </div>
      </div>
    );
  }
}
