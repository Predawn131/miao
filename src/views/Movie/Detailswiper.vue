<template>
    <div class="swiper-container filmswiper">
        <div class="swiper-wrapper">
                <slot></slot>
        </div>
    <!-- 如果需要分页器 -->
        <div class="swiper-pagination film-swiper-pagination" ></div>

    </div>
</template>
<script>

import Swiper from 'swiper/dist/js/swiper.js'
import 'swiper/dist/css/swiper.css'
export default {
  props: ['perview', 'myclassname'],
  mounted () {
    new Swiper('.' + this.myclassname, {
      // direction: 'vertical'
      slidesPerView: this.perview,
      spaceBetween: this.myclassname === 'actorswiper' ? 30 : 10,
      freeMode: true
      // 如果需要分页器

    })
  }
}
</script>

<style lang="scss" scoped>
.swiper-wrapper{
    img{
        width: 100%;
    }
}

</style>
