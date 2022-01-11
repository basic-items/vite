<template>
  <h1>home</h1>
  <button @click="predict">时间预测 1MB 100MB 10000MB</button>
  <Plotly ref="PlotlyRef" :plotlyData="plotlyData" :layout="layout"></Plotly>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue'

import Plotly from './plotly'

import { layout, plotlyData, PlotlyRef } from './variable'
import { training, predict } from './method'

onMounted(() => {
  training()
})
defineProps({
  msg: String
})

</script>

<style scoped lang="stylus"></style>
