<template>
  <div >
    <div class="page-title">
      <h3>Счет</h3>

      <button class="btn waves-effect waves-light btn-small"
              @click="reload"
      >
        <i class="material-icons">refresh</i>
      </button>
    </div>
    <Loader v-if="loading"></Loader>
    <div class="row" v-else>

      <HomeBill
              :rates="currency"

      />
      <HomeCurrency
              :rates="currency"

      />

    </div>
  </div>
</template>

<script>
    import HomeBill from '../components/HomeBill'
    import HomeCurrency from '../components/HomeCurrency'

    export default {
        name: 'Home',
        metaInfo:{
          title: 'Главная'
        },
        data:()=>({
            loading: true,
            currency: null,
            currencies:['EUR','USD','RUB']
        }),
        methods:{
           async reload(){
               this.loading = true
               const rates = await this.$store.dispatch('fetchCurrency')
               this.curFilter(rates)
               this.loading = false
            },
            curFilter(rates){

                this.currency = rates.filter(cur =>
                    cur.Cur_Abbreviation === 'USD'
                    || cur.Cur_Abbreviation === 'EUR'
                    || cur.Cur_Abbreviation === 'RUB'
                )

            }
        },
        async mounted() {
           const rates =  await this.$store.dispatch('fetchCurrency')
            this.curFilter(rates)
            this.loading = false





        },

        components:{
            HomeBill, HomeCurrency
        }

    }
</script>
