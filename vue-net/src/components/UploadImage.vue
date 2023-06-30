<script setup>
import { ref, onMounted } from 'vue'
const emit = defineEmits(['newimage'])

const input = ref(null)
const img = ref(null)

function updateImage(event) {
  const file = input.value.files[0]
  img.value.src = URL.createObjectURL(file)
}

onMounted(() => {
  img.value.onload = function () {
    emit('newimage', img.value)
  }
})
</script>

<template>
  <input type="file" ref="input" @change="updateImage" />
  <img ref="img" src="../assets/logo.svg" />
</template>
