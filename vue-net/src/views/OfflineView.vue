<script setup>
// Be sure to load TensorFlow.js on your page. See
// https://github.com/tensorflow/tfjs#getting-started.
import { ref, onMounted } from 'vue'
import * as tf from '@tensorflow/tfjs'
import UploadImage from '../components/UploadImage.vue'

const model = await tf.loadGraphModel('./src/assets/model_2/model.json')

// const classNameMsg = ref('')
const hasTumor = ref(false)

// Preprocesses a single image tensor to prepare it as input for the model.
//
// Returns a tensor of shape [batch_size, height, width, channels], where the
// batch_size in this case is 1.
function preprocess(imageTensor) {
  console.log(imageTensor)
  const widthToHeight = imageTensor.shape[1] / imageTensor.shape[0]
  let squareCrop
  if (widthToHeight > 1) {
    const heightToWidth = imageTensor.shape[0] / imageTensor.shape[1]
    const cropTop = (1 - heightToWidth) / 2
    const cropBottom = 1 - cropTop
    squareCrop = [[cropTop, 0, cropBottom, 1]]
  } else {
    const cropLeft = (1 - widthToHeight) / 2
    const cropRight = 1 - cropLeft
    squareCrop = [[0, cropLeft, 1, cropRight]]
  } // Expand image input dimensions to add a batch dimension of size 1.
  const crop = tf.image.cropAndResize(tf.expandDims(imageTensor), squareCrop, [0], [224, 224])
  console.log(crop.div(255))
  return crop.div(255)
}

async function calcClassName(img) {
  const imageTensor = tf.browser.fromPixels(img)
  const logits = model.predict(preprocess(imageTensor))

  // const classIndex = await tf.argMax(tf.squeeze(logits)).data()
  console.log(logits.arraySync()[0])
  // console.log(classIndex)
  // const className = model.metadata['classNames'][classIndex[0]]
  hasTumor.value = (logits.arraySync()[0] < 0.5)
  // classNameMsg.value = logits.arraySync()[0]>0.5 ? fa : "Yes";
}

onMounted(() => {
  // Create WebSocket connection.
  const socket = new WebSocket('ws://localhost:8765')

  // Connection opened
  socket.addEventListener('open', (event) => {
    socket.send('Hello Server!')
  })

  // Listen for messages
  socket.addEventListener('message', (event) => {
    console.log('Message from server ', event.data)
  })
})
</script>

<template>
  <span class="loading loading-ring loading-lg"></span>
  <UploadImage @newimage="calcClassName" :has_tumor="hasTumor">

  </UploadImage>
  
</template>
