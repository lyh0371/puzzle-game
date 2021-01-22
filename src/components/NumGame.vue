<template>
  <div class="_game">
    <div
      class="gameMain"
      :style="{ backgroundColor: gamedata.style.gameBoxBg }"
    >
      <div
        class="y-axis"
        :class="emptyNum === index ? 'empty' : ''"
        v-for="(item, index) in gameArr"
        :key="item"
      >
        <div
          class="x-axis"
          :class="item2 === 0 ? 'empty' : ''"
          :style="{
            backgroundColor: gamedata.style.sliderBg,
            color: gamedata.style.sliderColor,
            fontSize: gamedata.style.sliderFontSize,
          }"
          v-for="(item2, index2) in item"
          :key="index2"
          @click="boxHandle(index, index2)"
        >
          <img
            :src="gamedata.imgs[item2 - 1]"
            v-if="gamedata.mode === 'img' && item2 != 0"
            alt=""
          />
          <span v-else-if="item2 != 0">
            {{ item2 }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive, ref, toRefs } from "vue";
import useCreateGame from "./useCreateGame";
export default {
  props: {
    gamedata: {
      type: Object,
    },
  },
  setup({ gamedata }, { emit }) {
    const isStart = ref(false);
    // 通关回电函数
    const gameEndCallback = (val) => {
      isStart.value = false;
      emit("endCallback");
    };
    const deffic = Number(gamedata.difficulty);
    const { arr, shouldMove, moveInit } = useCreateGame(
      gamedata.level,
      gamedata.difficulty,
      gameEndCallback
    );
    const state = reactive({
      gameArr: arr,
      emptyNum: 8,
    });
    // 点击滑块
    const boxHandle = (x, y) => {
      if (!isStart.value) return false;
      shouldMove(x, y);
    };

    // 开始游戏
    const gameStart = () => {
      isStart.value = true;
      moveInit(gamedata.difficulty);
    };
    return {
      ...toRefs(state),
      boxHandle,
      gameStart,
      gamedata,
    };
  },
};
</script>

<style lang="scss" scoped>
._game {
  width: 100%;
  height: 100%;
  .gameMain {
    background: #5a009b;
    border-radius: 10px;
    color: #fff;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    margin: auto;
    .y-axis {
      display: flex;
      height: 30%;
      align-items: center;
      justify-content: space-evenly;
    }
    .x-axis {
      width: 30%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background: red;
      border-radius: 10px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .empty {
      background-color: transparent !important;
    }
  }
}
</style>
