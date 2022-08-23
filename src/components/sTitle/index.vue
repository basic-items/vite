<template>
  <span class="STitle">
    <i class="mr6"></i>
    <slot></slot>
  </span>
</template>

<script setup lang='ts'>
defineExpose({
  name: 'STitle'
})
</script>
<style lang='stylus' scoped>
.STitle{
  font-size: 16px !important;
  font-weight: 500;
  color: rgba(22,38,56,0.8500);
  span, i{
    display: inline-block !important;
  }
  i{
    width: 4px;
    height: 16px;
    background: #FF9A1F;
    position: relative;
    top: 2px;
  }
}
</style>