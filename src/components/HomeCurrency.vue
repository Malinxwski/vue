<template>
    <div class="col s12 m6 l8">
        <div class="card orange darken-3 bill-card">
            <div class="card-content white-text">
                <div class="card-header">
                    <span class="card-title">Курс валют</span>
                </div>
                <table>
                    <thead>
                    <tr>
                        <th>Валюта</th>
                        <th>Курс</th>
                        <th>Дата</th>
                    </tr>
                    </thead>

                    <tbody >
                    <tr v-for="c of rates" :key="rates.Cur_ID">
                        <td>{{c.Cur_Scale}} {{c.Cur_Name}}</td>
                        <td>{{c.Cur_OfficialRate}}</td>
                        <td>{{c.Date| date('date')}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props:['rates','date'],
        data:() => ({
            curVal:0

        }),
        computed:{
            base(){
                return this.$store.getters.info.bill
            }
        }

    }
</script>