<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-8 text-center">
                <pre>
                    <code class="rounded bash">chmod <em>options</em> {{ octal }} <em>filename</em></code>
                </pre>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'command-component',

        props: {
            octal: {
                type: String,
                required: true
            }
        },

        data() {
            return {
                //
            }
        }
    }
</script>

<style scoped>

</style>
