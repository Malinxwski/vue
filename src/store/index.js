
import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import info from './information'
import category from './category'
import record from './record'


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        error: null
    },
    mutations: {
        setError(state, error) {
            state.error = error
        },
        clearError(state) {
            state.error = null
        }
    },
    actions:{
        async fetchCurrency(){
            const key = process.env.VUE_APP_CURR

            const res = await fetch(`https://currate.ru/api/?get=rates&pairs=EURBYN,EURUSD&key=${key}`)
            return  await res.json()
        },
    },
    getters: {
        error: s => s.error
    },
    modules: {
        auth, info, category, record
    }
})