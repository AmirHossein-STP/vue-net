<script setup>
// Be sure to load TensorFlow.js on your page. See
// https://github.com/tensorflow/tfjs#getting-started.
import { ref, computed, onMounted, inject } from 'vue'
import * as tf from '@tensorflow/tfjs';

const model = inject("model");

const input = ref(null);
const img = ref(null);
const classNameMsg = ref("");


// Preprocesses a single image tensor to prepare it as input for the model.
//
// Returns a tensor of shape [batch_size, height, width, channels], where the
// batch_size in this case is 1.
function preprocess(imageTensor) {
    // console.log(imageTensor);
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
  return crop.div(255)
}

const className = computed(async () => {

})

function updateImage(event){

    // const image = event.target.value
    // const image = new Image();
    //     //   image.height = 100;
    //     //   image.title = file.name;
    // image.src = event.target.value
    const file = input.value.files[0]
    img.value.src = URL.createObjectURL(file);
    // img.value.width = "200px";
    // img.value.height = "200px";

}
async function calcClassName(event){

const imageTensor = tf.browser.fromPixels(img.value)
// console.log(imageTensor.arraySync())
const logits = model.predict(preprocess(imageTensor))

const classIndex = await tf.argMax(tf.squeeze(logits)).data()
// console.log(logits.arraySync())
// console.log(classIndex)
const className = model.metadata['classNames'][classIndex[0]]
classNameMsg.value = className
}

onMounted(() => {
img.value.onload = calcClassName;

  // Create WebSocket connection.
const socket = new WebSocket("ws://localhost:8765");

// Connection opened
socket.addEventListener("open", (event) => {
  socket.send("Hello Server!");
});

// Listen for messages
socket.addEventListener("message", (event) => {
  console.log("Message from server ", event.data);
});
})

</script>

<template>
    <input type="file" ref="input" @change="updateImage">
    <img ref="img" src="../assets/logo.svg" >
    {{ classNameMsg }}
</template>
