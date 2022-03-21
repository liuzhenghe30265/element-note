<template>
  <div
    class="home">
    <h1>
      InfiniteScroll
      无限滚动
    </h1>
    <InfiniteScrollCom />
  </div>
</template>

<script>

import InfiniteScrollCom from './components/InfiniteScrollCom.vue'
export default {
  name: 'InfiniteScroll',
  components: {
    InfiniteScrollCom
  },
  mounted () {

  },
  methods: {
    getData () {
      this.$http
        .get('http://api.tianapi.com/film/index', {
          params: {
            key: 'e5168944ae4e17730c6b490f897154b2',
            num: 10,
            page: 1
          }
        })
        .then(response => {
          console.log(response.data)
        })
    }
  }
}
</script>
