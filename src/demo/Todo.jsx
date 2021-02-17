import React from "react";
import "./Todo.css";

export default class Todo extends React.Component {
  render() {
    const {
      listItem,
      toggleCompleted,
      deleteTodo,
      setEditTodo,
      changeEditTodo,
      editTodo,
      updateTodoList,
      clearEditTodo,
    } = this.props;
    return (
      <div
        className="todo-item"
        onClick={(e) => {
          if (editTodo.id === listItem.id) {
            e.stopPropagation();//防止注入
          }
        }}
      >
        {editTodo.id === listItem.id ? (
          <input
            type="text"
            value={editTodo.value}
            onChange={changeEditTodo}
            onKeyDown={updateTodoList}
            onBlur={() => {
              console.log("onblur");
              // clearEditTodo()
            }}
          />
        ) : (
          <>
            <div
              className={`checked-box ${
                listItem.isCompleted ? "completed" : ""
              }`}
              onClick={() => toggleCompleted(listItem.id)}
            >
              {listItem.isCompleted ? "√" : ""}
            </div>
            <div
              className="todo-value"
              onDoubleClick={() => setEditTodo(listItem)}
            >
              {listItem.value}
            </div>
            <div
              className="delete-button"
              onClick={() => deleteTodo(listItem.id)}
            >
              x
            </div>
          </>
        )}
      </div>
    );
  }
}
