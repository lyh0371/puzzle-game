<template>
  <div class="changeModel">
    <div class="model" @click="changeModel('number')">模式一</div>
    <div class="model" @click="changeModel('img')">模式二</div>
  </div>
  <div class="diffec">
    <h2>
      {{ gamedata.difficulty }}

      <p class="tip">数字越大难度越大哦</p>
    </h2>
    <div class="difftodo">
      <div class="to" @click="changeDiff('add')">难度+</div>
      <div class="to" @click="changeDiff('del')">难度－</div>
    </div>
  </div>
  <div class="main">
    <!-- 游戏 -->
    <num-game
      :gamedata="gamedata"
      ref="game"
      @endCallback="endCallback"
    ></num-game>
  </div>

  <div class="todos">
    <div class="start" @click="start">开始游戏</div>
  </div>
</template>

<script>
import { reactive, ref, toRefs } from "vue";
import NumGame from "./components/NumGame.vue";
import img1 from "./assets/images/1.png";
import img2 from "./assets/images/2.png";
import img3 from "./assets/images/3.png";
import img4 from "./assets/images/4.png";
import img5 from "./assets/images/5.png";
import img6 from "./assets/images/6.png";
import img7 from "./assets/images/7.png";
import img8 from "./assets/images/8.png";

export default {
  components: {
    NumGame,
  },
  setup(props, { emit }) {
    const game = ref();
    const state = reactive({
      gamedata: {
        level: 3,
        mode: "number", // 如果是 number 后期会自动生成, 如果是 img 需要传对应的图片
        imgs: [img1, img2, img3, img4, img5, img6, img7, img8],
        style: {
          sliderBg: "#ffc107",
          sliderColor: "#000",
          sliderFontSize: "18px",
          gameBoxBg: "#5a009b",
        },
        difficulty: 4, // 难度分为 1 到正无穷 推荐设置[10-100]
      },
    });
    const start = () => {
      // 开始游戏/重置游戏
      game.value.gameStart();
    };
    const changeModel = (val) => {
      state.gamedata.mode = val;
    };
    const changeDiff = (model) => {
      if (model === "add") {
        state.gamedata.difficulty += 4;
      } else {
        if (state.gamedata.difficulty <= 4) return false;
        state.gamedata.difficulty -= 4;
      }
    };
    const endCallback = () => {
      // 通关了
      alert("欧耶!我通关了");
      console.log("我通关了");
    };
    return {
      changeModel,
      changeDiff,
      ...toRefs(state),
      endCallback,
      start,
      game,
    };
  },
};
</script>

<style lang="scss">
.changeModel {
  display: flex;
  padding-top: 5vh;
  justify-content: space-around;
  padding: 0 50px;
  box-sizing: border-box;
  .model {
    width: 100px;
    height: 40px;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    background: #5a009b;
    cursor: pointer;
    user-select: none;
  }
}
.diffec {
  text-align: center;
  color: #fff;
  .tip {
    font-size: 12px;
    padding-top: 0;
    margin-top: 2px;
    color: #e6e6e6;
  }
  .difftodo {
    display: flex;
    justify-content: center;
    .to {
      padding: 10px 15px;
      margin: 10px;
      background: #5a009b;
      border-radius: 10px;
      font-size: 12px;
      cursor: pointer;
      user-select: none;
    }
  }
}
.main {
  width: 300px;
  height: 300px;
  margin: auto;
  padding-top: 5vh;
}
.todos {
  display: flex;
  padding-top: 50px;
  justify-content: center;
  .start {
    width: 120px;
    height: 40px;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    background: #5a009b;
    cursor: pointer;
    user-select: none;
  }
}
</style>
