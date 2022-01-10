<template>
  <div id="Plotly" style="height: 300px;"></div>
</template>

<script setup>
import { getCurrentInstance, onMounted, watch, defineExpose } from 'vue'
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
function PlotlyRestyle (dataSpac, update, traceIndex) {
  Plotly.restyle(dataSpac, update, traceIndex)
}
onMounted(() => {
  redraw()
})

watch(props.plotlyData, (count, prevCount) => { // 监听特定数据
  redraw()
})

defineExpose({
  PlotlyRestyle
})

</script>

<style scoped lang="stylus"></style>