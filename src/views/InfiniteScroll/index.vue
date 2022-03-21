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
  }
}
</script>
