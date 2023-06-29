import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import * as tf from '@tensorflow/tfjs';

const app = createApp(App);

const model = await tf.loadGraphModel(
  'tfjs-model_imagenet_mobilenet_v3_large_100_224_classification_5_default_1/model.json'
)
app.provide("model", model);

app.mount("#app");