<template>
  <h1>home</h1>
  <Plotly :plotlyData="plotlyData" :layout="layout"></Plotly>
</template>

<script setup>
import { defineProps } from 'vue'
import { tensor2d, sequential, layers, train, restyle } from '@tensorflow/tfjs'

import Plotly from './plotly'

import { count, layout, plotlyData, trainData, testData } from './variable'

const trainTensors = {
  sizeMB: tensor2d(trainData.sizeMB, [20, 1]),
  timeSex: tensor2d(trainData.timeSex, [20, 1])
}
const testTensors = {
  sizeMB: tensor2d(testData.sizeMB, [20, 1]),
  timeSex: tensor2d(testData.timeSex, [20, 1])
}
const model = sequential()
model.add(layers.dense({
  units: 1,
  inputShape: [1],
}))
const optimizer = train.sgd(0.0005)
model.compile({ optimizer, loss: 'meanAbsoluteError' })

const updateScatterWithLines = (dateTrace, k, b, N, traceIndex) => {
  dateTrace.x = [0, 10]
  dateTrace.y = [b, b+(k * 10)]
  const update = {
    x: [dateTrace.x],
    y: [dateTrace.y],
    name: `model after ${N} epochs`
  }
  restyle('dataSpaceWith4Lines', update, traceIndex)
}

defineProps({
  msg: String
})

</script>

<style scoped lang="stylus"></style>
