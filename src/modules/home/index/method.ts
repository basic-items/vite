import { tensor1d, tensor2d, sequential, layers, train, nextFrame } from '@tensorflow/tfjs'

import { plotlyData, trainData, testData, PlotlyRef } from './variable'

export const trainTensors = {
  sizeMB: tensor2d(trainData.sizeMB, [20, 1]),
  timeSex: tensor2d(trainData.timeSex, [20, 1])
}
export const testTensors = {
  sizeMB: tensor2d(testData.sizeMB, [20, 1]),
  timeSex: tensor2d(testData.timeSex, [20, 1])
}

let k = 0
let b = 0
export const model = sequential()
export const optimizer = train.sgd(0.0005)
model.add(layers.dense({ units: 1, inputShape: [1] }))
model.compile({ optimizer, loss: 'meanAbsoluteError' })
model.setWeights([tensor2d([k], [1, 1]), tensor1d([b])])


export const updateScatterWithLines = (dateTrace, k, b, N, traceIndex) => {
  dateTrace.x = [0, 10]
  dateTrace.y = [b, b+(k * 10)]
  const update: any = {
    x: [dateTrace.x],
    y: [dateTrace.y],
    name: `model after ${N} epochs`
  }
  plotlyData.push(update)
  PlotlyRef.value.PlotlyRestyle(plotlyData, traceIndex)
}

export const training = async () => {
  await model.fit(trainTensors.sizeMB, trainTensors.timeSex, {
    epochs: 200,
    callbacks: {
      onEpochEnd: async (epoch, logs) => {
        k = model.getWeights()[0].dataSync()[0]
        b = model.getWeights()[1].dataSync()[0]
        if (epoch === 9) {
          console.log(model.getWeights(), model.getWeights()[0].dataSync(), model.getWeights()[1].dataSync())
        }

        // if (epoch === 9) {
        //   updateScatterWithLines({}, k, b, 10, 2)
        // } else if (epoch === 19) {
        //   updateScatterWithLines({}, k, b, 20, 3)
        // } else if (epoch === 99) {
        //   updateScatterWithLines({}, k, b, 100, 4)
        // } else if (epoch === 199) {
        //   updateScatterWithLines({dataTrace200Epochs}, k, b, 200, 5)
        // }
        await nextFrame()
      }
    }
  })
}

export const predict = () => {
  const time = model.predict(tensor2d([[1], [100], [10000]]))
  console.log('time', time)
}

export default { trainTensors, testTensors, model, optimizer, updateScatterWithLines, training, predict }
