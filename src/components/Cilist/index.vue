<template>
  <div class="cinema_body">
		<Loading v-if="isLoading" />
    <ul>
      <li v-for="data in cinemalist" :key="data.cinemaId">
        <div>
          <span class="nm">{{data.name}}</span>
          <span class="q" v-if="data.sellPrice!=''"><span class="price">{{data.lowPrice/100}}</span> 元起</span>
        </div>
        <div class="address">
          <span>{{data.address}}</span>
          <!-- <span>{{data.distance}}</span> -->
        </div>
        
      </li>
      
      
      
    </ul>
  </div>
</template>
<script>
export default {
    name:'Cilist',
    data() {
      return {
        cinemalist:[],
        isLoading : true,
        prevCityId : -1
      }
    },
    activated() {
      var cId = this.$store.state.city.cityId;
        if( this.prevCityId === cId ){ return; }
        // console.log(123)
        this.isLoading = true;
      this.axios({
      url: 'https://m.maizuo.com/gateway?cityId='+ cId +'&ticketFlag=1&k=4023099',
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1613968414272562919571457"}',
        'X-Host': 'mall.film-ticket.cinema.list'
      }
    }).then((res)=>{
        console.log(res)
        var msg = res.data.msg
        if (msg === 'ok') {
          this.cinemalist = res.data.data.cinemas
			  this.isLoading = false;
        this.prevCityId = cId;
        }
      })
    },
};
</script>
<style lang="scss" scoped>
#content .cinema_body {
  flex: 1;
  overflow: auto;
}
.cinema_body ul {
  padding: 20px;
}
.cinema_body li {
  border-bottom: 1px solid #e6e6e6;
  margin-bottom: 20px;
}
.cinema_body div {
  margin-bottom: 10px;
  
}
.cinema_body .q {
  font-size: 11px;
  color: #f03d37;
  float: right;
  margin-top: -10px;
}
.cinema_body .price {
  font-size: 18px;
}
.nm{
  display: block;
  width: 200px;
  overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.cinema_body .address {
  font-size: 13px;
  color: #666;
  width: 200px;
  overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.cinema_body .address span:nth-of-type(2) {
  float: right;
}
.cinema_body .card {
  display: flex;
}
.cinema_body .card div {
  padding: 0 3px;
  height: 15px;
  line-height: 15px;
  border-radius: 2px;
  color: #f90;
  border: 1px solid #f90;
  font-size: 13px;
  margin-right: 5px;
  overflow: hidden;
  flex-shrink: 0;
}
.cinema_body .card div.or {
  color: #f90;
  border: 1px solid #f90;
}
.cinema_body .card div.bl {
  color: #589daf;
  border: 1px solid #589daf;
}
</style>