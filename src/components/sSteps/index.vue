<template>
  <NGrid v-if="step && step.length" :cols="step.length + 2" >
    <NGi></NGi>
    <NGi v-for="(item, index) in step" :key="index" class="">
      <div
        :class="{
          ct: true,
          stepBox: true,
          currentStep: `${current}` === `${(item.key || index)}`,
          beforeStep: `${current}` > `${(item.key || index)}`,
        }"
      >
        <span class="Step"><span>{{index + 1}}</span></span>
        <span class="title">{{item.val}}</span>
        <span :class="{dividingLine: index}"></span>
      </div>
    </NGi>
    <NGi></NGi>
  </NGrid>
  <div class="mt32"></div>
</template>

<script setup lang='ts'>
import { PropType } from 'vue'
const props = defineProps({
  step: {
    type: Array as PropType<{ val: String, key: Number }[]>,
    required: true
  },
  current: {
    type: [Number, String],
    required: true
  }
})

</script>
<style lang='stylus' scoped>
.Steps{
  
}
.stepBox{
  position: relative;
  margin-top: 10px;
  padding-bottom: 10px;
  span{
    display: inline-block;
  }
  .Step{
    width: 36px;
    height: 36px;
    padding: 2px;
    border: 1px solid #E0E3E6;
    border-radius: 50%;
    background-color: #E0E3E6;
    span{
      width: 36px;
      height: 36px;
      border-radius: 18px;
      line-height: 36px;
      font-size: 20px;
      color: #FFFFFF;
      text-align: center;
    }
  }
  .title{
    font-size: 14px;
    font-weight: 500;
    line-height: 22px;
    color: rgba(22,38,56,0.8500);
    position: absolute;
    bottom: -18px;
    left: 0;
    width: 100%;
  }
  .dividingLine{
    position: absolute;
    top: 19px;
    right: calc(50% + 25px);
    height: 2px;
    width: calc(100% - 50px);
    background-color: #E0E3E6;
  }
}
.beforeStep{
  .Step{
    background-color: #FFFFFF !important;
    border: 2px solid #0678FF;
    span{
      color: #0678FF !important;
    }
  }
  .title{}
  .dividingLine{
    background-color: #0678FF;
  }
}
.currentStep{
  .Step{
    background-color: #FFFFFF !important;
    border: 1px solid #0678FF;
    span{
      background-color: #0678FF;
    }
  }
  .title{}
  .dividingLine{
    background-color: #0678FF;
  }
}
</style>