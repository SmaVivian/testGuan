<template>
  <div>
    <!-- 藏品公开字段 -->
      <el-table :data="attribute" >
        <el-table-column property="number" label="序号" width="50"></el-table-column>
        <el-table-column property="name" label="属性名称" width="100"></el-table-column>
        <el-table-column type="selection"  width="60"></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogOpenctVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogOpenctVisible = false">确 定</el-button>
      </div>
    <div>   
</div>
</div>
      
</template>

<script>
export default {
  data() {
    return {
      // 公开藏品藏品弹出表格事件
      attribute: [
        {
          number: "1",
          name: "总登记号",
          address: "上"
        },
        {
          number: "1",
          name: "总登记号",
          address: "上"
        },
        {
          number: "1",
          name: "总登记号",
          address: "上"
        }
      ]
    };
  }
};
</script>




