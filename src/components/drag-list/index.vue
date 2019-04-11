<template>
  <div class="cmp-drag">
    <el-card class="box-card drag-list">
      <div slot="header" class="header clearfix">
        <h2><el-badge class="g-mark" :value="234" type="primary" />&nbsp;{{itemGroup.title}}</h2>

        
        <el-popover
          class="pop-wrap"
          placement="bottom-start"
          v-model="showPopover"
          trigger="click">
          <div class="operate-box">
            <!-- 菜单悬浮面板 -->
            <div class="m-panel" v-if="showMenu">
              <h3 @click="handleOperate(itemGroup, 1)">修改看板名称</h3>
              <h3 @click="handleOperate(itemGroup, 2)">设置本看板所有任务负责人</h3>
              <!-- <h3 @click="handleOperate(itemGroup, 3)">设置本看板所有任务截至时间</h3> -->

              <h3>
                <el-date-picker
                  class="cus-btn-date"
                  @change="handleOperate(itemGroup, 3)"
                  v-model="chooseDate"
                  type="date"
                  placeholder="设置本看板所有任务截止时间">
                </el-date-picker>
              </h3>
              <h3 class="m-danger dele" @click="handleOperate(itemGroup, 4)">删除看板</h3>
            </div>

            <!-- 搜索负责人列表 悬浮面板 -->
            <cmp-leader-list ref="cmpLeaderList" :itemGroup="itemGroup" :lastPersonList="lastPersonList" :callFun="handleChoose"></cmp-leader-list>

          </div>
          <span class="operate" slot="reference" @click="clickMenu"><i class="el-icon el-icon-more"></i></span>
        </el-popover>
      </div>
      
      <div class="content">
        <!-- <el-checkbox-group v-model="checkedList" @change="handleChange"> -->
        <draggable class="list-group" :list="list" :options="{group:'task'}" @change="log">
          <div class="list-group-item"
            :class="{'tip waning': item.id === 1, 'tip rush': item.id === 2}"
            @click="showDetailDialog(item)"
            v-for="(item, index) in list"
            :key="index">
            <div class="group-item">
              <p>
                <label class="my-checkbox el-checkbox__input" 
                  :class="{'is-checked': item.id === 1}"
                  @click.stop="toggleCheck(item)">
                  <span class="el-checkbox__inner"></span>
                </label>
                <!-- <el-checkbox :label="item.id" :key="item.id" @change="handleSelect(item, $event)">{{item.name}}</el-checkbox> -->
                <span class="my-check-title" :class="{'is-checked': item.id===1}">{{item.name}}</span>&nbsp;&nbsp;
                <svg-icon icon-class="fujian" class-name="icon-add" v-if="item.id === 1" style="font-size: 16px;"/>  
              </p>
              <p>
                <label class="person m-assist">胡强&nbsp;&nbsp;2018/08/03</label>
              </p>
            </div>
          </div>
        </draggable>
        <!-- </el-checkbox-group> -->

        <!-- 添加新任务 -->
        <p class="panel-add m-assist" v-if="!showAddTask" @click="showAddTask=true"><svg-icon icon-class="add" class-name="icon-add" />&nbsp;添加新任务</p>
        <div class="task-add-box" v-if="showAddTask">
          <el-input class="task-area" type="textarea" v-model="form.newTask" placeholder="请输入任务名称"></el-input>
          <h4 class="btn-deadline-box">
            <span class="btn-deadline" v-if="!form.deadline">截止时间</span>
            <span>
              <svg-icon icon-class="date" class-name="icon-item"/>&nbsp;
              <el-date-picker
                class="cus-btn-date"
                v-model="form.deadline"
                @change="handleOperate(itemGroup, 3)"
                type="date"
                placeholder="">
              </el-date-picker>
            </span>

            <el-popover
            class="pop-wrap"
            placement="top-start"
            v-model="addLeaderPopover"
            trigger="click">
              <!-- 搜索负责人列表 悬浮面板 -->
              <cmp-leader-list ref="cmpLeaderList1" :itemGroup="itemGroup" :lastPersonList="lastPersonList" :callFun="handleChooseAdd"></cmp-leader-list>

              <span class="operate ml-20" slot="reference" @click="showLeaderList">
                <svg-icon icon-class="chengyuan" class-name="icon-item icon-chengyuan"/>
                {{form.leader || '负责人'}}
              </span>
            </el-popover>
          </h4>
          <el-button class="mg-20 mb-10" type="primary" @click="submitAddTask">确定</el-button>
        </div>
      </div>

    </el-card>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import cmpLeaderList from '@cmp/leader-list'

export default {
  name: 'DragList',
  components: { draggable, cmpLeaderList },
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    },
    // 最常协作列表
    lastPersonList: {
      type: Array,
      default() {
        return []
      }
    },
    // 回调
    callFun: Function,
    itemGroup: Object
  },
  computed: {
    currentItem() {
      return this.itemGroup
    },
    personList() {
      return this.lastPersonList
    }
  },
  data() {
    return {
      key: '',
      showPopover: false,
      addLeaderPopover: false, // 添加任务负责人面板
      showMenu: true,  // 显示菜单面板
      checkedList: [1, 2, 5, 9],
      chooseDate: '',
      showAddTask: false,
      form: {
        newTask: '',  //新任务名称
        deadline: '',  //截止时间
        leader: ''
      }
    }
  },
  methods: {
    // 完成任务
    toggleCheck(item) {
      console.log(item)
      item.id = 2;
    },
    // 弹框详情
    showDetailDialog(item) {
      this.$emit('showProDialog', item)
    },
    clickMenu() {
      this.showMenu = true
      this.$refs.cmpLeaderList.init()
    },
    showLeaderList() {
      this.$refs.cmpLeaderList1.showList()
    },
    // 点击菜单面板
    handleOperate(item, type) {
      switch(type) {
        case 1:
          this.showPopover = false
          this.callFun && this.callFun('修改看板名称')
          // this.addTaskPanel('修改看板名称')
          break
        case 2:
          this.showMenu = false  // 任务负责人
          this.$refs.cmpLeaderList.showList()  // 负责人列表
          break
        case 3:
          console.log(this.chooseDate && this.$common.parseTime(this.chooseDate, '{y}-{m}-{d}'))
          this.showPopover = false
          break
        case 4:
          this.showPopover = false
          break
      }
      console.log(type)
    },
    // 新建、修改任务看板
    // addTaskPanel(title) {
    //   this.$prompt('', title || '新建任务看板', {
    //     showClose: true,
    //     showCancelButton: false,
    //     confirmButtonText: '确定',
    //     inputPlaceholder: '看板名称',
    //     inputPattern: /^[\S]{2,6}$/,
    //     inputErrorMessage: '请输入2到5位非空字符',
    //     // center: true
    //   }).then(({ value }) => {
    //     console.log(value)
    //     // this.$message({
    //     //   type: 'success',
    //     //   message: '你的邮箱是: ' + value
    //     // });
    //   }).catch(() => {
    //     // this.$message({
    //     //   type: 'info',
    //     //   message: '取消输入'
    //     // });       
    //   });
    // },
    // 选择本看板所有任务负责人
    handleChoose(item) {
      this.currentItem.leader = item.name
      this.showPopover = false
    },
    // 添加任务-选择任务负责人
    handleChooseAdd(item) {
      this.form.leader = item.name
      this.addLeaderPopover = false
    },
    // 添加新任务
    submitAddTask() {
      console.log(this.form)
      this.showAddTask = false
      this.form.newTask = ''
      this.form.deadline = ''
      this.form.leader = ''
    },
    // 选择
    // handleChange(a) {
    //   console.log(a)
    // },
    // handleSelect(item, isCheck) {
    //   console.log(isCheck, item)
    // },
    // add: function() {
    //   this.list.push({ name: "Juan" });
    // },
    // replace: function() {
    //   this.list = [{ name: "Edgard" }];
    // },
    // clone: function(el) {
    //   return {
    //     name: el.name + " cloned"
    //   };
    // },
    log: function(evt) {
      console.log(evt);
    }
  },
  created() {
    console.log(this.list)
    
  },
}
</script>

<style lang="scss" scoped>
.cus-btn-date {
  ::-webkit-input-placeholder { /* WebKit browsers */
    color: #9699A2;
  }
  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #9699A2;
  }
  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #9699A2;
  }
  :-ms-input-placeholder { /* Internet Explorer 10+ */
    color: #9699A2;
  }
}
.btn-deadline-box {
  position: relative;
  .btn-deadline {
    position: absolute;
    left: 20px;
    top: 10px;
  }
}
.icon-chengyuan {
  color: $primary;
  font-size: 14px;
}
.cmp-drag {
  .drag-list {
    width: 330px;
    padding: 20px;
    padding-right: 10px;
    margin-right: 20px;
    box-sizing: border-box;
    margin-bottom: 20px;
    overflow: initial;
    
    .header {
      position: relative;
      padding-right: 10px;
      .pop-wrap {
        width: 20px;
        height: 20px;
        position: absolute;
        top: 0;
        right: 10px;
        cursor: pointer;
      }
    }
    .content {
      height: calc( 100vh - 287px);
      padding-right: 10px;
      // padding-right: 6px;
      overflow-y: auto;
      // height: 617px;
    }
    /deep/ .el-card__header {
      padding: 0;
      margin-bottom: 20px;
      border: none;
    }
    .list-group-item {
      position: relative;
      cursor: pointer;
      &.tip {
        padding-left: 11px;
        &:before {
          margin-top: 30px;
          display: block;
          content:'';
          width: 6px;
          height: 100%;
          position: absolute;
          left: 0;
          background:rgba(242,81,81,1);
          border-radius:4px;
        }
      }
      &.tip.warning {
        &:before {
          background:rgba(242,81,81,1);
        }
      }
      &.tip.rush {
        &:before {
          background:#F5A623;
        }
      }
      .group-item {
        margin-bottom: 10px;
        padding: 20px;
        background-color: #F1F2F7;
        border-radius:4px;
        .title {
          color: #9699A2;
          // text-decoration: line-through;
        }
      }
      .person {
        display: inline-block;
        padding: 6px 15px;
        margin-top: 15px;
        margin-left: 25px;
        background:rgba(252,252,253,1);
        border-radius: 100px;
      }
    }

    .list-group-item.sortable-chosen {
      .group-item {
        background-color: #fff;
        // background-color: #9699A2;
        // opacity: .5;
      }
    }
    
    .list-group-item.sortable-ghost {
      .group-item {
        background-color: #F2F9FF;
      }
    }

    /deep/ .el-checkbox__label {
      display: none;
    }
  }
  .panel-add {
    padding: 0 20px;
    background:#F1F2F7;
    border-radius:4px;
    line-height: 54px;
    cursor: pointer;
  }
  .task-add-box {
    padding: 10px;
    background-color: #F1F2F7;
    /deep/ .task-area.el-textarea {
      textarea {
        height: 80px;
      }
    }
    h4 {
      font-weight: normal;
      cursor: pointer;
    }
    .cus-btn-date {
      width: 100px;
      /deep/ .el-input__inner {
        padding-right: 20px;
      }
      /deep/ .el-input__suffix {
        right: 0;
      }
      ::-webkit-input-placeholder { /* WebKit browsers */
        color: $color5;
      }
      :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        color: $color5;
      }
      ::-moz-placeholder { /* Mozilla Firefox 19+ */
        color: $color5;
      }
      :-ms-input-placeholder { /* Internet Explorer 10+ */
        color: $color5;
      }
    }
  }
}
.operate-box {
  h3.dele {
    &:hover {
      color: $danger;
    }
  }
}
// .drag {
//   background: #fff;
//   padding-bottom: 40px;
//   &:after {
//     content: "";
//     display: table;
//     clear: both;
//   }
//   .drag-list {
//     float: left;
//     padding-bottom: 30px;
//     &:first-of-type {
//       margin-right: 2%;
//     }
//     .dragArea {
//       margin-top: 15px;
//       min-height: 50px;
//       padding-bottom: 30px;
//     }
//   }
// }

// .list-complete-item {
//   cursor: pointer;
//   position: relative;
//   font-size: 14px;
//   padding: 5px 12px;
//   margin-top: 4px;
//   border: 1px solid #bfcbd9;
//   transition: all 1s;
// }

// .list-complete-item-handle {
//   overflow: hidden;
//   text-overflow: ellipsis;
//   white-space: nowrap;
//   margin-right: 50px;
// }

// .list-complete-item-handle2 {
//   overflow: hidden;
//   text-overflow: ellipsis;
//   white-space: nowrap;
//   margin-right: 20px;
// }

// .list-complete-item.sortable-chosen {
//   background: #4AB7BD;
// }

// .list-complete-item.sortable-ghost {
//   background: #30B08F;
// }

// .list-complete-enter,
// .list-complete-leave-active {
//   opacity: 0;
// }
</style>
