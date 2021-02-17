var IvanIf = React.createClass({
  getInitialState: function () {
    return { isComplete: true };
  },
  getIsComplete: function () {
    return this.state.isComplete ? "is-complete" : "";
  },
  render: function () {
    var isComplete = this.getIsComplete();
    return <div className={isComplete}> Hello Ivan .</div>;
  },
});
