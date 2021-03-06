<template>
    <div class="movie_body">
		<Loading v-if="isLoading" />
				<ul v-infinite-scroll="loadMore"
                infinite-scroll-disabled="loading"
                infinite-scroll-distance="10"
                infinite-scroll-immediate-check="false">
					
                    <li v-for="data in datalist" :key="data.filmId" @click="handleChangePage(data.filmId)">
                        <div class="pic_show"><img :src="data.poster"></div>
						<div class="info_list">
							<span class="name">{{data.name}} </span>
							<span class="item">{{data.filmType.name}}</span>
							<p>观众评分： <span class="grade">{{data.grade}}</span></p>
							<p v-if="data.actors">主演：{{data.actors | actorfilter}}</p>
                            <p v-else>暂无主演</p>
							<p>{{data.nation}} | {{data.runtime}} 分钟</p>
						</div>
						<div class="btn_mall">
							购票
						</div>
                    </li>
				</ul>
				<div v-show="isShow" class="nomore"></div>
			</div>
</template>
<script>
import Vue from 'vue'
import BScroll from 'better-scroll'
Vue.filter('actorfilter', function (data) {
  var newlist = data.map(item => item.name)
  return newlist.join(' ')
})
export default {
    name:'Nowplaying',
    data() {
        return {
            datalist:[],
            loading: false,
            current: 1,
            total: 0,
            isShow:false,
            isLoading : true,
            prevCityId : -1
        }
    },
    activated() {
		let that = this 
        var cId = this.$store.state.city.cityId;
        if( this.prevCityId === cId ){ return; }
        // console.log(123)
        this.isLoading = true;
        this.axios({
            url: 'https://m.maizuo.com/gateway?cityId='+ cId +'&pageNum=1&pageSize=10&type=1&k=562135',
            headers: {
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1613968414272562919571457","bc":"110100"}',
                'X-Host': 'mall.film-ticket.film.list'
            }
        }).then(res => {
            // console.log(res.data.data.total)
            this.datalist = res.data.data.films
            this.total = res.data.data.total
            this.isLoading = false;
            this.prevCityId = cId;
			
			
        })
    },
    methods: {
		handleChangePage (id) {
            console.log(id)
      // 编程式导航-路径跳转
      // this.$router.push(`/detail/${id}`)

      // 编程式导航-名字跳转
      this.$router.push('/movie/detail/1/' + id);
    },
        loadMore () {
            this.loading = true
            this.current++
			// console.log(this.total)
            if (this.datalist.length === this.total) {
                this.isShow = true
                return ;
            }
            this.axios({
                url: `https://m.maizuo.com/gateway?cityId=310100&pageNum=${this.current}&pageSize=10&type=1&k=562135`,
                headers: {
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1613968414272562919571457","bc":"110100"}',
                'X-Host': 'mall.film-ticket.film.list'
                }
            }).then(res => {
            // console.log(res.data)
				this.datalist = [...this.datalist, ...res.data.data.films]
                
                this.loading = false
				
            })
        }
    },
    
}
</script>
<style lang="scss" scoped>
#content .movie_body{ flex:1; overflow:auto;}
.movie_body ul{ margin:0 12px; overflow: hidden;}
.movie_body ul li{ margin-top:12px; display: flex; align-items:center; border-bottom: 1px #e6e6e6 solid; padding-bottom: 10px;}
.movie_body .pic_show{ width:64px; height: 90px;}
.movie_body .pic_show img{ width:100%;}
.movie_body .info_list { margin-left: 10px; flex:1; position: relative;}
.movie_body .info_list h2{ font-size: 17px; line-height: 24px; width:150px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list p{ font-size: 13px; color:#666; line-height: 22px; width:175px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list .grade{ font-weight: 700; color: #faaf00; font-size: 15px;}
.movie_body .info_list img{ width:210px; position: absolute; right:10px; top: 5px;}
.movie_body .btn_mall , .movie_body .btn_pre{ width:47px; height:27px; line-height: 28px; text-align: center; background-color: #f03d37; color: #fff; border-radius: 4px; font-size: 12px; cursor: pointer;}
.movie_body .btn_pre{ background-color: #3c9fe6;}
.item {
    font-size: 9px;
    color: #fff;
    background-color: #d2d6dc;
    height: 14px;
    line-height: 14px;
    padding: 0 2px;
    border-radius: 2px;
}
.name {
    max-width: calc(100% - 25px);
    color: #191a1b;
    font-size: 16px;
    height: 22px;
    line-height: 22px;
    margin-right: 5px;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>