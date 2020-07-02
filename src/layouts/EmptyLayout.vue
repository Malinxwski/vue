<template>

    <div class="background-image empty-layout">

        <router-view/>
    </div>




</template>

<script>

    import messages from '../utils/messages'

    export default {
        computed: {
            error() {
                return this.$store.getters.error
            }
        },

        watch: {
            error(fbError) {
                this.$error(messages[fbError.code] || 'Что-то пошло не так')
            }
        }
    }
</script>
<style lang="css" scoped>
    .background-image{

        height: 100vh;
        background-image: url("../assets/images/login.jpg");
        background-size: cover;
        margin: 0;

    }
</style>

