<template lang="html">
  <div class="list-box row">
    <slot></slot>
  </div>
</template>

<style lang="less">
.list-box {
  background: #eee;
  display: flex;
  flex-direction: row;
  justify-content:flex-start;
  text-align:left;
  overflow-y: auto;
  height: 70vh;
};
</style>
