<template>
  <div
    class="scroll-wrapper">
    <ul
      v-infinite-scroll="loadMore"
      v-loading="loading"
      infinite-scroll-distance="50">
      <li
        v-for="(item, index) of list"
        :key="index">
        {{ item.title }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'InfiniteScrollCom',

  data () {
    return {
      totalPage: 100,
      list: [],
      page: 0,
      num: 10,
      total: 0,
      loading: false
    }
  },

  mounted () {
    this.getDataList()
  },

  methods: {
    resetFun () {
      this.page = 1
      this.list = []
      this.getDataList()
    },
    getDataList () {
      this.$http
        .get('http://api.tianapi.com/film/index', {
          params: {
            key: 'e5168944ae4e17730c6b490f897154b2',
            num: this.num,
            page: this.page
          }
        })
        .then(res => {
          if (res.status === 200) {
            // this.totalPage = res.totalPage
            if (res.data.newslist && res.data.newslist.length > 0) {
              const _list = res.data.newslist
              for (let i = 0; i < _list.length; i++) {
                this.list.push(_list[i])
              }
              this.loading = false
            }
          }
        })
    },
    loadMore () {
      this.page += 1
      if (this.page > this.totalPage) {
        return
      }
      this.loading = true
      this.getDataList()
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
