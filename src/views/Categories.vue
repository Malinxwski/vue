<template>
    <div>
        <div class="page-title">
            <h3>Категории</h3>
        </div>
        <section>
            <Loader v-if="loading" />
            <div class="row" v-else>
                <CategoryCreate @created="addNewCategory" />

                <CategoryEdit
                        v-if="categories.length"
                        :categories="categories"
                        :key="categories.length + updateCount"
                        @updated="updateCategories"
                />
                <p v-else class="center">Категорий пока нет</p>
            </div>

            <CategoryDelete
                    v-if="categories.length"
                    :categories="categories"
                    :key="categories.length + deleteCount"
                    @deleted="deleteCategories"
            />
        </section>
    </div>
</template>

<script>
    import CategoryCreate from '../components/CategoryCreate'
    import CategoryEdit from '../components/CategoryUpdate'
    import CategoryDelete from "../components/CategoryDelete";

    export default {
        name: 'categories',
        data: () => ({
            categories: [],
            loading: true,
            updateCount: 0,
            deleteCount:10

        }),
        async mounted() {
            this.categories = await this.$store.dispatch('fetchCategories')
            this.loading = false
        },
        components: {
            CategoryCreate, CategoryEdit, CategoryDelete
        },
        methods: {
            addNewCategory(category) {
                this.categories.push(category)
            },
            updateCategories(category) {
                const idx = this.categories.findIndex(c => c.id === category.id)
                this.categories[idx].title = category.title
                this.categories[idx].limit = category.limit
                this.updateCount++
            },
            deleteCategories(categoryData){
                const idx = this.categories.findIndex(c => c.id === categoryData.id)
                this.categories[idx].title = null
                this.categories[idx].limit = null


                this.updateCount++
                this.deleteCount++

                this.select = M.FormSelect.init(this.$refs.select)
                M.updateTextFields()




            }
        }
    }
</script>

