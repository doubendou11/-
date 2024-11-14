<template>
    <div class="table-container">
        <table>
            <thead>
                <tr>
                    <th v-for="(header, index) in headers" :key="index">{{ header }}</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in tableData" :key="index">
                    <td v-for="key in Object.keys(item)" :key="key">
                        <span v-if="!item.editing">{{ item[key] }}</span>
                        <input class="Input" v-else v-model="item[key]" />
                    </td>
                    <td>
                        <button class="small blue button" @click="toggleEdit(index)">修改</button>
                        <button class="small button" @click="saveChanges(index)" v-if="item.editing">保存</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { reactive } from 'vue';

const props = defineProps({
    tableData: {
        type: Array,
        required: true,
    },
    headers: {
        type: Array,
        default: () => [],
        required: true,
    },
})

const tableData = reactive(props.tableData)
function toggleEdit(index) {
    tableData[index] = {
        ...tableData[index],
        editing: !tableData[index].editing
    }
    // Toggle the editing mode for the clicked row
    // this.$set(props.tableData, index, { ...props.tableData[index], editing: !props.tableData[index].editing });
}
function saveChanges(index) {
    tableData[index] = {
        ...tableData[index],
        editing: false
    }
    // Save the changes and toggle editing mode
    // this.$set(props.tableData, index, { ...props.tableData[index], editing: false });
    // Additional logic for saving changes, e.g., making an API call
}
// 提取表头对应的键
const keys = Object.keys(props.tableData[0] || {});
</script>

<style scoped>
.table-container {
    padding: 1% 1% 1% 1%;
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

tr.highlighted {
    background-color: #f1e7ab;
}


.button {
    width: 60px;
    font-size: 16px;
    border-radius: 5px;
    padding: 2%;
    border: 1px solid #bbb;
    color: #555;
    margin: 0% 5% 0% 0%;
    float: center;
}

.button:hover {
    background-color: #ffffff;
}

.button:active {
    background: #e9e9e9;
    top: 1px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .3) inset;
}

.button.blue {
    background-color: #269CE9;
    color: #fff;
    border-color: #269CE9;
}

.button.blue:hover {
    background-color: #70B9E8;
    box-shadow: 1px 1px 4px 1px rgba(0, 0, 0, 0.25);
}

.button.blue:active {
    background: #067ebe;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .3) inset;
}
</style>