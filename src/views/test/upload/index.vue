<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { Plus } from "@element-plus/icons-vue";

import type { UploadProps, UploadUserFile } from "element-plus";
import { timestamp } from "@vueuse/core";

defineOptions({
  name: "UploadTestPage"
});

const fileList = ref<UploadUserFile[]>([]);
const fileLists = ref([]);

const dialogImageUrl = ref("");
const dialogVisible = ref(false);

const handleRemove: UploadProps["onRemove"] = (uploadFile, uploadFiles) => {
  console.log("🚀 ~ uploadFile:", uploadFile);
  fileLists.value = fileLists.value.filter(
    item => item.name !== uploadFile.name
  );
};

const handlePictureCardPreview: UploadProps["onPreview"] = uploadFile => {
  dialogImageUrl.value = uploadFile.url!;
  dialogVisible.value = true;
};

const handleChange: UploadProps["onChange"] = (uploadFile, uploadFiles) => {
  fileLists.value.push(uploadFile.raw);
};

const urlToImageFile = async url => {
  try {
    // 发起请求获取图片数据
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    // 将响应体转换为Blob对象
    const blob = await response.blob();

    const contentType = response.headers.get("content-type");
    const fileName = extractFileNameFromUrl(url);

    // 创建File对象，这里假设图片的类型为'image/jpeg'
    // 你可以根据实际需要更改mime类型
    const file = new File([blob], fileName, { type: contentType });

    return file;
  } catch (error) {
    console.error("Failed to fetch image:", error);
    throw error;
  }
};

const extractFileNameFromUrl = url => {
  const urlParts = url.split("/");
  const fileName = urlParts.pop();
  return fileName;
};

const getData = async () => {
  let res = [
    "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
    "https://dummyimage.com/320x240/333333/00a2ff.png"
  ];

  res.forEach(async item => {
    let file: any = await urlToImageFile(item);
    let timestamp = new Date().getTime();
    file.uid = timestamp;
    fileLists.value.push(file);
    fileList.value.push({
      name: file.name,
      url: item,
      uid: timestamp
    });
  });
};

onMounted(() => {
  getData();
});

const upload = ref();

const getFileList = () => {
  console.log(fileList.value);
  console.log(fileLists.value);
};
</script>

<template>
  <el-upload
    ref="upload"
    v-model:file-list="fileList"
    list-type="picture-card"
    :auto-upload="false"
    :on-preview="handlePictureCardPreview"
    :on-remove="handleRemove"
    :on-change="handleChange"
  >
    <el-icon><Plus /></el-icon>
  </el-upload>

  <el-button type="primary" @click="getFileList">获取文件列表</el-button>
  <el-button type="success">Success</el-button>
  <el-button type="info">Info</el-button>

  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>
