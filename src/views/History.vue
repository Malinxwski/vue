<template>
    <div>
        <div class="page-title ">
            <h3 >История записей</h3>
        </div>

        <div class="history-chart">
            <canvas ref="canvas"></canvas>
        </div>

        <Loader v-if="loading"/>

        <p class="center" v-else-if="!records.length"> Записей пока нет</p>

        <section v-else>
            <HistoryTable   :records="items"/>
            <Paginate
                :page-count="pageCount"
                :click-handler="pageChangeHandler"
                :prev-text="'Назад'"
                :next-text="'Далее'"
                :container-class="'pagination center'"
                :page-class="'waves-effect'"
                v-model="page"

            />
        </section>
    </div>
</template>

<script>
    import paginationMixin from '../mixins/pagination.mixin'
    import HistoryTable from '../components/HistoryTable';
    import {Doughnut} from 'vue-chartjs'

    export default {
        name: 'history',
        metaInfo:{
            title: 'История'
        },
        extends: Doughnut,
        mixins:[
            paginationMixin
        ],
        data:()=>({
            loading:true,
            records:[],


        }),
        async mounted() {
            this.records = await  this.$store.dispatch('fetchRecords')
            const categories = await this.$store.dispatch('fetchCategories')
            this.setup(categories)


            this.loading = false


        },
        methods:{
            setup(categories){
                this.setupPagination(this.records.map(record => {
                    return {
                        ...record,
                        categoryName: categories.find(c => c.id === record.categoryId).title,
                        typeClass: record.type === 'income' ? 'green' : 'red',
                        typeText: record.type === 'income' ? 'Доход' : 'Расход'
                    }
                }))
                this.renderChart({
                    labels: categories.map(c => c.title),
                    datasets: [{
                        label: 'Расходы по категориям',
                        data: categories.map(c => {
                            return this.records.reduce((total, r)=>{
                                if(r.categoryId===c.id && r.type === 'outcome'){
                                    total += +r.amount
                                }
                                return total
                            },0)
                        }),

                        backgroundColor: [
                            'rgba(255, 99, 132, 0.3)',
                            'rgba(54, 162, 235, 0.3)',
                            'rgba(255, 206, 86, 0.3)',
                            'rgba(75, 192, 192, 0.3)',
                            'rgba(153, 102, 255, 0.3)',
                            'rgba(255, 159, 64, 0.3)',

                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },)

            },

        },
        components:{
            HistoryTable
        }
    }
</script>