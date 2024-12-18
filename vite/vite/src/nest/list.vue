<!--
 * @Date: 2024-12-16 16:39:05
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-12-17 11:40:48
 * @Description: 
-->
<template>
  <div>
    <el-input v-model="form.keyword" style="width: 240px" placeholder="Please input" />
    <el-button type="primary" @click="init">搜索</el-button>
    <el-button type="success" @click="add">添加</el-button>
    <el-button type="success" @click="transform">转账</el-button>
    <div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="id" prop="id" width="180"> </el-table-column>
        <el-table-column label="Date" width="180">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-icon><timer /></el-icon>
              <span style="margin-left: 10px">{{ scope.row.create_at }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Name" prop="name" width="180">
          <!-- <template #default="scope">
            <el-popover effect="light" trigger="hover" placement="top" width="auto">
              <template #default>
                <div>name: {{ scope.row.name }}</div>
              </template>
            </el-popover>
          </template> -->
        </el-table-column>
        <el-table-column label="profile" prop="profile" width="180"> </el-table-column>
        <el-table-column label="Operations">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
              Edit
            </el-button>
            <el-button size="small" @click="handleAddTags(scope.$index, scope.row)">
              add tags
            </el-button>
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >
              Delete
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="form.total"
        @current-change="handleCurrentChange"
        :page-sizes="[2, 4, 6, 8, 10]"
        :page-size="form.pageSize"
        :current-page="form.page"
      />
    </div>
    <el-dialog v-model="dialogVisible" title="Tips" width="500" draggable>
      <el-form label-width="auto" style="max-width: 600px">
        <el-form-item label="Name">
          <el-input v-model="formData.name" />
        </el-form-item>
        <el-form-item label="Activity zone">
          <el-input v-model="formData.description" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="confirmAdd"> Confirm </el-button>
        </div>
      </template>
    </el-dialog>
    <el-dialog v-model="tagsVisible" title="Tips" width="500" draggable>
      <el-select
      v-model="formTagData.tags"
      multiple
      placeholder="Select"
      style="width: 240px"
    >
      <el-option label="tags1" value="tags1" />
      <el-option label="tags2" value="tags2" />
      <el-option label="tags3" value="tags3" />
      <el-option label="tags4" value="tags4" />
      <el-option label="tags5" value="tags5" />
    </el-select>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="tagsVisible = false">Cancel</el-button>
          <el-button type="primary" @click="confirmAddTags"> Confirm </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { addList, update, remove, getList, addTags, transform } from "./api";
const form = reactive({
  page: 1,
  total: 1,
  pageSize: 2,
  keyword: "",
});
const dialogVisible = ref(false);
const tagsVisible = ref(false);
const formData = reactive({
  name: "",
  description: "",
  id: 0,
});
const formTagData = reactive({
  id: 0,
  tags: []
});
const handleCurrentChange = (page: number) => {
  form.page = page;
  init();
};
const handleAddTags = (_idx:any, row:any) => {
  formTagData.id = row.id;
  formTagData.tags = row.tags ?? []
  tagsVisible.value = true;
}
const confirmAddTags = async () => {
  await addTags(formTagData)
  tagsVisible.value = false;
  init()
}
const resetForm = reactive({
  name: "",
  description: "",
  id: 0,
});
const tableData = ref([]);
const handleEdit = (_idx: number, row: any) => {
  Object.assign(formData, row);
  dialogVisible.value = true;
};
const handleDelete = async (_idx: number, row: any) => {
  console.log(row);
  await remove(row.id);
  init();
};
const init = async () => {
  const list = await getList(form);
  console.log(list);
  tableData.value = list?.data?.data ?? [];
  form.total = list?.data?.total ?? 0;
};
const add = () => {
  dialogVisible.value = true;
  Object.assign(formData, resetForm);
};
const confirmAdd = () => {
  if (formData.id) {
    update(formData).then(() => {
      dialogVisible.value = false;
      init();
    });
  } else {
    addList(formData).then(() => {
      dialogVisible.value = false;
      init();
    });
  }
};
onMounted(() => {
  init();
});
</script>

<style lang="scss" scoped></style>
