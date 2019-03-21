<template>
  <div class="page-task-list">
    <div class="task-list m-des">
      <div class="header">
        <el-row class="tc">
          <el-col :span="6" class="tl">任务名称</el-col>
          <el-col :span="4">截止时间</el-col>
          <el-col :span="4">任务名称</el-col>
          <el-col :span="4">任务名称</el-col>
          <el-col :span="3">任务名称</el-col>
          <el-col :span="3">任务名称</el-col>
        </el-row>
      </div>

      <!-- 一级 -->
      <div class="item mt-20" v-for="(item, index) in listData">
        <!-- <h2><span class="g-mark mr-10">23</span>展览策划</h2> -->
        <h2>
          <el-badge class="g-mark mr-10" :value="234" type="primary" />
          <span class="g-pointer" @click="item.showMore=!item.showMore">
            展览策划
            <i class="el-icon primary" :class="{'el-icon-arrow-down': !item.showMore, 'el-icon-arrow-up': item.showMore}"></i>
          </span>
          
          <!-- <i class="el-icon el-icon-arrow-up primary"></i> -->
        </h2>

        <!-- 二级 -->
        <div v-if="item.showMore">
          <div class="item-child mt-20 mb-20" v-for="(v, i) in item.arrList">
            <!-- 判断状态 todo -->
            <el-row class="tc" :class="{'underline': v.selectVal === '3'}">
              <el-col :span="6" class="tl">
                <label class="my-checkbox el-checkbox__input" 
                  :class="{'is-checked': v.selectVal === '3'}"
                  @click="toggleCheck(v)">
                  <span class="el-checkbox__inner"></span>
                </label>
                <!-- <el-checkbox @change="toggleCheck(v)"></el-checkbox> -->
                <span class="title">输出展览计划(0/3)</span>
              </el-col>

              <!-- 截止时间 -->
              <el-col :span="4">2018/12/20</el-col>

              <!-- 剩余天数 -->
              <el-col :span="4">20天</el-col>

              <!-- 负责人 -->
              <el-col :span="4">
                <img class="g-pic small mr-10" src="~@images/default-head.svg" alt="">
                <span>路远</span>
              </el-col>

              <!-- 优先级 -->
              <el-col :span="3">
                <!-- 勿删 -->
                <template v-if="!v.showDropdown">
                  <!-- <el-button type="danger" size="mini" plain>非常紧急</el-button>
                  <el-button type="warning" size="mini" plain>紧急</el-button> -->
                  <!-- <span class="m-btn">添加标签</span> -->
                  <!-- <span>普通</span> -->

                  <span class="m-btn">{{v.selectStr}}</span>
                </template>
                
                <!-- 下拉框 -->
                <div v-if="v.showDropdown">
                  <el-select 
                    v-model="v.val" 
                    @change="addLabel(v)"
                    placeholder="添加标签">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </el-col>

              <!-- 状态 -->
              <el-col :span="3">
                <span><i class="m-circle-dot"></i>&nbsp;&nbsp;未完成</span>
                <!-- 勿删 -->
                <!-- <span class="m-primary"><i class="m-circle-dot primary"></i>&nbsp;&nbsp;进行中</span>
                <span class="m-done"><i class="m-circle-dot done"></i>&nbsp;&nbsp;已完成</span>
                <span class="m-danger"><i class="m-circle-dot danger"></i>&nbsp;&nbsp;已延期</span> -->
              </el-col>
            </el-row>
          </div>
        </div>

        <span class="m-btn"><svg-icon icon-class="add" class-name="icon-add" />&nbsp;添加新任务</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listData: [
        {
          title: '标题1',
          // showMore: true,
          arrList: [
            { name: "1列表", id: 1,
              showDropdown: true,
              selectVal: '2',
              selectStr: '紧急'
            },
            { name: "12列表", id: 2,
              showDropdown: false,
              selectVal: '1',
              selectStr: '紧急'
            },
            { name: "13列表", id: 3, 
              showDropdown: false,
              selectVal: '5',
              selectStr: '紧急'
            },
            { name: "14列表", id: 4, showDropdown: false,
              selectVal: '3',
              selectStr: '紧急'
            }
          ],
        },
        {
          title: '标题2',
          arrList: [
            { name: "21列表", id: 5, showDropdown: true,
              selectVal: '3',
              selectStr: '紧急' 
            }
          ],
        },
      ],
      options: [
        {
          value: '1',
          label: '普通'
        },
        {
          value: '2',
          label: '紧急'
        },
        {
          value: '3',
          label: '非常紧急'
        },
      ]
    }
  },
  methods: {
    // 添加标签
    addLabel(item) {
      item.showDropdown = false  // 是否显示下拉框
      item.selectStr = 'ajax返回'
      console.log(item);
      console.log('已选择', item.val);
      console.log('刷新列表')
    },
    // 完成任务
    toggleCheck(item) {
      console.log(item)
      item.selectVal = '3';
    },
  },
  activated() {
    console.log('activated')
  },
  mounted() {
    // todo ajax listData每个添加 showMore
    console.log('mounted')
    this.listData.forEach(item => {
      this.$set(item, 'showMore', true)
      // item.showMore = true
    })
  }
}
</script>

<style lang="scss" scoped>
.page-task-list {
  padding: 30px;
  .task-list {
    padding: 30px;
    background:#fff;
    box-shadow:0px 1px 10px 0px rgba(238,239,245,1);
    border-radius:4px;
    line-height: 30px;
    // 重写下拉框样式
    /deep/ .el-select {
      .el-input__inner {
        height: 30px;
        line-height: 30px;
        text-align: center;
        border: none;
      }
      .el-input__suffix {
        display: none;
      }
      .el-input--suffix .el-input__inner {
        padding: 0;
      }
      ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
        color: $primary;
      }
      :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        color: $primary;
      }
      ::-moz-placeholder { /* Mozilla Firefox 19+ */
        color: $primary;
      }
      :-ms-input-placeholder { /* Internet Explorer 10-11 */
        color: $primary;
      }
    }
  }
}
</style>
