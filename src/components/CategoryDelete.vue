<template>
    <div class="row">
        <div class="col s12 m6">
            <div>
                <div class="page-subtitle">
                    <h4>Удалить</h4>
                </div>

                <form @submit.prevent="submitHandler">
                    <div class="input-field" >
                        <select ref="select" v-model="current">
                            <option
                                    v-for="c of categories"
                                    :key="c.id"
                                    :value="c.id"
                            >{{c.title}}</option>
                        </select>
                        <label>Выберите категорию</label>
                    </div>



                    <button class="btn waves-effect waves-light red" type="submit">
                        Удалить
                        <i class="material-icons right">send</i>
                    </button>
                </form>
            </div>
        </div>
    </div>

</template>

<script>

    export default {
        props: {
            categories: {
                type: Array,
                required: true
            }
        },
        data: () => ({
            select: null,
            title: '',
            limit: 100,
            current: null
        }),

        watch: {
            current(catId) {
                const {title} = this.categories.find(c => c.id === catId)
                this.title = title

            }
        },
        created() {
            const {id, title} = this.categories[0]
            this.current = id
            this.title = title

        },
        methods: {
            async submitHandler() {

                try {
                    const categoryData = {
                        id: this.current,

                    }
                    await this.$store.dispatch('deleteCategory', categoryData)
                    this.$message('Категория удалена')
                    this.$emit('deleted', categoryData)
                } catch (e) {}
            }
        },
        mounted() {
            this.select = M.FormSelect.init(this.$refs.select)
            M.updateTextFields()
        },
        destroyed() {
            if (this.select && this.select.destroy) {
                this.select.destroy()
            }
        }
    }
</script>
