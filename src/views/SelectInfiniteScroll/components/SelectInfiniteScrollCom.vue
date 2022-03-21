<template>
  <div
    class="scroll-wrapper">
    <el-select
      v-model="value"
      v-loadData="loadData"
      remote
      filterable
      :remote-method="searchMethod"
      :popper-class="`more-select-dropdown ${loading && 'loading'}`"
      :multiple="multiple"
      :clearable="clearable"
      @clear="handleClear"
      @change="selectChange">
      <el-option
        v-for="(item,index) in list"
        v-show="item.isShow===false?false:true"
        :key="item.value + `'${index}'`"
        :label="item.label"
        :value="item.value" />
    </el-select>
  </div>
</template>
<script>
import Vue from 'vue'
Vue.directive(
  'loadData',
  {
    bind (el, binding) {
      // 获取 element-ui 定义好的 scroll 盒子
      const SELECTWRAP_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap')
      SELECTWRAP_DOM.addEventListener('scroll', function () {
        /**
        * scrollHeight 获取元素内容高度(只读)
        * scrollTop 获取或者设置元素的偏移值,常用于, 计算滚动条的位置, 当一个元素的容器没有产生垂直方向的滚动条, 那它的scrollTop的值默认为0.
        * clientHeight 读取元素的可见高度(只读)
        * 如果元素滚动到底, 下面等式返回true, 没有则返回false:
        * ele.scrollHeight - ele.scrollTop === ele.clientHeight;
        */
        const condition = this.scrollHeight - this.scrollTop <= this.clientHeight
        // 监听下拉框是否滚动到底部，滚动到底部就加载下一页数据
        if (condition) binding.value()
      })
    }
  }
)
export default {
  name: 'SelectInfiniteScrollCom',

  props: {
    // 默认选中值
    selectedValue: {
      type: [Array, String, Number],
      default: ''
    },
    // 默认选中值对应的数据，用于回显
    defaultSelectedStr: {
      type: Array,
      default: () => ([])
    },
    // 是否可以多选
    multiple: {
      type: Boolean,
      default: false
    },
    // 是否可以清空
    clearable: {
      type: Boolean,
      default: false
    },
    // 远程搜索时，输入框搜索值的键名
    searchKey: {
      type: String,
      default: 'searchKey'
    },
    // 获取下拉框值得方法名
    getListMethods: {
      type: Function,
      default: null
    },
    // 获取下拉框值时 默认参数
    getListParams: {
      type: Object,
      default: () => ({})
    },
    // 下拉框值的格式
    getListFormat: {
      type: Function,
      default: (data) => {
        return data.map(({ label, value }) => ({ label, value }))
      }
    }
  },

  data () {
    return {
      value: '',
      list: [],
      activeValue: '',
      searchText: '',
      page: 1,
      num: 10,
      loading: false,
      finished: false // 是否加载完所有数据
    }
  },

  watch: {
    selectedValue (val) {
      this.value = val
      this.list = []
      this.getData()
    },
    // 默认选中值
    defaultSelected: {
      handler () {
        this.activeValue = this.defaultSelected
      },
      immediate: true
    },
    // 将选中的数据 拼成数组，放在 list 中，用于解决回显时 非第一页数据无法正常显示的问题
    defaultSelectedStr: {
      handler () {
        this.list = this.list.concat(this.defaultSelectedStr)
      },
      immediate: true
    }
  },

  mounted () {
    this.getData()
  },

  methods: {
    handleClear () {
      this.searchMethod('')
    },
    getData () {
      if (this.finished) return
      this.loading = true
      const params = {
        ...this.getListParams,
        [this.searchKey]: this.searchText,
        page: this.page,
        num: this.num
      }

      // 使用父组件已封装好的请求
      this.getListMethods(params).then(res => {
        if (res.status === 200) {
          if (res.data.newslist && res.data.newslist.length > 0) {
            const data = this.getListFormat(res.data.newslist)
            if (data.length < this.num) this.finished = true
            this.list = this.list.concat(data)
          }
        }
      })

      // this.$http
      //   .get('http://api.tianapi.com/topnews/index', {
      //     params
      //   })
      //   .then(res => {
      //     if (res.status === 200) {
      //       if (res.data.newslist && res.data.newslist.length > 0) {
      //         // 对数据进行格式化（在父组件中定义）
      //         const data = this.getListFormat(res.data.newslist)
      //         // 判断是否是最后一页了
      //         if (data.length < this.num) this.finished = true
      //         this.list = this.list.concat(data)
      //       }
      //     }
      //   })
    },
    searchMethod (searchText) {
      if (searchText === this.searchText) return
      // 防抖处理
      let timeout = null
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        this.list = []
        this.page = 1
        this.finished = false
        this.searchText = searchText
        this.getData()
      }, 500)
    },
    loadData () {
      // 防抖处理
      let timeout = null
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        if (this.finished) return
        this.page += 1
        this.getData()
      }, 500)
    },
    reset () {
      this.searchText = ''
      this.getData()
    },
    selectChange (value) {
      this.$emit('selectedChange', value)
    }
  }
}
</script>

<style lang="scss" scoped>
.scroll-wrapper {
  width: 400px;
  height: 200px;
  overflow: auto;
  margin: 0 auto;
  text-align: left;
}
</style>
