<template>
  
    <div class="wrap">
      <!-- 左右切换按钮 -->
      <i class="item-icon el-icon-arrow-left"></i>
      <i class="item-icon el-icon-arrow-right primary"></i>

      <!-- 未收藏 -->
      <svg-icon icon-class="collect" class-name="icon-collect" />
      <!-- 已收藏 -->
      <!-- <svg-icon icon-class="collect-active" class-name="icon-collect" /> -->
      
      <div class="swiper-box">
        <!-- <img class="pic-view" :src="detailData.url" alt="">  -->
        <!-- swiper1 -->
        <swiper :options="swiperOptionTop" class="gallery-top" ref="swiperTop" style="width:375px;">
          <swiper-slide v-for="(item, index) in dataList" :key="index">
            <img class="pic-view" :src="item.url" alt="">
            <a :href="item.url" target="_blank" class="m-btn">查看原图</a>
            
          </swiper-slide>
        </swiper>
        
        <!-- 轮播 -->
        <div class="swiper-list mt-20">
          <!-- swiper2 Thumbs -->
          <swiper :options="swiperOptionThumbs" class="gallery-thumbs" ref="swiperThumbs">
            <swiper-slide v-for="(item, index) in dataList" :key="index">
              <img :src="item.url" alt="">
            </swiper-slide>
          </swiper>
          <!-- <swiper :options="swiperOption" ref="swiperCollect">
            <swiper-slide v-for="(item, index) in dataList" :key="index">
              <img :src="item.url" alt="">
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
          </swiper> -->
        </div>
      </div>
      <!-- 右侧内容 -->
      <div class="content-box">
        <!-- 面包屑 -->
        <el-breadcrumb separator="/">
          <el-breadcrumb-item><span @click="showBase=true">基本信息</span></el-breadcrumb-item>
          <el-breadcrumb-item><span @click="showBase=false">更多详情</span></el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 基本信息 -->
        <div class="tab1" v-if="showBase">
          <h5>一普库（2400）</h5>
          <el-row>
            <el-col :span="12">
              <h3 class="mb-20">年代：<el-button class="el-primary-border" size="mini">{{detailData.year}}</el-button></h3>
              <h3 class="mb-20">级别：<el-button class="el-primary-border" size="mini">一级文物</el-button></h3>
            </el-col>
            <el-col :span="12">
              <h3 class="mb-20">质地：<el-button class="el-primary-border" size="mini">陶</el-button></h3> 
              <h3 class="mb-20">类别：<el-button class="el-primary-border" size="mini">铁器</el-button></h3>  
            </el-col>
          </el-row>

          <h4 class="mt-13 mb-20">藏品参数</h4>
          <el-table 
            :data="detailData.tableData"
            border
            stripe>
            <el-table-column
              prop="aaa"
              label="通长"
              width="218">
            </el-table-column>

            <el-table-column
              prop="aaa"
              label="通宽"
              width="220">
            </el-table-column>

            <el-table-column
              prop="aaa"
              label="通高"
              width="220">
            </el-table-column>
          </el-table>

          <el-table 
            class="mt-10"
            :data="detailData.tableData"
            border
            stripe>
            <el-table-column
              prop="bbb"
              label="具体尺寸"
              width="218">
            </el-table-column>

            <el-table-column
              prop="aaa"
              label="质量范围"
              width="220">
            </el-table-column>

            <el-table-column
              prop="aaa"
              label="具体质量"
              width="220">
            </el-table-column>
          </el-table>

          <h4 class="mt-20 mb-20">保存情况</h4>
          <el-row>
            <el-col :span="12">
              <h3>保存状态：状态稳定，不需修复</h3>
              <h3>完残状况：脱釉、口沿残破</h3>
            </el-col>
            <el-col :span="12">
              <h3>完残程度：基本完整</h3>
            </el-col>
          </el-row>
        </div>

       

        <!-- 更多详情 -->
        <div class="tab2" v-if="!showBase">
          <div class="info">
             <h5>一普库（2400）</h5>
          <el-row>
            <el-col :span="11">
              <div class="infoContent">
                <h6 class="mb-25">原名:</h6>  <h7>{{detailInfo.name}}</h7>
              </div>
              <div class="infoContent">
                <h6 class="mb-25">藏品编号:</h6>  <h7>000097</h7>
              </div>
              <div class="infoContent">
                <h6 class="mb-25">藏品单位编号:</h6>  <h7>22038221800001</h7>
              </div>
              <div class="infoContent">
                <h6 class="mb-25">入库库房:</h6>  <h7>书画库房</h7>
              </div>
              <div class="infoContent">
                <h6 class="mb-25">分类别:</h6>  <h7>铜器</h7>
              </div>
              <div class="infoContent">
                <h6 class="mb-25">入藏时间:</h6>  <h7>1994</h7>
              </div>
              <div class="infoContent">
                <h6 class="mb-25">单位:</h6>  <h7>件</h7>
              </div>
              <div class="infoContent">
                <h6 class="mb-25">附件:</h6>  <h7>- -</h7>
              </div>
            </el-col>

            <el-col :span="13">
              <div class="infoContent">
                <h6>来源:</h6>  <h7>拨交</h7>
              </div>
              <div class="infoContent">
                <h6>收藏单位:</h6>  <h7>双宁市郑家屯博物馆</h7>
              </div>
              <div class="infoContent">
                <h6>总登记号:</h6>  <h7>12345</h7>
              </div>
              <div class="infoContent">
                <h6>存放地点:</h6>  <h7>货柜一</h7>
              </div>
              <div class="infoContent">
                <h6>分类号:</h6>  <h7>123456</h7>
              </div>
              <div class="infoContent">
                <h6>实际数量:</h6>  <h7>1</h7>
              </div>
              <div class="infoContent">
                <h6>录入员:</h6>  <h7>金军</h7>
              </div>   
            </el-col>
          </el-row>
          </div>
        </div>

      </div>

       <!-- 下方内容 -->
        <!-- <div class="cycle">
          <h4>生命周期</h4>
        </div> -->
      
    </div>

</template>

<script>
import 'swiper/dist/css/swiper.min.css'
import { swiper, swiperSlide } from "vue-awesome-swiper"
export default {
  components: {
    swiper,
    swiperSlide
  },
  data() {
    let vm = this
    return {
      dialogShow: false,
      showBase: true, //展示基本信息
      dataList: [
        {
          name: '1',
          year: '晋1',
          intro: '从 2015 年 4 月起，Ant Design 在蚂蚁金服中后台产品线迅速推广，对接多条业务线，覆盖系统 800 个以上。定位于中台业务的 Ant Design 兼顾专业和非专业的设计人员，具有学习成本低、上手速度快、实现效果好等特点，并且提供从界面设计到前端开发的全链路生态，可以大大提升设计和开发的效率。',
          tableData: [{
            aaa: '6CM',
          }],
          url: 'https://www.swiper.com.cn/demo/img/nature1.jpg'
        },
        {
          name: '2',
          year: '晋2',
          intro: '从 2015 年 4 月起，Ant Design 在蚂蚁金服中后台产品线迅速推广，对接多条业务线，覆盖系统 800 个以上。定位于中台业务的 Ant Design 兼顾专业和非专业的设计人员，具有学习成本低、上手速度快、实现效果好等特点，并且提供从界面设计到前端开发的全链路生态，可以大大提升设计和开发的效率。',
          tableData: [{
            aaa: '6CM',
          }],
          url: 'https://www.swiper.com.cn/demo/img/nature2.jpg'
        },
        {
          name: '3',
          year: '晋3',
          intro: '从 2015 年 4 月起，Ant Design 在蚂蚁金服中后台产品线迅速推广，对接多条业务线，覆盖系统 800 个以上。定位于中台业务的 Ant Design 兼顾专业和非专业的设计人员，具有学习成本低、上手速度快、实现效果好等特点，并且提供从界面设计到前端开发的全链路生态，可以大大提升设计和开发的效率。',
          tableData: [{
            aaa: '6CM',
          }],
          url: 'https://www.swiper.com.cn/demo/img/nature3.jpg'
        },
        {
          name: '4',
          year: '晋4',
          intro: '从 2015 年 4 月起，Ant Design 在蚂蚁金服中后台产品线迅速推广，对接多条业务线，覆盖系统 800 个以上。定位于中台业务的 Ant Design 兼顾专业和非专业的设计人员，具有学习成本低、上手速度快、实现效果好等特点，并且提供从界面设计到前端开发的全链路生态，可以大大提升设计和开发的效率。',
          tableData: [{
            aaa: '6CM',
            
          }],
          url: 'https://www.swiper.com.cn/demo/img/nature4.jpg'
        },
        {
          name: '5',
          year: '晋5',
          intro: '从 2015 年 4 月起，Ant Design 在蚂蚁金服中后台产品线迅速推广，对接多条业务线，覆盖系统 800 个以上。定位于中台业务的 Ant Design 兼顾专业和非专业的设计人员，具有学习成本低、上手速度快、实现效果好等特点，并且提供从界面设计到前端开发的全链路生态，可以大大提升设计和开发的效率。',
          tableData: [{
            aaa: '6CM',
            
          }],
          url: 'https://www.swiper.com.cn/demo/img/nature5.jpg'
        },
        {
          name: '6',
          year: '晋6',
          intro: '从 2015 年 4 月起，Ant Design 在蚂蚁金服中后台产品线迅速推广，对接多条业务线，覆盖系统 800 个以上。定位于中台业务的 Ant Design 兼顾专业和非专业的设计人员，具有学习成本低、上手速度快、实现效果好等特点，并且提供从界面设计到前端开发的全链路生态，可以大大提升设计和开发的效率。',
          tableData: [{
            aaa: '6CM',
            
          }],
          url: 'https://www.swiper.com.cn/demo/img/nature6.jpg'
        },
      ],
      detailData: {
        name: '123',
        year: '金',
        intro: '从 2015 年 4 月起，Ant Design 在蚂蚁金服中后台产品线迅速推广，对接多条业务线，覆盖系统 800 个以上。定位于中台业务的 Ant Design 兼顾专业和非专业的设计人员，具有学习成本低、上手速度快、实现效果好等特点，并且提供从界面设计到前端开发的全链路生态，可以大大提升设计和开发的效率。',
        tableData: [{
          aaa: '6CM',
          bbb: '口径: 43.50CM;  底径: 26.00CM; 腹径: 61.20CM'
        }],
        url: 'https://www.swiper.com.cn/demo/img/nature1.jpg'
      },
      detailInfo: {
        name: '清雍正粉彩梅竹双燕纹瓶'
      },
      swiperOptionTop: {
        spaceBetween: 10,
        // navigation: {
        //   nextEl: '.swiper-button-next',
        //   prevEl: '.swiper-button-prev'
        // },
        on: {
          slideChange() {
            vm.$refs.swiperThumbs.swiper.slideTo(this.activeIndex)
            vm.detailData = vm.dataList[this.activeIndex]
            // this.$('.gallery-thumbs .swiper-slide').css({ opacity: 0.4 })
            // this.$(this.$('.gallery-thumbs .swiper-slide')[this.activeIndex])
            // .css({ opacity: 1 })
          }
        }
      },
      swiperOptionThumbs: {
        spaceBetween: 10,
        // centeredSlides: true,
        // slidesPerView: 'auto',
        // touchRatio: 0.2,
        // slideToClickedSlide: true,
        // spaceBetween: 10,
        slidesPerView: 4,
        // freeMode: true,
        // watchSlidesVisibility: true,
        // watchSlidesProgress: true,
        on: {
          click: function(){
            console.log(vm.dataList[this.clickedIndex])
            if(typeof this.clickedIndex === 'undefined') return
            vm.$refs.swiperTop.swiper.slideTo(this.clickedIndex)
            vm.detailData = vm.dataList[this.clickedIndex]
            // const swiperCollect = vm.$refs.swiperCollect.swiper
            // swiperCollect.slideTo(this.clickedIndex)
  
            // this.$('.gallery-thumbs .swiper-slide').css({ opacity: 0.4 });
            // this.$(this.clickedSlide).css({ opacity: 1 });
          },
        }
      },
      // swiperOptionTop: {
      //   spaceBetween: 10,
      //   navigation: {
      //     nextEl: '.swiper-button-next',
      //     prevEl: '.swiper-button-prev'
      //   },
      //   on: {
      //     slideChange() {
      //       const swiperThumbs = vm.$refs.swiperThumbs.swiper
      //       swiperThumbs.slideTo(this.activeIndex)

      //       this.$('.gallery-thumbs .swiper-slide').css({ opacity: 0.4 })
      //       this.$(this.$('.gallery-thumbs .swiper-slide')[this.activeIndex])
      //       .css({ opacity: 1 })
      //     }
      //   }
      // },
      // swiperOptionThumbs: {
      //   spaceBetween: 10,
      //   slidesPerView: 4,
      //   touchRatio: 0.2,
      //   slideToClickedSlide: true,
      //   on:{
      //     click: function(){
      //       const swiperTop = vm.$refs.swiperTop.swiper
      //       swiperTop.slideTo(this.clickedIndex)

      //       this.$('.gallery-thumbs .swiper-slide').css({ opacity: 0.4 });
      //       this.$(this.clickedSlide).css({ opacity: 1 });
      //     },
      //   },
      // },
      swiperOption: {
        slidesPerView: 4,
        spaceBetween: 20,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        // pagination: {
        //   el: '.swiper-pagination',
        //   type: 'fraction',
        //   clickable: true
        // },
        // loop: true
        on:{
          click: function(){
            console.log(vm.dataList[this.clickedIndex])
            if(this.clickedIndex) return
            vm.detailData = vm.dataList[this.clickedIndex]
            // const swiperCollect = vm.$refs.swiperCollect.swiper
            // swiperCollect.slideTo(this.clickedIndex)

            // this.$('.gallery-thumbs .swiper-slide').css({ opacity: 0.4 });
            // this.$(this.clickedSlide).css({ opacity: 1 });
          },
          slideChange() {
            vm.detailData = vm.dataList[this.activeIndex]
          }
        },
      },
      swiperSlides: ['https://www.swiper.com.cn/demo/img/nature1.jpg', 'https://www.swiper.com.cn/demo/img/nature2.jpg', 'https://www.swiper.com.cn/demo/img/nature3.jpg', 'https://www.swiper.com.cn/demo/img/nature4.jpg', 'https://www.swiper.com.cn/demo/img/nature5.jpg', 'https://www.swiper.com.cn/demo/img/nature6.jpg']
    }
  },
  methods: {
    init() {
      this.dialogShow = true
      // this.$nextTick(() => {
      //   const swiperTop = this.$refs.swiperTop.swiper
      //   const swiperThumbs = this.$refs.swiperThumbs.swiper
      //   swiperTop.controller.control = swiperThumbs
      //   swiperThumbs.controller.control = swiperTop
      // })
    },
  },
  mounted() {
    
  }
}
</script>

<style lang="scss" scoped>
.swiper-collect {
  .wrap {
    position: relative;
    display: flex;
    .item-icon {
      position: absolute;
      width: 30px;
      height: 30px;
      line-height: 30px;
      top: 50%;
      color: #9699A2;
      background-color: #fff;
      border-radius: 100%;
      text-align: center;
      cursor: pointer;
      &.primary {
        color: #fff;
        background-color: $primary;
      }
    }
    .icon-collect {
      position: absolute;
      top: 340px;
      left: 338px;
      font-size: 30px;
      z-index: 2;
    }
    .el-icon-arrow-left {
      left: -85px;
    }
    .el-icon-arrow-right {
      right: -85px;
    }
    .swiper-box {
      position: relative;
      // width: 500px;
      .pic-view {
        width: 375px;
        height: 375px;
      }
      a {
        display: inline-block;
        position: absolute;
        top: 20px;
        right: 20px;
        padding: 3px 15px;
        background: rgba(0,0,0,.5);
        border-radius: 20px;
      }
      .swiper-list {
        position: relative;
        width: 375px;
      
        .swiper-container {
          margin-left: 0;
          width: 100%;
          .swiper-slide {
            position: relative;
            width: 83px!important;
            height: 83px;
            margin-right: 14px!important;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
    .swiper-button-prev {
      left: -50px;
    }
    .swiper-button-next {
      right: -50px;
    }
    .content-box {
      padding-left: 30px;
      width: 660px;
      .infoContent {
        display: flex;
      }
      h1 {
        margin-bottom: 20px;
      }
      .el-table--border {
        border: 1px solid #F5F6F8F5;
      }
    }
  }
  /deep/ .el-table th {
    background-color: #F5F6F8;
  }
  /deep/ .el-table th, 
  /deep/ .el-table td {
    padding: 8px 0;
  }
  .el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: #fff;
  }
}
.el-breadcrumb {
  float: right;
  line-height: 25px;
}
/deep/.el-table th {
  padding: 8px 0;
}
/deep/.el-table .cell {
  color: #9699A2!important;
}

</style>


