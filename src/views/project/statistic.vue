<template>
  <div class="page-statistic">
    <el-card class="header-card">
      <el-row>
        <el-col class="card-box" :span="3" v-for="(item, index) in headerList" :key="index">
          <div class="header-card-item">{{item.count}}</div>
          <p>{{item.name}}</p>
        </el-col>
      </el-row>
    </el-card>

    <el-row :gutter="20" class="content">
      <el-col :span="12">
        <el-card class="content-item">
          <!-- <h2>总体任务完成情况</h2> -->
          <div class="graph">
            <chart ref="chart1" :options="orgOptions1" :auto-resize="true"></chart>
          </div>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card class="content-item">
          <!-- <h2>总体任务完成情况</h2> -->
          <div class="graph">
            <chart ref="chart2" :options="orgOptions2" :auto-resize="true"></chart>
          </div>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card class="content-item">
          <!-- <h2>每日完成任务量</h2> -->
          <div class="graph">
            <chart ref="chart2" :options="orgOptions3" :auto-resize="true"></chart>
          </div>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card class="content-item">
          <!-- <h2>任务完成排行</h2> -->
          <div class="graph">
            <chart ref="chart2" :options="orgOptions4" :auto-resize="true"></chart>
          </div>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card class="content-item">
          <!-- <h2>任务执行者分布</h2> -->
          <div class="graph">
            <chart ref="chart2" :options="orgOptions5" :auto-resize="true"></chart>
          </div>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card class="content-item">
          <!-- <h2>成员任务完成情况</h2> -->
          <div class="graph">
            <chart ref="chart2" :options="orgOptions6" :auto-resize="true"></chart>
          </div>
        </el-card>
      </el-col>
    </el-row>
    
    <cmp-footer></cmp-footer>
  </div>
</template>

<script>
import cmpFooter from '@cmp/footer'
import chart from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/title' //引入标题组件
import 'echarts/lib/component/legend' //引入图例组件
import 'echarts/lib/component/tooltip' //引入图例组件
import 'echarts/lib/chart/bar'
export default {
  components: {
    cmpFooter,
    chart
  },
  data() {
    return {
      headerList: [
        {
          name: '全部任务',
          count: 21
        },
        {
          name: '已完成',
          count: 22
        },
        {
          name: '未完成',
          count: 22
        },
        {
          name: '已逾期',
          count: 22
        },
        {
          name: '待认领',
          count: 22
        },
        {
          name: '按时完成',
          count: 22
        },
        {
          name: '今日到期',
          count: 22
        },
        {
          name: '逾期完成',
          count: 22
        },
      ],
      orgOptions1: {},
      orgOptions2: {},
      orgOptions3: {},
      orgOptions4: {},
      orgOptions5: {},
      orgOptions6: {},
    }
  },
  mounted() {
    this.orgOptions1 = {
      title: {
        text: '总体任务完成情况',
        textStyle: {
          fontSize: 18,
          color: '#575962',
          // fontWeight: 'normal'
        }
        
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        x: 'left',
        top: 30,
        data:['已完成', '未完成']
      },
      series: [
        {
          name:'完成情况',
          type:'pie',
          radius: ['30%', '70%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '16',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data:[
            {value:335, name:'已完成'},
            {value:310, name:'未完成'}
          ],
          color:['#50E3C2', '#0590FF']
        },
      ]
    }

    this.orgOptions2 = {
      title: {
        text: '任务燃尽图',
        textStyle: {
          fontSize: 18,
          color: '#575962'
        }
      },
      tooltip : {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        data:['待处理','已延误','已完成']
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis : [
        {
          type : 'category',
          boundaryGap : false,
          data : ['周一','周二','周三','周四','周五','周六','周日']
        }
      ],
      yAxis : [
        {
          type : 'value'
        }
      ],
      series : [
        {
          name:'待处理',
          type:'line',
          stack: '总量',
          areaStyle: {},
          data:[120, 132, 101, 134, 90, 230, 210]
        },
        {
          name:'已延误',
          type:'line',
          stack: '总量',
          areaStyle: {},
          data:[220, 182, 191, 234, 290, 330, 310]
        },
        {
          name:'已完成',
          type:'line',
          stack: '总量',
          areaStyle: {},
          data:[150, 232, 201, 154, 190, 330, 410]
        }
      ],
      color:['#0590FF', '#F25151', '#50E3C2']
    }

    this.orgOptions3 = {
      title: {
        text: '每日完成任务量',
        textStyle: {
          fontSize: 18,
          color: '#575962'
        }
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        // smooth: true
      }],
      color:['#0590FF']
    }
    
    
    this.orgOptions4 = {
      title: {
        text: '任务完成排行',
        textStyle: {
          fontSize: 18,
          color: '#575962'
        }
      },
      tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
          type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        data:['待认领']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis : [
        {
          type : 'category',
          data : ['周一','周二','周三','周四','周五','周六','周日']
        }
      ],
      yAxis : [
        {
          type : 'value'
        }
      ],
      series : [
        {
          name:'待认领',
          type:'bar',
          stack: '广告',
          data:[120, 132, 101, 134, 90, 230, 210]
        }
      ],
      color: ['#0590FF']
    }

    this.orgOptions5 = {
      title: {
        text: '任务执行者分布',
        textStyle: {
          fontSize: 18,
          color: '#575962'
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        x: 'left',
        top: 30,
        data:['已完成', '未完成']
      },
      series: [
        {
          name:'访问来源',
          type:'pie',
          radius: ['30%', '70%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '30',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data:[
            {value:335, name:'已完成'},
            {value:310, name:'未完成'}
          ],
          color:['#50E3C2', '#0590FF']
        },
      ]
    }

    this.orgOptions6 = {
      title: {
        text: '成员任务完成情况',
        textStyle: {
          fontSize: 18,
          color: '#575962'
        }
      },
      tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
          type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        data:['已完成', '未完成']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis : [
        {
          type : 'category',
          data : ['周一','周二','周三','周四','周五','周六','周日']
        }
      ],
      yAxis : [
        {
          type : 'value'
        }
      ],
      series : [
        {
          name:'已完成',
          type:'bar',
          stack: '广告',
          data:[120, 132, 101, 134, 90, 230, 210]
        },
        {
          name:'未完成',
          type:'bar',
          stack: '广告',
          data:[220, 182, 191, 234, 290, 330, 310]
        }
      ],
      color:['#50E3C2', '#0590FF']
    }
  }
}
</script>

<style lang="scss" scoped>
.page-statistic {
  padding: 10px 30px;
  width: 1380px;
  margin: 0 auto;
  .header-card {
    margin: 20px 0;
    text-align: center;
    .header-card-item {
      font-size: 32px;
      color: $color5;
    }
    .card-box:nth-child(1) .header-card-item {
      color: $primary;
    }
    .card-box:nth-child(2) .header-card-item {
      color: $info;
    }
    .card-box:nth-child(3) .header-card-item {
      color: $danger;
    }
  }
  .content {
    .content-item {
      margin-bottom: 20px;
      .graph {
        height: 300px;
        .echarts {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  /deep/ .el-card__body {
    padding: 20px;
  }
}
</style>



