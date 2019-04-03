// <template>
//   <div class="cmp-dialog-pro">
//     <el-dialog 
//       :visible.sync="dialogShow" 
//       width="900px">
//       <svg-icon icon-class="add" class-name="icon-dele" />
//       <h1 class="title">组织展览主题文档评审<span class="m-btn">（ 展览策划<i class="el-icon el-icon-arrow-down"></i> ）</span></h1>

//       <div class="content">
//         <!-- 表单 -->
//         <el-form class="form-content form-wrap" ref="form" :model="form" label-width="80px">
//           <el-form-item label="负责人">
//             <div class="item item-person">
//               <img class="mr-20" src="~@images/default-head.svg" alt="">
//               <span>付晓晓</span>
//             </div>
//           </el-form-item>
          
//           <el-form-item label="截止时间">
//             <el-date-picker class="btn-date" type="date" placeholder="选择截止时间" :clearable="true" v-model="form.date1"></el-date-picker>
//             <!-- <el-input v-model="form.name"></el-input> -->
//           </el-form-item>
          
//           <el-form-item label="优先级">
//             <el-button type="danger" size="mini" plain>非常紧急</el-button>
//           </el-form-item>

//           <el-form-item label="任务描述">
//             <p class="m-des">水电费了世纪东方打扫房间水电费了世纪东方打扫房间水电费了世纪东方打扫房间水电费了世纪东方打扫房间水电费了世纪东方打扫房间</p>
//             <el-input type="textarea" v-model="form.desc"></el-input>
//           </el-form-item>

//           <el-form-item label="子任务">
//             <span class="m-btn"><svg-icon icon-class="add" class-name="icon-add" />&nbsp;添加子任务</span>

//             <!-- 子任务 -->
//             <div class="sub-pro">
//               <!-- 子任务列表 -->
//               <ul class="sub-pro-list">
//                 <li class="clearfix">
//                   <el-checkbox></el-checkbox>
//                   <!-- <svg-icon icon-class="add" class-name="icon-add" /> -->
//                   <img class="g-pic ml-10" src="~@images/default-head.svg" alt="">
//                   <span class="m-des ml-10">展览计划评审及确定</span>
//                   <span class="time fr">20180231 12.30 <i class="el-icon-close"></i></span>
//                 </li>
//                 <li class="clearfix">
//                   <el-checkbox></el-checkbox>
//                   <!-- <svg-icon icon-class="add" class-name="icon-add" /> -->
//                   <img class="g-pic ml-10" src="~@images/default-head.svg" alt="">
//                   <span class="m-des ml-10">展览计划评审及确定</span>
//                   <span class="time fr">20180231 12.30 <i class="el-icon-close"></i></span>
//                 </li>
//               </ul>
//               <!-- 子任务表单 -->
//               <div class="sub-pro-form">
//                 <div class="top">
//                   <img class="g-pic" src="~@images/default-head.svg" alt="">
//                   <el-input class="key" v-model="form1.info" placeholder="输入子任务内容"></el-input>
//                 </div>
//                 <div class="bottom tr mt-20">
//                   <el-button>取消</el-button>
//                   <el-button type="primary">确定</el-button>
//                 </div>
//               </div>
//               <!-- 子任务添加 -->
//               <span class="m-btn"><svg-icon icon-class="add" class-name="icon-add" />&nbsp;添加子任务</span>
//             </div>
//           </el-form-item>

//           <el-form-item label="关联内容">
//             <span class="m-btn mr-30"><svg-icon icon-class="add" class-name="icon-add" />本地上传</span>
//             <i class="g-line-split"></i>
//             <span class="m-btn ml-30"><svg-icon icon-class="add" class-name="icon-add" />文档中心</span>

//             <!-- 上传文件列表 -->
//             <div class="file-box sub-pro mt-20">
//               <ul class="file-list sub-pro-list">
//                 <li class="clearfix">
//                   <img class="g-pic" src="~@images/default-head.svg" alt="">
//                   <span class="m-des ml-10">概要设计文档.doc</span>
//                   <span class="time fr">**项目 <i class="el-icon-close"></i></span>
//                 </li>
//               </ul>
//             </div>
//           </el-form-item>
//         </el-form>

//         <!-- 评论、变更历史 -->
//         <el-tabs class="tabs" v-model="activeName" @tab-click="handleClick">
//           <el-tab-pane label="评论（2）" name="comments">
//             <ul class="comment-list">
//               <li>
//                 <img src="~@images/default-head.svg" alt="">
//                 <div class="comment-box">
//                   <p>
//                     <span class="name mr-20">水电费</span>
//                     <span class="m-tips">2018/10/01 15:39</span>
//                   </p>
//                   <p class="detail ell">沙发斯蒂芬是的发送到发送到沙发斯蒂芬是的发送到发送到沙发斯蒂芬是的发送到发送到沙发斯蒂芬是的发送到发送到沙发斯蒂芬是的发送到发送到沙发斯蒂芬是的发送到发送到沙发斯蒂芬是的发送到发送到沙发斯蒂芬是的发送到发送到</p>
//                 </div>
//               </li>
//               <li>
//                 <img src="~@images/default-head.svg" alt="">
//                 <div class="comment-box">
//                   <p>
//                     <span class="name mr-20">水电费</span>
//                     <span class="m-tips">2018/10/01 15:39</span>
//                   </p>
//                   <p class="detail ell">沙发斯</p>
//                 </div>
//               </li>
//             </ul>

//             <!-- 发表评论 -->
//             <el-form class="form-common form-wrap" ref="form1" :model="form">
//               <el-form-item label="">
//                 <img class="g-pic" src="~@images/default-head.svg" alt="">
//                 <el-input v-model="form1.info" placeholder="Enter快速发布"></el-input>
//                 <el-button class="btn-comment" type="primary">评论</el-button>
//               </el-form-item>
//             </el-form>
//           </el-tab-pane>
//           <el-tab-pane label="变更历史" name="history">
//             <ul class="history-list">
//               <li>
//                 <span class="time m-assist mr-30">5分钟前</span>
//                 <span class="info m-des"><strong class="info-name">胡强</strong> 完成了任务</span>
//               </li>
//               <li>
//                 <span class="time m-assist mr-30">2019/2/19 11:08</span>
//                 <span class="info m-des"><strong class="info-name">胡强</strong> 重新打开任务</span>
//               </li>
//               <li>
//                 <span class="time m-assist mr-30">5分钟前</span>
//                 <span class="info m-des"><strong class="info-name">胡强</strong> 重新打开任务</span>
//               </li>
//             </ul>
//           </el-tab-pane>
//         </el-tabs>
//       </div>

//     </el-dialog>
//   </div>
// </template>

// <script>
// export default {
//   props: {
//     dialogData: {
//       type: Object,
//       default() {
//         return {}
//       }
//     }
//   },
//   data() {
//     return {
//       dialogShow: false,
//       form: {
//         date1: '',
//         name: '',
//         desc: '',
//       },
//       form1: {
//         info: ''
//       },
//       activeName: 'comments'
//     }
//   },
//   methods: {
//     initDialogData() {
//       this.dialogShow = true;
//     },
//     handleClick(tab, event) {
//       console.log(tab, event);
//     }
//   }
// }
// </script>

// <style lang="scss" scoped>
// .cmp-dialog-pro {
//   .content {
//     max-height: 730px;
//     padding: 0 10px;
//     overflow-y: auto
//   }
//   .icon-dele {
//     position: absolute;
//     top: 20px;
//     right: 50px;
//     cursor: pointer;
//   }
//   .title {
//     position: absolute;
//     top: 20px;
//   }
//   .form-wrap {
//     /deep/ .el-form-item__content {
//       padding-left: 60px;
//     }
//     /deep/ .el-form-item__label {
//       line-height: 40px;
//     }
//     .el-form-item {
//       margin-top: 30px;
//       line-height: 24px;
//     }
//     .el-textarea {
//       width: auto;
//     }
//   }

//   .form-content {
//     // 截止时间
//     .btn-date {
//       width: 150px;
//       /deep/ .el-input__inner {
//         padding-left: 0;
//         border: none;
//         cursor: pointer;
//       } 
//       /deep/ .el-input__prefix {
//         display: none;
//       }
//       /deep/ .el-input__suffix {
//         right: 50px;
//       }
//     }

//     // 子任务
//     .sub-pro {
//       padding: 20px;
//       border-radius:4px;
//       border:1px solid rgba(235,237,242,1);
//       .sub-pro-list {
//         li {
//           margin-bottom: 15px;
//           .el-checkbox {
//             margin-right: 0;
//           }
//           .g-pic {
//             width: 32px;
//             height: 32px;
//           }
//           .el-icon-close {
//             margin-left: 25px;
//             color: $danger;
//             cursor: pointer;
//           }
//         }
//       }
//       .sub-pro-form {
//         .top {
//           position: relative;
//           padding-left: 45px;
//           img {
//             width: 32px;
//             height: 32px;
//             position: absolute;
//             left: 0;
//             top: 5px;
//           }
//         }
//       }
//     }
//   }

//   .tabs {
//     ul.comment-list {
//       padding-left: 20px;
//       li {
//         display: flex;
//         justify-content: space-around;
//         align-items: center;
//         margin-top: 30px;
//         img {
//           width: 40px;
//           height: 40px;
//           margin-right: 10px;
//         }
//         .comment-box {
//           color: $color5;
//           .name {
//             font-size:12px;
//           }
//           .detail {
//             width: 760px;
//             margin-top: 10px;
//             font-size:14px;
//           }
//         }
//       }
//     }
//     ul.history-list {
//       li {
//         margin-top: 30px;
//         .time {
//           display: inline-block;
//           width: 115px;
//           text-align: right;
//         }
//         .info {
//           position: relative;
//           padding-left: 30px;
//           .info-name {
//             font-size: 14px;
//             color: $primary;
//             margin-right: 5px;
//           }
//           &:before {
//             display: inline-block;
//             content: '';
//             width: 1px;
//             height: 50px;
//             background-color: $border;
//             position: absolute;
//             left: 0;
//             top: 4px;
//           }
//         }
//       }
//     }
//     .form-common {
//       /deep/ .el-form-item__content {
//         margin-top: 10px;
//         position: relative;
//         padding-left: 50px;
//         padding-right: 160px;
//         .g-pic {
//           position: absolute;
//           left: 0;
//           top: 0;
//         }
//         .btn-comment {
//           position: absolute;
//           right: 20px;
//           top: 0;
//         }
//       }
//     }
//   }

//   // 重写tab样式
//   /deep/ .el-tabs__header {
//     margin: 0;
//   }
//   /deep/ .el-tabs__nav-wrap {
//     padding-left: 30px;
//   }
//   /deep/ .el-tabs__nav-wrap::after {
//     height: 1px;
//     background-color: $border;
//   }
//   /deep/ .el-tabs__active-bar {
//     display: none;
//   }
//   /deep/ .el-tabs__item.is-active:after {
//     display: block;
//     content: '';
//     position: absolute;
//     width: 28px;
//     height: 2px;
//     background-color: #0590FF;
//     left: 50%;
//     bottom: 0;
//     margin-left: -14px;
//   }

//   /deep/ .el-tabs--top .el-tabs__item.is-top:nth-child(2):after, 
//   /deep/ .el-tabs--top .el-tabs__item.is-bottom:nth-child(2):after, 
//   /deep/ .el-tabs--bottom .el-tabs__item.is-top:nth-child(2):after, 
//   /deep/ .el-tabs--bottom .el-tabs__item.is-bottom:nth-child(2):after {
//     margin-left: -24px;
//   }

//   /deep/ .el-tabs--top .el-tabs__item.is-top:last-child:after, 
//   /deep/ .el-tabs--top .el-tabs__item.is-bottom:last-child:after, 
//   /deep/ .el-tabs--bottom .el-tabs__item.is-top:last-child:after, 
//   /deep/ .el-tabs--bottom .el-tabs__item.is-bottom:last-child:after {
//     margin-left: -4px;
//   }
// }
// </style>


