<template>
  <p>次数 <span :class="{ countStyle: count }">{{count}}</span></p>
  <h1 class="red">overview</h1>
  <button @click="ClickOn" >接口</button>
  <button @click="close">关闭</button>
</template>

<script setup>
import {
  ref, getCurrentInstance, onMounted
} from 'vue'
import DB from '@stroll/db'
const { proxy, appContext } = getCurrentInstance()

const count = ref(0)
const { query: ApiQuery } = appContext.config.globalProperties.$api

function ClickOn () {
  count.value++
  ApiQuery.alert1().then(() => {
    alert(count.value)
  })
}

const testDB = new DB('testDB',{
  ies: { // 表名
    name: { // 可检索字段
      // unique: true, // 是否为主键
      // multiEntry: true, // true 为每个数组添加一个条目， false 添加一个包含数组的条目
    },
    age: {
      multiEntry: true
    },
    as: {
      multiEntry: false
    }
  }
})

onMounted(async () => {
  const userTable = testDB.table('ies')
  
  // await userTable.add({ name: 3, age: 22, as: 'ss', asad: 'sss' })
  // const data = await userTable.get({ name: 'lu' })
  // userTable.console(100)
  // console.log('userTable.get({_id: 9 })', data);
})
const close = () => {
  testDB.close()
}
</script>

<style scoped lang="stylus">
.red
  color: red
.countStyle
  color: #409eff
  font-size: 20px
</style>
