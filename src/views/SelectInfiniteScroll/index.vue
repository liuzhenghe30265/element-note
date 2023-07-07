<template>
  <div class="home">
    <h1>el-select 无限滚动</h1>
    <scroll-select
      ref="myScrollSelect"
      :selected-value="selectedValue"
      :default-selected-str="defaultSelectedStr"
      :get-list-methods="getListMethods"
      :get-list-format="getListFormat"
      :get-list-params="getListParams"
      clearable
      search-key="word"
      @selectedChange="selectedChange"
    />
  </div>
</template>

<script>
import ScrollSelect from './ScrollSelect.vue'
export default {
  name: 'InfiniteScroll',
  components: {
    ScrollSelect
  },
  data() {
    return {
      getListMethods: this.queryList,
      // 下拉数据格式化
      getListFormat: list => {
        return list.map(item => {
          return {
            label: item.title,
            value: item.title,
            id: item.id
          }
        })
      },
      // 下拉框接口默认参数
      getListParams: {
        key: 'e5168944ae4e17730c6b490f897154b2'
      },
      defaultSelectedStr: [],
      selectedValue: ''
    }
  },
  mounted() {},
  methods: {
    queryList(params) {
      const promise = new Promise((resolve, reject) => {
        this.$http
          .get('http://api.tianapi.com/topnews/index', {
            params
          })
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
      return promise
    },
    selectedChange(val) {
      console.log('........val', val)
    }
  }
}
</script>
