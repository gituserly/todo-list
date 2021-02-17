import React from "react";
import "./Footer.css";

const TABS = ["all", "completed", "current"];

export default class Footer extends React.Component {
  render() {
    const { list, clearCompleted, setCurrentTab } = this.props;
    const leftItems = list.filter((listItem) => !listItem.isCompleted);
    const hasCompletedTodo = list.length - leftItems.length > 0;
    return (
      <div className="demo-footer">
        <div className="uncompleted-number">{leftItems.length} Items Left</div>
        <div className="tabs">
          {TABS.map((tab) => (
            <span key={tab} onClick={() => setCurrentTab(tab)}>
              {tab}
            </span>
          ))}
        </div>

        {hasCompletedTodo && (
          <div onClick={clearCompleted}>clear Completed</div>
        )}
      </div>
    );
  }
}
