import React from "react";

function Cell(props) {
  return (
    <div className={props.value==='O' ? 'board-cell white': 'board-cell'}  onClick={props.onClick}>
      {props.value}
    </div>
  );
}

export default Cell;
