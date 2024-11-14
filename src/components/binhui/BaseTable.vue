<template>
    <div class="table-container">
        <template v-if="tableData.length">
            <table>
                <thead>
                    <tr>
                        <th v-for="(header, index) in headers" :key="index">{{ header }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in tableData" :key="item.id" @click="highlightRow(item.id)"
                        :class="{ 'highlighted': highlightedRowId === item.id }">
                        <td v-for="(key, value) in Object.keys(item)" :key="key">{{ item[key] }}</td>
                    </tr>
                </tbody>
            </table>
        </template>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    tableData: {
        type: Array,
        default: [],
        required: true,
    },
    headers: {
        type: Array,
        default: () => [],
        required: true,
    },
})
const highlightedRowId = ref(null)

const highlightRow = (rowId) => {
    highlightedRowId.value = rowId;
    // You can perform additional actions when a row is clicked
}
// 提取表头对应的键
const keys = Object.keys(props.tableData[0] || {});
</script>

<style scoped>
.table-container {
    padding: 1% 1% 1% 1%;
    width:100%;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    border: 1px solid #f1f1f1;
    text-align: center;
    cursor: pointer;
    padding: 8px;
    color: rgb(49, 49, 49);
    font-size: 14px;
}

th {
    background-color: #3d78e7;
    color: rgb(255, 255, 255);
    text-align: center;
}

tr:hover {
    background-color: #ebf1fc;
}
</style>