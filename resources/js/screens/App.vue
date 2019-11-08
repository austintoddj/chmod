<template>
    <div v-cloak>
        <bit-calculator></bit-calculator>
        <result-notation :permissions="permissions"></result-notation>
    </div>
</template>

<script>
    import BitCalculator from "../components/BitCalculator";
    import ResultNotation from "../components/ResultNotation";

    export default {
        name: 'app',

        components: {
            BitCalculator,
            ResultNotation
        },

        data() {
            return {
                permissions: 'whatever'
            }
        },

        computed: {
            //
        }
    }
</script>

<style scoped>

</style>
