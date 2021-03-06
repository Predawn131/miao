<template>
    <div id="main">
        <Header title="喵喵电影"></Header>
        <div id="content">
			<div class="movie_menu">
				<router-link to="/movie/city" tag="div" class="city_name"> 
					<span>{{ $store.state.city.name }}</span><i class="iconfont icon-down"></i>
				</router-link>
				<div class="hot_swtich">
					<router-link to="/movie/nowplaying" tag="div" class="hot_item">正在热映</router-link>
					<router-link to="/movie/comingsoon" tag="div" class="hot_item">即将上映</router-link>
				</div>
				<router-link to="/movie/search" tag="div" class="search_entry">
					<i class="iconfont icon-sousuo"></i>
				</router-link>
			</div>
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
        <Tabbar></Tabbar>
        <router-view name="detail"></router-view>
    </div>
</template>
<script>
import Header from '@/components/Header'
import Tabbar from '@/components/Tabbar'
import {messageBox} from '@/components/JS'

export default {
    name:'Movie',
    components:{
        Header,
        Tabbar,
        
    },
    mounted() {
        setTimeout(()=>{
            this.axios({
                url:'https://m.maizuo.com/gateway?k=6508120',
                headers:{
                    'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16150007091036066370879489"}',
                    'X-Host': 'mall.film-ticket.city.locate'
                }    
            }).then((res)=>{
                // console.log(window.localStorage.getItem('cityId'))
                var msg = res.data.msg;
                if(msg === 'ok'){

                    var name = res.data.data.city.name;
                    var cityId = res.data.data.city.cityId;
                    console.log(this.$store.state.city.cityId,cityId)
                    if( this.$store.state.city.cityId == cityId ){return;}
                    messageBox({
                        title : '定位',
                        content : name,
                        cancel : '取消',
                        ok : '切换定位',
                        handleOk(){
                            window.localStorage.setItem('nowNm',name);
                            window.localStorage.setItem('nowId',cityId);
                            window.location.reload();
                        }
                    });
                }
            });
        },3000);
    },  
}
</script>
<style lang="scss" scoped>

#content .movie_menu{ width: 100%; height: 45px; border-bottom:1px solid #e6e6e6; display: flex; justify-content:space-between; align-items:center; background:white; z-index:10;}
.movie_menu .city_name{ margin-left: 20px; height:100%; line-height: 45px;}
.movie_menu .city_name.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .hot_swtich{ display: flex; height:100%; line-height: 45px;}
.movie_menu .hot_item{ font-size: 15px; color:#666; width:80px; text-align:center; margin:0 12px; font-weight:700;}
.movie_menu .hot_item.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .search_entry{ margin-right:20px; height:100%; line-height: 45px;}
.movie_menu .search_entry.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .search_entry i{  font-size:24px; color:red;}

</style>