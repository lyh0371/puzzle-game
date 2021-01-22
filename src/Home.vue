<template>
  <div>
    {{ name }}
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const name = ref("公众号码不停息");

    return {
      name,
    };
  },
};
</script>

<style lang="scss" scoped></style>
