<template>
  <el-dialog
    class="modal-file"
    :visible.sync="dialogShow"
    :show-close="false"
    width="700px"
    title="移动至">
    <el-row>
      <!-- <el-col :span="8" class="picker">
        <ul>
          <li v-for="(item, index) in dataList" :key="index" @click="clickPicker(item, $event)">{{item.name}}</li>
        </ul>
      </el-col> -->
      <el-col :span="24" class="file-picker-wrap">
        <div class="file-picker-view">
          <ul class="file-picker">
            <!-- <li v-for="(item, index) in leftList">
              <div class="item" 
                v-for="(v, i) in item.arr" 
                :class="{'active': v.isActive}"
                @click="clickPicker(v, index, $event)">
                {{item.name}}
                <p class="m-des">
                  <img v-if="v.children" class="icon mr-10" src="~@images/default-head.svg" alt="" srcset="">
                  {{v.name}}
                </p>
              </div>
            </li> -->

            <div class="right">
              <li v-for="(item, index) in viewList">
                <div class="item" 
                  v-for="(v, i) in item.arr" 
                  :class="{'active': v.isActive}"
                  @click="clickPicker(v, index, $event)">
                  {{item.name}}
                  <p class="m-des">
                    <img v-if="v.children" class="icon mr-10" src="~@images/default-head.svg" alt="" srcset="">
                    {{v.name}}
                  </p>
                </div>
              </li>
            </div>
          </ul>
        </div>
      </el-col>
    </el-row>

    <div class="btns fr mt-30">
      <el-button @click="dialogShow=false">取消</el-button>
      <el-button type="primary" @click="save">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogShow: false,
      dataList: [
        {
          name: '烈火展项目',
          level: 1,
          id: '1',
          children: [
            {
              name: '招标文件夹',
              level: 2,
              id: '2',
              children: [
                {
                  name: '招标文件夹1',
                  level: 3,
                  id: '3',
                },
                {
                  name: '招标文件夹2',
                  level: 3,
                  id: '4',
                },
              ]
            },
            {
              name: '设计文件夹',
              level: 2,
              id: '5',
            },
          ]
        },
        {
          name: '东北抗联展项目',
          level: 1,
          id: '6',
          children: [
            {
              name: '东北招标文件夹',
              level: 2,
              id: '7',
            },
            {
              name: '东北设计文件夹',
              level: 2,
              id: '8',
              children: [
                {
                  name: '招标文件夹1',
                  level: 3,
                  id: '9',
                },
                {
                  name: '招标文件夹2',
                  level: 3,
                  id: '10',
                },
              ]
            },
          ]
        },
        {
          name: '项目3',
          level: 1,
          id: '11',
        }
      ],
      viewList: [],
      leftList: [],  // 左侧选项
      rightList: [],  // 右侧文件夹
      moveId: ''
    }
  },
  watch: {
    viewList() {
      // this.leftList = this.viewList[0]
      // this.rightList = this.viewList.slice(1)
      // this.$set(this, 'leftList', this.viewList[0])
    }
  },
  // computed: {
  //   leftList() {
  //     return this.viewList[0]
  //   },
  //   rightList() {
  //     return this.viewList.slice(1)
  //   }
  // },
  methods: {
    init() {
      this.dialogShow = true
    },
    handleOk() {

    },
    // 选择
    clickPicker(item, index, e) {
      // if(item.isActive) return

      this.resetActive(item)

      this.moveId = item.id
      console.log(item)
      console.log(this.moveId)

      // if(e.target.parentNode.nextSibling) {
      if(this.viewList[index+1] && this.viewList[index+1].arr) {
        // 父元素下一个元素不为空
        this.viewList[index+1].arr = item.children || []

        // 重置下下级之后的数据
        this.viewList.splice(index+2)
        // if(this.viewList[index+2]) {
        //   for(let i = index+2; i < this.viewList.length ; i++) {
        //     this.viewList[i].arr = []
        //   }
        // }
      } else {
        if(!item.children) return
        // 下一个元素第一次被渲染
        this.viewList.push({
          arr: item.children
        })
      }
    },
    // 清除当前及子元素所有高亮 设置当前元素高亮
    resetActive(itemClick) {
      this.viewList.forEach((item) => {
        item.arr.forEach((v) => {
          if(v.level >= itemClick.level) {
            this.$set(v, 'isActive', false)
          }
        })
      })
      this.$set(itemClick, 'isActive', true)
    },
    // 确定移动
    save() {
      this.dialogShow = false
    }
  },
  created() {
    this.viewList.push({
      arr: this.dataList
    })
  }
}
</script>

<style lang="scss" scoped>
.modal-file {
  /deep/ .el-dialog__header {
    padding-bottom: 30px;
    border-bottom: solid 1px $border;
  }

  .file-picker-wrap {
    .file-picker-view {
      display: flex;
      overflow-x: auto;
      border-bottom: solid 1px $border;
      .file-picker {
        display: flex;
        line-height: 44px;
        .right {
          display: flex;
        }
        li {
          padding: 15px 0;
          width: 310px;
          box-sizing: border-box;
          border-right: solid 1px $border;
          cursor: pointer;
          &:first-child {
            width: 210px;
          }
          &:last-child {
            border: none;
          }
          .item {
            padding-left: 25px;
            border-left: solid 5px transparent;
            &.active {
              background-color: $color4;
              border-left: solid 5px $primary;
            }
            p {
              .icon {
                width: 16px;
                height: 16px;
                vertical-align: middle;
              }
            }
          }
        }
      }
    }
  }
}
</style>


