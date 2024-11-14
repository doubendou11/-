<template>
  <div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="id" label="序号" />
      <el-table-column prop="time_group	" label="时间戳" />
      <el-table-column prop="avg_voltage" label="电压" />
      <el-table-column prop="avg_current" label="电流" />
      <el-table-column prop="avg_power" label="功率" />
      <el-table-column prop="activeEnergy" label="用电量" />
      <el-table-column fixed="right" label="操作">
        <!-- <template #default="scope">
          <el-button link type="primary" size="small" text>
            修改
          </el-button>
          监听删除列表事件，名为scope的事件去接收，并将index作为参数传递出去
          <el-button link type="primary" size="small" @click.prevent="deleteRow(scope.$index)">
          删除
        </el-button>
          <el-button link type="primary" size="small" @click.prevent="deleteRow(scope.$index)">
            删除
          </el-button>
        </template> -->
      </el-table-column>
    </el-table>
  </div>
</template>
<script setup>
const props = defineProps({
  tableData: {
    type: Array,
    default: []
  }
})
</script>
<style></style>
