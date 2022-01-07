<template>
  <div id="Plotly" style="height: 300px;"></div>
</template>

<script setup>
import { defineProps, getCurrentInstance, onMounted, watch } from 'vue'
import Plotly from 'plotly.js/dist/plotly'
const { props } = getCurrentInstance()
defineProps({
  msg: String,
  plotlyData: Array | Object,
  layout: Object
})

const redraw = () => {
  let ctx = document.getElementById('Plotly')
  Plotly.newPlot(
    ctx,
    props.plotlyData,
    props.layout
  )
}
onMounted(() => {
  redraw()
})

watch(props.plotlyData, (count, prevCount) => { // 监听特定数据
  redraw()
})

</script>

<style scoped lang="stylus"></style>