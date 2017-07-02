<template lang="html">
  <div class="row header">
    <div class="col-md-12">
      {{ title }}
    </div>
  </div>
</template>
<script>
export default {
  name: 'headerBoxC',
  props: ['title']
};
</script>

<style lang="less">
.header {
  background:#404840;
  color:#fff;
  font-size: 30px;
  height: 5vh;
  text-align: center;
}
@media (min-width: 320px) and (max-width: 768px) {
  .header {
    font-size:16px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
