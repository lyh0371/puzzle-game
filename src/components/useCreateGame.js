import { reactive, toRefs } from "vue";

export default function useCreateGame(level, diffec, gameEndCallback) {
  const state = reactive({
    arr: [],
    diffec: diffec,
  });
  let startX = level - 1;
  let startY = level - 1;
  state.arr = creatArr(level);
  // 创建数组
  function creatArr(level) {
    let arr = [];
    let lin = [];
    const levels = level * level + 1;

    for (let i = 1; i < levels; i++) {
      lin.push(i);
      if (lin.length === level) {
        arr.push(lin);
        lin = [];
      }
    }
    arr[level - 1][level - 1] = 0;

    return arr;
  }

  // 上移动
  function moveTop(x, y) {
    if (x <= 0) return -1;
    //   开始交换位置
    const okx = x - 1;
    move(x, y, okx, y);
    return {
      x: okx,
      y,
    };
  }
  //下移动
  function moveDown(x, y) {
    if (x >= level - 1) return -1;
    const okx = x + 1;
    move(x, y, okx, y);
    return {
      x: okx,
      y,
    };
  }
  // 左移动

  function moveLeft(x, y) {
    if (y <= 0) return -1;
    const oky = y - 1;
    move(x, y, x, oky);
    return {
      x,
      y: oky,
    };
  }

  // 右移动
  function moveRight(x, y) {
    if (y >= level - 1) return -1;
    const oky = y + 1;
    move(x, y, x, oky);
    return {
      x,
      y: oky,
    };
  }

  // 移动函数
  function move(x, y, moveX, moveY) {
    const num = state.arr[x][y];
    state.arr[x][y] = state.arr[moveX][moveY];
    state.arr[moveX][moveY] = num;
    //   return arr;
  }
  //寻找空白块的位置
  function seekEmpty() {
    const arr = state.arr;
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].length; j++) {
        if (Number(arr[i][j]) === 0) {
          return {
            emptyX: i,
            emptyY: j,
          };
        }
      }
    }
  }
  //   检查是否完成

  function gameEnd() {
    const target = creatArr(level).toString();
    if (state.arr.toString() === target) {
      setTimeout(() => {
        gameEndCallback(true);
      }, 100);
    }
  }

  function shouldMove(x, y) {
    //   判断向哪移动
    const { emptyX, emptyY } = seekEmpty();
    if (x === emptyX && y !== emptyY && Math.abs(y - emptyY) === 1) {
      // 说明在一个水平线上 可能是左右移动
      if (y > emptyY) {
        moveLeft(x, y);
      } else {
        moveRight(x, y);
      }
    }
    if (y === emptyY && x !== emptyX && Math.abs(x - emptyX) === 1) {
      // 说明需要上下移动
      if (x > emptyX) {
        moveTop(x, y);
      } else {
        moveDown(x, y);
      }
    }
    gameEnd();
  }
  // 随机打乱
  function moveInit(diffic) {
    state.arr = creatArr(level);
    const num = diffic ? diffic : state.diffec;

    const fns = [moveTop, moveDown, moveLeft, moveRight];
    let Index = null;
    let fn;
    for (let i = 0; i < num; i++) {
      Index = Math.floor(Math.random() * fns.length);
      //   moveConsole(Index);
      fn = fns[Index](startX, startY);
      if (fn != -1) {
        const { x, y } = fn;
        startX = x;
        startY = y;
      }
    }
  }
  return {
    moveTop,
    shouldMove,
    moveInit,
    gameEnd,
    ...toRefs(state),
  };
}
