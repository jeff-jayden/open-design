<template>
  <!-- <OpenToolTip content="Top Left prompts info" placement="top">
    <OpenButton>top</OpenButton>
  </OpenToolTip> -->

  <div class="container">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column label="text" width="120">
        <template #default="scope">
          <OpenEllipsis :text="scope.row.text" rows="1" copyable />
        </template>
      </el-table-column>
      <el-table-column prop="date" label="Date" width="180" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="address" label="Address" />
    </el-table>
  </div>

  <!-- <div class="demo">
    <OpenEllipsis text="asjfhdsf jdshfdsjahf sjdh sd "></OpenEllipsis>
  </div> -->
</template>

<script setup lang="tsx">
import { OpenToolTip, OpenButton, OpenEllipsis } from '@open-design/components';

const tableData = [
  {
    text: '大家杀伐决断沙发客是的大厦尽快发货上岛咖啡圣诞节的回复收到就回复是啊尽快回复圣诞节',
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    text: 'dash',
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    text: 'dashdjhfsjadhfjfdhfjs',
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }
];
</script>

<style scoped>
.demo {
  width: 20px;
}

.container {
  padding: 100px;
  width: 1200px;
}
</style>
