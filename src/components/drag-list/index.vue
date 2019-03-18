<template>
  <div class="cmp-drag">
    <el-card class="box-card drag-list">
      <div slot="header" class="header clearfix">
        <h2 class="fl"><el-badge class="mark" :value="2" type="primary" />&nbsp;{{title}}</h2>
        <div class="operate fr">...</div>
        <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
      </div>
      <div class="content">
        <el-checkbox-group v-model="checkedList" @change="handleChange">
          <draggable class="list-group" :list="list" :options="{group:'task'}" @change="log">
              <div class="list-group-item"
                :class="{'tip waning': item.id === 1, 'tip rush': item.id === 2}"
                v-for="(item, index) in list"
                :key="item.id">
                <div class="group-item">
                  <p>
                    <el-checkbox :label="item.id" :key="item.id" @change="handleSelect(item, $event)">{{item.name}}</el-checkbox>
                    <svg-icon icon-class="add" class-name="icon-add" v-if="item.id === 1"/>  
                  </p>
                  <p>
                    <label class="person m-assist">胡强&nbsp;&nbsp;20180803</label>
                  </p>
                </div>
                <!-- <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                  <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                </el-checkbox-group> -->
              </div>
          </draggable>
        </el-checkbox-group>

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
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      checkedList: [1, 2, 5, 9]
    }
  },
  methods: {
    // 选择
    handleChange(a) {

      console.log(a)
    },
    handleSelect(item, isCheck) {
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
  }
}
</script>

<style lang="scss" scoped>
.cmp-drag {
  .drag-list {
    padding: 20px;
    padding-right: 10px;
    box-sizing: border-box;
    margin-bottom: 20px;
    .header {
      padding-right: 10px;
      .operate {
        margin-top: -5px;
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
        background-color: #9699A2;
        opacity: .5;
      }
    }
    
    .list-group-item.sortable-ghost {
      .group-item {
        background-color: #F2F9FF;
      }
    }

    /deep/ .el-checkbox__input.is-checked + .el-checkbox__label {
      color: #9699A2;
      text-decoration: line-through;
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
