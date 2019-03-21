<template>
  <div class="cmp-drag">
    <el-card class="box-card drag-list">
      <div slot="header" class="header clearfix">
        <h2><el-badge class="g-mark" :value="234" type="primary" />&nbsp;{{itemGroup.title}}</h2>

        <!-- 操作 -->
        <el-popover
          class="pop-wrap"
          placement="bottom-start"
          v-model="showPopover"
          trigger="click">
          <div class="operate-box">
            <!-- 菜单悬浮面板 -->
            <div class="m-panel" v-if="showMenu">
              <h3 @click="handleOperate(itemGroup, 1)">修改项目名称</h3>
              <h3 @click="handleOperate(itemGroup, 2)">设置本看板所有任务负责人</h3>
              <h3 @click="handleOperate(itemGroup, 3)">设置本看板所有任务截至时间</h3>
            </div>

            <!-- 搜索悬浮面板 -->
            <div class="m-search-wrap" v-if="!showMenu">
              <el-input class="input-block" 
                v-model="key" 
                suffix-icon="el-icon-search"
                placeholder="输入姓名搜索">
              </el-input>
              <ul>
                <!-- 是否有责任人 -->
                <li @click="handleChoose">
                  <img src="~@images/default-head.svg" alt="">
                  <h3>冯绍峰</h3>
                  <i class="el-icon el-icon-check"></i>
                  <!-- <svg-icon icon-class="add" class-name="icon-add" /> -->
                </li>

                <!-- 最常协作 -->
                <p class="m-tips mt-20">最常协作</p>
                <li @click="handleChoose">
                  <img src="~@images/default-head.svg" alt="">
                  <h3>冯绍峰</h3>
                  <i class="el-icon el-icon-check"></i>
                </li>
                <li @click="handleChoose">
                  <img src="~@images/default-head.svg" alt="">
                  <h3>冯绍峰</h3>
                  <i class="el-icon el-icon-check"></i>
                </li>
              </ul>
            </div>
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
                  <span class="title">{{item.name}}</span>&nbsp;&nbsp;
                  <svg-icon icon-class="add" class-name="icon-add" v-if="item.id === 1"/>  
                </p>
                <p>
                  <label class="person m-assist">胡强&nbsp;&nbsp;20180803</label>
                </p>
              </div>
            </div>
        </draggable>
        <!-- </el-checkbox-group> -->

        <p class="panel-add m-assist"><svg-icon icon-class="add" class-name="icon-add" />&nbsp;添加新任务</p>
      </div>

    </el-card>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'DragList',
  components: { draggable },
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    },
    itemGroup: Object
  },
  data() {
    return {
      key: '',
      showPopover: false,
      showMenu: true,  // 显示菜单面板
      checkedList: [1, 2, 5, 9]
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
    },
    // 点击菜单面板
    handleOperate(item, type) {
      this.showMenu = false
      console.log(type)
    },
    // 选择任务负责人
    handleChoose() {
      this.showPopover = false
    },
    // 选择
    handleChange(a) {

      console.log(a)
    },
    handleSelect(item, isCheck) {
      // debugger
      console.log(isCheck, item)
    },
    add: function() {
      this.list.push({ name: "Juan" });
    },
    replace: function() {
      this.list = [{ name: "Edgard" }];
    },
    clone: function(el) {
      return {
        name: el.name + " cloned"
      };
    },
    log: function(evt) {
      window.console.log(evt);
    }
  },
  created() {
    console.log(this.list)
  },
}
</script>

<style lang="scss" scoped>
.cmp-drag {
  .drag-list {
    padding: 20px;
    padding-right: 10px;
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
      padding-right: 10px;
      // padding-right: 6px;
      overflow-y: auto;
      height: 617px;
    }
    /deep/ .el-card__header {
      padding: 0;
      margin-bottom: 20px;
      border: none;
    }
    .list-group-item {
      position: relative;
      &.tip {
        padding-left: 11px;
        &:before {
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
        padding: 10px 15px;
        margin-top: 15px;
        margin-left: 25px;
        background:rgba(252,252,253,1);
        border-radius:15px;
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

    .el-checkbox {
      margin-right: 10px;
      &.is-checked + .title {
        text-decoration: line-through;
      }
    }
    /deep/ .el-checkbox__label {
      display: none;
    }
  }
  .panel-add {
    padding: 0 20px;
    background:rgba(241,242,247,1);
    border-radius:4px;
    line-height: 54px;
    cursor: pointer;
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
