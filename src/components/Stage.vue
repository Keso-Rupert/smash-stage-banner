<template>
    <h3>{{ stageTitle }}</h3>
    <img :src="stageImageSrc" class="stageImage"/>
</template>

<script>
    export default {
        name: 'Stage',
        props: {
            stageTitle: String,
            stageImageSrc: String
        }
    }
</script>

<style>
    .stageImage{
        max-width: 500px;
    }

</style>