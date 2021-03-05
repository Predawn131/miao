<template>
  <div class="cinema_body">
    <ul>
      <li v-for="data in cinemalist" :key="data.id">
        <div>
          <span>{{data.nm}}</span>
          <span class="q" v-if="data.sellPrice!=''"><span class="price">{{data.sellPrice}}</span> 元起</span>
        </div>
        <div class="address">
          <span>{{data.addr}}</span>
          <span>{{data.distance}}</span>
        </div>
        <div class="card">
          <div v-for="(val,key) in data.tag" v-if="val === 1 && key!='sell'" :key="key"  :class=" key | classCard ">{{key|formatCard}}</div>
          <div v-if="data.tag.vipTag!=''">{{data.tag.vipTag}}</div>
          <div class="bl" v-for="val in data.tag.hallType" v-if="val != ''" :key="val">{{val}}</div>
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
        cinemalist:[]
      }
    },
    mounted() {
      this.axios.get('/ajax/cinemaList?cityId=1109').then((res)=>{
        console.log(res)
        var msg = res.statusText
        if (msg === 'OK') {
          this.cinemalist = res.data.cinemas
        }
      })
    },
    filters:{
      formatCard(key){
        var card = [
          { key : 'allowRefund' , value : '改签' },
          { key : 'endorse' , value : '退' },
          { key : 'snack' , value : '小吃'}
        ]
        for(var i=0;i<card.length;i++){
                if(card[i].key === key){
                    return card[i].value;
                }
            }
            return '';
      },
        classCard(key){
            var card = [
                { key : 'allowRefund' , value : 'bl' },
                { key : 'endorse' , value : 'bl' },
                { key : 'sell' , value : 'or' },
                { key : 'snack' , value : 'or'}
            ];
            for(var i=0;i<card.length;i++){
                if(card[i].key === key){
                    return card[i].value;
                }
            }
            return '';
        }
    }
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
}
.cinema_body .price {
  font-size: 18px;
}
.cinema_body .address {
  font-size: 13px;
  color: #666;
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