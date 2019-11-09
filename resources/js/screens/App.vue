<template>
    <div v-cloak>
        <bit-calculator></bit-calculator>
    </div>
</template>

<script>
    import BitCalculator from "../components/BitCalculator";

    export default {
        name: 'app',

        components: {
            BitCalculator,
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
