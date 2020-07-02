<template>
    <div>
        <Loader v-if="loading"/>
        <div v-else>
            <div class="breadcrumb-wrap">
                <router-link :to="'/history'" class="breadcrumb">История</router-link>

                <a class="breadcrumb">
                    {{record.typeText}}
                </a>
            </div>
            <div class="row">
                <div class="col s12 m6">
                    <div class="card " :class="record.typeColor">
                        <div class="card-content white-text">
                            <p>Описание: {{record.description}}</p>
                            <p>Сумма: {{record.amount | currency}}</p>
                            <p>Категория: {{category.title}}</p>

                            <small>{{record.date | date('date')}}</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name:'detail',
        metaInfo:{
            title: 'Детали'
        },
        data:()=>({
            record:null,
            loading: true
        }),
        async mounted(){
            const id = this.$route.params.id
            const record = await this.$store.dispatch('fetchRecordById', id)
            this.record = {

                ...record,
                typeText: record.type === 'income'?'Доход': 'Расход',
                typeColor: record.type === 'income'? 'green': 'red',
            }


            const category = await this.$store.dispatch('fetchCategoryById', record.categoryId)
            this.category = {
                ...category
            }



            this.loading = false
        }
    }
</script>