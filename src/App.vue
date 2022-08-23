<script lang="ts" setup>
</script>

<template>
<NDialogProvider>
  <NMessageProvider>
    <div class="pl4 pt4 pr4 pb4">
      <router-view></router-view>
    </div>
  </NMessageProvider>
</NDialogProvider>
</template>
