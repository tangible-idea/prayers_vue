<template>
    <div>
      <h1>{{ greeting }}</h1>
    </div>
  </template>
  
  <script>
  import { useRoute } from 'vue-router'
  
  export default {
    setup() {
      const route = useRoute()
      const greeting = route.params.greeting
  
      return {
        greeting
      }
    }
  }
  </script>