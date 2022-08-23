<template>
  <SSteps :step="steps" :current="currentStep" />
    
</template>

<script setup lang="ts">
const steps = [
  { val: 'lic申请上传', key: 1 },
  { val: '编辑授权', key: 2 }
]
const currentStep = ref(1)
</script>

<style scoped lang="stylus">

</style>
