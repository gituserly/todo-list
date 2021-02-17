import React from "react";
import "./Header.css";

export default class Header extends React.Component {
  render() {
    const {
      onChange,
      onKeyDown,
      addValue,
      isAllCompleted,
      toggleAllCompleted,
    } = this.props;
    return (
      <div className="demo-header">
        <span
          className="toggle-checked-all"
          onClick={() => toggleAllCompleted(isAllCompleted)}
        >
          {isAllCompleted ? "全不选" : "全选"}
        </span>
        <input
          className="add-todo-input"
          type="text"
          value={addValue}
          placeholder="what needs to be done?"
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
      </div>
    );
  }
}
