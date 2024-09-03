<script lang="ts" setup>
import { ref } from "vue";

defineOptions({
  name: "SelectTest"
});

const value = ref("3");

const options = [
  {
    value: 1,
    label: "Option1"
  },
  {
    value: 2,
    label: "Option2"
  },
  {
    value: 3,
    label: "Option3"
  },
  {
    value: 4,
    label: "Option4"
  },
  {
    value: 5,
    label: "Option5"
  }
];
</script>

<template>
  <div class="flex flex-wrap gap-4 items-center">
    <el-select v-model="value" placeholder="Select" style="width: 240px">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>

    <el-text class="mx-1" type="primary">{{ value }}</el-text>
  </div>
</template>
