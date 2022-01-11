<template>
  <div id="Plotly" style="height: 600px;"></div>
</template>

<script setup name="Plotly">
import { getCurrentInstance, onMounted, watch } from 'vue'
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
function PlotlyRestyle (update, traceIndex) {
  console.log('update, traceIndex', update, traceIndex)
  Plotly.restyle('Plotly', update, traceIndex)
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