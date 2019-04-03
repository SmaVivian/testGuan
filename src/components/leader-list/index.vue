<template>
  <div class="cmp-leader-list">
    <!-- <h3 @click="handleOperate(itemGroup, 2)">设置本看板所有任务负责人</h3> -->

    <!-- 搜索悬浮面板 -->
    <div class="m-search-wrap" v-if="show">
      <div class="input-box">
        <el-input class="input-block" 
          v-model="key" 
          suffix-icon="el-icon-search"
          placeholder="输入姓名搜索">
        </el-input>
      </div>
      <ul>
        <!-- 是否有责任人 -->
        <li>
          <img src="~@images/default-head.svg" alt="">
          <h3>{{currentItem.leader || '待认领'}}</h3>
          <i class="el-icon el-icon-check" v-if="currentItem.leader"></i>
          <!-- <svg-icon icon-class="add" class-name="icon-add" /> -->
        </li>

        <!-- 最常协作 -->
        <p class="m-tips mt-20 mb-10">最常协作</p>
        <li class="lists" v-for="(item, index) in newDataList" :key="index" @click="handleChoose(item)">
          <img src="~@images/default-head.svg" alt="">
          <h3>{{item.name}}</h3>
          <!-- <i class="el-icon el-icon-check"></i> -->
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import PinyinMatch from 'pinyin-match'
export default {
  props: {
    // 最常协作列表
    // lastPersonList: {
    //   type: Array,
    //   default() {
    //     return []
    //   }
    // },
    itemGroup: Object,
    // 回调
    callFun: Function
  },
  computed: {
    currentItem() {
      return this.itemGroup
    },
    personList() {
      return this.lastPersonList
    },
    // 模糊匹配
    newDataList() {
      var newDataList = [];
      this.lastPersonList.map((item) => {
        if ((item.name && PinyinMatch.match(item.name, this.key))) {
        // if (item.name.search(_this.key) != -1) {
          newDataList.push(item);
        }
      })
      console.log('newDataList', newDataList)
      return newDataList
    },
  },
  data() {
    return {
      key: '',
      show: false,
      // 最常协作列表
      lastPersonList: [
        {
          name: '冯绍峰',
          id: 1
        },
        {
          name: '赵丽颖2',
          id: 2
        },
        {
          name: '张杰3',
          id: 3
        },
        {
          name: '冯绍峰4',
          id: 4
        },
        {
          name: '冯绍峰5',
          id: 6
        },
      ],
    }
  },
  methods: {
    init() {
      this.show = false
    },
    showList() {
      this.show = true
    },
    // 选择任务负责人
    handleChoose(item) {
      this.show = false
      this.callFun && this.callFun(item)
    },
  },
  mounted() {
    console.log(123)
  }
}
</script>

<style lang="scss" scoped>

</style>


