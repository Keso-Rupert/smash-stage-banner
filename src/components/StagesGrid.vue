<template>
    <p>here be a list of stages:</p>
    <Stage stageTitle="Battlefield" stageImageSrc="../assets/images/Battlefield.png" />
    <Stage stageTitle="Final Destination" stageImageSrc="./assets/images/Final_Destination.jpg" />
    <Stage stageTitle="Small Battlefield" stageImageSrc="./assets/images/Small_Battlefield.jpg" />
    <Stage stageTitle="Yoshi's Story" stageImageSrc="./assets/images/Yoshis_Story.png" />
    <Stage stageTitle="Pokemon Stadium 2" stageImageSrc="./assets/images/Pokemon_Stadium_2.png" />
    <Stage stageTitle="Kalos Pokemon League" stageImageSrc="./assets/images/Kalos_Pokemon_League.png" />
    <Stage stageTitle="Smashville" stageImageSrc="./assets/images/Smashville.png" />
    <Stage stageTitle="Town and City" stageImageSrc="./assets/images/Town_and_City.png" />
    <Stage stageTitle="Hollow Bastion" stageImageSrc="./assets/images/Hollow_Bastion.jpg" />
</template>

<script>
    import Stage from './Stage.vue'

    export default {
        name: 'StagesGrid',
        components: {
            Stage,
        }
    }
</script>