<script>
export default {
  props: {   //通过props接收父组件传值
    isNotice:{
      name: false,
      default: Boolean
    },
    message: {
      name: '',
      default: String,
    },
  },
  data () {
    return {
      isNotices:false,
    }
  },
  methods: {
    closeNotice(){
      this.$emit('closeNotice',this.isNotices) //点击确定传值给父组件
    }
  }
}

</script>
