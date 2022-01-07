import { ref, reactive } from 'vue'

export const count = ref(0)
export const layout = reactive({
  title: "My graph",
  width: 700,
  xaxis: {
    // range: [ 0.75, 5.25 ]
  },
  yaxis: {
    // range: [0, 8]
  },
})
export const trainData: any = {
  sizeMB: [ 0.080, 9.000, 0.001, 0.100, 8.000, 5.000, 0.100, 6.000, 0.050, 0.500, 0.002, 2.000, 0.005, 10.000, 0.010, 7.000, 6.000, 5.000, 1.000, 1.000 ],
  timeSex: [ 0.135, 0.739, 0.067, 0.126, 0.646, 0.435, 0.069, 0.497, 0.068, 0.116, 0.070, 0.289, 0.076, 0.744, 0.083, 0.560, 0.480, 0.399, 0.153, 0.149 ]
}
export const testData: any = {
  sizeMB: [ 5.000, 0.200, 0.001, 9.000, 0.002, 0.020, 0.008, 4.000, 0.001, 1.000, 0.005, 0.080, 0.200, 0.200, 0.050, 7.000, 0.005, 0.002, 8.000, 0.008 ],
  timeSex: [ 0.425, 0.098, 0.052, 0.686, 0.066, 0.078, 0.070, 0.375, 0.058, 0.136, 0.052, 0.063, 0.183, 0.087, 0.066, 0.588, 0.066, 0.068, 0.610, 0.057 ]
}

export const plotlyTrainData = reactive([
  {
    x: trainData.sizeMB,
    y: trainData.timeSex,
    name: 'Train',
    type:"scatter",
    mode: 'markers',
    marker: { size: 8 }
  }
])
export const plotlyTestData = reactive([
  {
    x: testData.sizeMB,
    y: testData.timeSex,
    name: 'Test',
    type:"scatter",
    mode: 'markers',
    marker: { size: 10 }
  }
])
export const plotlyData = reactive([
  {
    x: trainData.sizeMB,
    y: trainData.timeSex,
    name: 'Train',
    type:"scatter",
    mode: 'markers',
    marker: { size: 10 }
  },
  {
    x: testData.sizeMB,
    y: testData.timeSex,
    name: 'Test',
    type:"scatter",
    mode: 'markers',
    marker: { size: 10 }
  }
])
export default { count, layout, plotlyData, plotlyTrainData, plotlyTestData, trainData, testData }
