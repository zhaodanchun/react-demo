import React from "react";
import Cell from "./Cell";

class Board extends React.Component {
  render() {
    return (
      <div className="board-table">
        <div className="board-row">
          {[0, 1, 2].map((item) => (
            <Cell key={item}
              value={this.props.cells && this.props.cells[item]}
              onClick={(i) => this.props.onClick(item)}
            ></Cell>
          ))}
        </div>

        <div className="board-row">
          {[3, 4, 5].map((item) => (
            <Cell key={item}
              value={this.props.cells && this.props.cells[item]}
              onClick={() => this.props.onClick(item)}
            ></Cell>
          ))}
        </div>
        <div className="board-row">
          {[6, 7, 8].map((item) => (
            <Cell key={item}
              value={this.props.cells && this.props.cells[item]}
              onClick={(i) => this.props.onClick(item)}
            ></Cell>
          ))}
        </div>
      </div>
    );
  }
}

export default Board;
