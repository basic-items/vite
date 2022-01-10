<template>
  <h1>home</h1>
  <Plotly ref="PlotlyRef" :plotlyData="plotlyData" :layout="layout"></Plotly>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue'

import Plotly from './plotly'

import { layout, plotlyData, PlotlyRef } from './variable'
import { training } from './method'

onMounted(() => {
  training()
})
defineProps({
  msg: String
})

</script>

<style scoped lang="stylus"></style>
