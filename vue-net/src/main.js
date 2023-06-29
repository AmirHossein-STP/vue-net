import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import * as tf from '@tensorflow/tfjs'

const app = createApp(App)

const model = await tf.loadGraphModel(
  'model_2/model.json'
)
app.provide('model', model)

app.mount('#app')
