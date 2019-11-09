<template>
    <div v-cloak>
        <bit-calculator></bit-calculator>
        <command-component :octal="absoluteNotation"></command-component>
    </div>
</template>

<script>
    import BitCalculator from "../components/BitCalculator";
    import CommandComponent from "../components/CommandComponent";

    export default {
        name: 'app',

        components: {
            BitCalculator,
            CommandComponent
        },

        data() {
            return {
                absoluteNotation: 'whatevs'
            }
        },

        computed: {
            //
        }
    }
</script>

<style scoped>

</style>
