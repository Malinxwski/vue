<template>
    <div class="col s12 m6 l4">
        <div class="card light-blue bill-card">
            <div class="card-content white-text">
                <span class="card-title">Счет в валюте </span>


                <p class="currency-line" v-for="c of rates" :key="rates.Cur_ID">

                    <span>{{(Bill/c.Cur_OfficialRate*c.Cur_Scale).toFixed(4) }} {{c.Cur_Abbreviation}}</span>



                </p>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props:['rates'],
        data:()=>({
            Bill: 0
        }),
        computed:{

        },
        mounted() {
            this.Bill = this.$store.getters.info.bill
            console.log(this.Bill)



        },

    }
</script>