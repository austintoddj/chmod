<template>
    <div class="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <div class="mb-4">
            <p class="text-sm uppercase text-grey-dark flex items-center">Unix Permissions Calculator</p>
            <p class="text-sm my-4">Select the permissions you require below. This tool will provide you with an octal code that corresponds
                to these permissions which can then be applied to relevant directories and files with chmod.
            </p>
            <div class="flex">
                <div>
                    <div class="text-black font-bold text-xl mb-2">User</div>
                    <label class="md:w-2/3 block">
                        <input class="mr-2" type="checkbox">
                        <span class="text-sm">Read</span>
                    </label>
                    <label class="md:w-2/3 block">
                        <input class="mr-2" type="checkbox">
                        <span class="text-sm">Write</span>
                    </label>
                    <label class="md:w-2/3 block">
                        <input class="mr-2" type="checkbox">
                        <span class="text-sm">Execute</span>
                    </label>
                </div>
                <div>
                    <div class="text-black font-bold text-xl mb-2">Group</div>
                    <label class="md:w-2/3 block">
                        <input class="mr-2" type="checkbox">
                        <span class="text-sm">Read</span>
                    </label>
                    <label class="md:w-2/3 block">
                        <input class="mr-2" type="checkbox">
                        <span class="text-sm">Write</span>
                    </label>
                    <label class="md:w-2/3 block">
                        <input class="mr-2" type="checkbox">
                        <span class="text-sm">Execute</span>
                    </label>
                </div>
                <div>
                    <div class="text-black font-bold text-xl mb-2">Other</div>
                    <label class="md:w-2/3 block">
                        <input class="mr-2" type="checkbox">
                        <span class="text-sm">Read</span>
                    </label>
                    <label class="md:w-2/3 block">
                        <input class="mr-2" type="checkbox">
                        <span class="text-sm">Write</span>
                    </label>
                    <label class="md:w-2/3 block">
                        <input class="mr-2" type="checkbox">
                        <span class="text-sm">Execute</span>
                    </label>
                </div>
            </div>
            <div class="flex">
                <p class="py-6">Octal:</p>
            </div>
            <div class="flex">
                <p class="italic">e.g: chmod 767 path_to_file</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>