<template lang="html">
  <div class="tooltip top" role="tooltip" v-if="isShow">
    <div class="tooltip-arrow"></div>
    <div class="tooltip-inner">{{ text }}</div>
  </div>
</template>

<script>
export default {
  name: 'tooltipC',
  props: ['isShow', 'text']
}
</script>

<style lang="less">
.tooltip-box {
  position: relative;
}
.tooltip {
  opacity: 1;
}
.tooltip-arrow {
  position: absolute;
  width: 0;
  height: 0;
  border-color: transparent;
  border-style: solid;
}
.tooltip.top {
  .tooltip-arrow {
    bottom: -5px;
    left: 50%;
    margin-left: -5px;
    border-width: 5px 5px 0;
    border-top-color: #000;
  }
}
</style>
