<template>
    <div>
        <div class="page-title">
            <h3>Новая запись</h3>
        </div>
        <Loader v-if="loading"/>

        <p class="center" v-else-if="!categories.length">Категории отсутствуют. <router-link to="/categories">Добавить новую категорию</router-link> </p>

        <form class="form" v-else @submit.prevent="submitHandler">
            <div class="input-field" >
                <select ref="select" v-model="current"

                >
                    <option
                            v-for="c of categories"
                            :key="c.id"
                            :value="c.id"
                    >{{c.title}}</option>
                </select>
                <label>Выберите категорию</label>
            </div>

            <p>
                <label>
                    <input
                            class="with-gap"
                            name="type"
                            type="radio"
                            value="income"
                            v-model="type"
                    />
                    <span>Доход</span>
                </label>
            </p>

            <p>
                <label>
                    <input
                            class="with-gap"
                            name="type"
                            type="radio"
                            value="outcome"
                            v-model="type"
                    />
                    <span>Расход</span>
                </label>
            </p>



            <div class="input-field">
                <input
                        id="amount"
                        type="number"
                        v-model.number="amount"
                        :class="{invalid: $v.amount.$dirty && !$v.amount.minValue}"
                >
                <label for="amount">Сумма</label>
                <span
                        v-if="$v.amount.$dirty && !$v.amount.minValue"
                        class="helper-text ">Сумма должна быть не менее {{$v.amount.$params.minValue.min}} </span>
            </div>

            <div class="input-field">
                <input
                        id="description"
                        type="text"
                        v-model.trim="description"
                        :class="{invalid: $v.description.$dirty && !$v.description.required}"

                >
                <label for="description">Описание</label>
                <span
                        v-if="$v.description.$dirty && !$v.description.required"
                        class="helper-text "></span>
            </div>

            <button class="btn waves-effect waves-light" type="submit">
                Создать
                <i class="material-icons right">send</i>
            </button>
        </form>
    </div>
</template>

<script>
    import {required, minValue} from 'vuelidate/lib/validators'
    import { mapGetters } from 'vuex'

    export default {

        data:()=>({
            categories:[],
            select: null,
            title:'',
            current: null,
            loading:true,
            type: 'outcome',
            amount: 100,
            description: '',
            bill: 0

        }),
        validations:{
            description: {required},
            amount: {minValue: minValue(100)}
        },
        async mounted() {

            this.categories =  await this.$store.dispatch('fetchCategories')
            this.loading = false
            if(this.categories.length){
                this.current = this.categories[0].id
            }
            this.$nextTick(()=>{
                this.select = M.FormSelect.init(this.$refs.select)
                M.updateTextFields()
            })


        },
        destroyed() {
            if (this.select && this.select.destroy) {
                this.select.destroy()
            }
        },
        computed:{
            ...mapGetters(['info']),
            canCreateRecord(){
                if(this.type === 'income'){
                    return true
                }

                return this.info.bill > this.amount
            }

        },
        methods:{
            async submitHandler(){
                if (this.$v.$invalid) {
                    this.$v.$touch()
                    return
                }

                if(this.canCreateRecord){
                    try {
                        const formData ={
                            categoryId: this.current,
                            type: this.type,
                            amount: this.amount,
                            description: this.description,
                            date: new Date().toJSON()
                        }
                        await this.$store.dispatch('addRecord', formData)


                        const bill = this.type === 'income'
                            ? this.info.bill + this.amount
                            : this.info.bill - this.amount

                        await this.$store.dispatch('updateInfo', {bill})
                        this.$message('Запись добавлена успешно')
                        this.$v.$reset()
                        this.amount = 100
                        this.description = ''


                    }catch (e) {}
                }else{
                    this.$message(`Недостаточно средств на счете (${this.amount- this.info.bill})`)
                }

            }
        }
    }
</script>