<template>
  <div>
    <!-- 藏品移库 -->
     <div class="storageRoom">
        <h3>原库房</h3> <h3>书画库房</h3>
        <h3>原库位</h3> <h3>库位1</h3>
      </div>
      <el-form ref="form" :model="form">
        <el-form-item label="现库房" >
          <el-select v-model="form.region" placeholder="状态" class="nowRoom">
            <!-- <el-option v-for="item in textureCondition" :key="item.name">{{item.name}}{{item.value}}</el-option> -->
            <el-option label="说明" value="shanghai"></el-option>
            <el-option label="全部" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="现库房">
          <el-select v-model="form.region" placeholder="状态" class="nowRoom">
            <!-- <el-option v-for="item in textureCondition" :key="item.name">{{item.name}}{{item.value}}</el-option> -->
            <el-option label="说明" value="shanghai"></el-option>
            <el-option label="全部" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="storageTime">
        <h3>移库时间</h3> <h3>2018 / 06 / 20</h3>
       </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogMoveVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogMoveVisible = false">确 定</el-button>
    </div>
</div>
      
</template>

<script>
export default {
  data() {
    return {
      form: {
          name: '',
          region: '',
          type:[]
        },
    }  
  }   
};
</script>

<style lang="scss" scoped>
.el-dialog {
  h3 {
    float: left;
    display: block;  
}
  h3:nth-child(3) {
    margin-left: 25%;
  }
  .el-dialog__body {
    .storageRoom {
    height: 20px;
    margin-bottom: 30px;
      h3:nth-of-type(even) {
      margin-left: 20px;
      }
    }
    .el-form {
      display: flex;
      margin-bottom: 10px;
        .el-form-item {
          /deep/ .el-form-item__label {
                    color: #9699A2;
                  }
          .nowRoom {
            width: 56%;
          }
        }
      .el-form-item:nth-child(1) {
        margin-right: 35px;
      }
    }
    .storageTime {
        height: 20px;
        margin-bottom: 28px;
      }
       .dialog-footer {
    text-align: center;
}
  }
}

  
 

  



 


</style>





