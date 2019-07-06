<template>
  <div class="progressContainer">
    <div class="fontcolor">
      当前比赛进度{{progress}}%
    </div>
    <div class="progress" :style="{width:progress+'%'}"></div>
    <div class="progress probar" :style="{width:100-progress+'%'}"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      progress: "40"
    };
  }
};
</script>

<style scoped>
div .progressContainer {
  margin-top: 1rem;
  width: 95%;
  border-radius: 0.2rem;
  background-color: #fff;
  margin-left: 2%;
}
div .fontcolor {
  font-size: 14px;
  color: #30a794;
}
div.progress {
  float: left;
  background-color: #30a794;
  border-radius: 0.5rem 0rem 0rem 0.5rem;
  height: 0.3rem;
  line-height: 0.2rem;
}
div.probar {
  float: left;
  background-color: #ed5a00;
  border-radius: 0rem 0.5rem 0.5rem 0rem;
}
</style>
