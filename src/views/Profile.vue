<template>
    <div>
        <div class="page-title">
            <h3>Профиль</h3>
        </div>

        <form class="form">
            <div class="input-field">
                <input
                        id="description"
                        type="text"
                >
                <label for="description">Имя</label>
                <span
                        class="helper-text invalid">name</span>
            </div>

            <Dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"/>

            <button class="btn waves-effect waves-light" type="submit">
                Обновить
                <i class="material-icons right">send</i>
            </button>
        </form>
    </div>
</template>
<style lang="css">
    #dropzone{
        margin-bottom: 2rem;
    };
</style>
<script>
    import Dropzone from 'vue2-dropzone'

    export default {
        name: 'profile',
        data:() => ({
            dropzoneOptions: {
                url: 'https://httpbin.org/post',
                thumbnailWidth: 150,
                maxFilesize: 0.5,
                headers: { "My-Awesome-Header": "header value" }
            }
        }),
        components: {
            Dropzone
        }
    }


</script>