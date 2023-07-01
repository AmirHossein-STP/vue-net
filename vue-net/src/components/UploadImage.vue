<script setup>
import { ref, onMounted } from 'vue'
const emit = defineEmits(['newimage'])
const props = defineProps(['has_tumor'])

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
  

  <div class="card w-84 bg-base-100 shadow-xl">
    <figure><img ref="img" src="../assets/logo.svg" /></figure>
    <div class="card-body">

      <template v-if="props.has_tumor">
        <h2 class="card-title">
          <div class="alert alert-warning">
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            <span>Tumor detected!</span>
          </div>
      </h2>
      <div class="divider"></div> 
      <div class="alert">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span>with probability of:</span>
      </div>
      </template>
      <template v-else>
        <h2 class="card-title">
          <div class="alert alert-success">
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>Tumor not detected!</span>
          </div>
        </h2>
        <div class="divider"></div> 
        <div class="alert">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span>with probability of:</span>
        </div>
      </template>


      <div class="divider"></div> 
      <div class="card-actions justify-center">
        
        <input ref="input" @change="updateImage" type="file" class="file-input file-input-bordered file-input-primary w-full max-w-xs" />
        <!-- <button class="btn btn-primary">More about</button> -->
      </div>
    </div>
  </div>
  
</template>
