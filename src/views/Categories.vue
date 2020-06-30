<template>
    <div>
        <div class="page-title">
            <h3>Категории</h3>
        </div>

        <section >
            <Loader v-if="loading"></Loader>
            <div class="row" v-else>
               <CategoryCreate @createdCategory="addNewCategory"/>
                <CategoryUpdate
                :categories="categories"
                />
            </div>
        </section>
    </div>

</template>
<script>
    import CategoryCreate from '../components/CategoryCreate'
    import CategoryUpdate from '../components/CategoryUpdate'
    export default {
        name:'categories',
        data:()=> ({
            categories: [],
            loading: true
        }),
         async mounted() {
             this.categories = await this.$store.dispatch('fetchCategories')
             this.loading =  false
        },
        methods:{
            addNewCategory(category){
                this.categories.push(category)
            }
        },
        components:{
            CategoryCreate, CategoryUpdate
        }
    }
</script>