import React from "react";
import Board from "./Board";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          cells: Array(9).fill(null),
          position: -1
        },
      ],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const cells = current.cells.slice();
    if (cells[i]) {
      return;
    }
    if (calculateWinner(cells)) {
      return alert("游戏已结束，请重新开始游戏！");
    }
    cells[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          cells: cells,
          position: i
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  replayGame = () => {
    this.setState({
      stepNumber: 0,
      xIsNext: true,
      history: [
        {
          cells: Array(9).fill(null),
          position: -1
        },
      ],
    });
  };

  render() {
    const { stepNumber, history } = this.state;
    const current = history[stepNumber];
    const winner = calculateWinner(current.cells);

    let status;
    if (winner) {
      status = "游戏结束，胜方: " + winner.winner + "！";
    } else if (stepNumber >= 9) {
      status = "游戏结束，打为平手!";
    } else {
      status = "现在轮到: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="wrapper">
        <div className="title">
          <h2>—— 井字棋游戏 ——</h2>
        </div>
        <div className="game">
          {/* 游戏状态 */}
          <div className="top">{status}</div>

          {/* 游戏棋盘 */}
          <div className="center">
            <div className="board">
              {/* 游戏结束有胜方时连成一条线 board-line*/}

              <div
                className={
                  winner
                    ? `board-line r${winner.lineIdx} ${
                        winner.winner === "O" ? "white" : ""
                      }`
                    : "board-line"
                }
              ></div>

              <Board
                cells={current.cells}
                onClick={(i) => this.handleClick(i)}
              />
            </div>
            <div className="step">
              <div>
                {stepNumber === 0
                  ? "点击左侧棋盘开始游戏：）"
                  : "游戏步骤（点击可查看历史步骤）："}
              </div>

              {history.map(
                (historyItem, step) =>
                  step > 0 && (
                    <li
                      key={step}
                      onClick={() => this.jumpTo(step)}
                      className={step === stepNumber ? "cur" : ""}
                    >
                      {/* step=0是初始状态 */}第{step}步，
                      {step % 2 !== 0 ? "X" : "O"}落于
                      {getCoordinate(historyItem.position)}
                    </li>
                  )
              )}
            </div>
          </div>

          {/* 重新游戏 */}
          <div className="bottom">
            <a onClick={this.replayGame}>重新开始游戏</a>
          </div>
        </div>
      </div>
    );
  }
}

function calculateWinner(cells) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      // 匹配哪个结果
      return {
        winner: cells[a],
        lineIdx: i,
      };
      // return cells[a];
    }
  }
  return null;
}

function getCoordinate(position) {
  let x = parseInt(position / 3) + 1;
  let y = (position % 3) + 1;
  return `（第${x}行，第${y}列）`;
}

export default Game;
