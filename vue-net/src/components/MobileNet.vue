<script setup>
// Be sure to load TensorFlow.js on your page. See
// https://github.com/tensorflow/tfjs#getting-started.
import { ref, computed } from 'vue'
import * as tf from '@tensorflow/tfjs';

const model = await tf.loadGraphModel(
  'tfjs-model_imagenet_mobilenet_v3_large_100_224_classification_5_default_1/model.json'
)

const input = ref(null);
const img = ref(null);


// Preprocesses a single image tensor to prepare it as input for the model.
//
// Returns a tensor of shape [batch_size, height, width, channels], where the
// batch_size in this case is 1.
function preprocess(imageTensor) {
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

async function calcClassName(event){

    // const image = event.target.value
    // const image = new Image();
    //     //   image.height = 100;
    //     //   image.title = file.name;
    // image.src = event.target.value
    const file = input.value.files[0]
    img.value.src = URL.createObjectURL(file);
    // img.value.width = "200px";
    // img.value.height = "200px";
    console.log(img.value)
    const imageTensor = tf.browser.fromPixels(img.value)
    const logits = model.predict(preprocess(imageTensor))

    const classIndex = await tf.argMax(tf.squeeze(logits)).data()
    const className = model.metadata['classNames'][classIndex[0]]
    classNameMsg.value = className
}


</script>

<template>
    ddd<input type="file" ref="input" @input="calcClassName">ddd
    <img ref="img" width="100" height="100">
    {{ className }}
</template>
