<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card shadow my-auto">
                    <div class="card-body">
                        <table class="table table-borderless">
                            <thead>
                            <tr>
                                <th></th>
                                <th class="text-center" scope="col">
                                    <p class="text-muted text-uppercase font-weight-bold small">
                                        User

                                        <a href="#" v-tooltip="{ placement: 'bottom' }" class="text-decoration-none" title="A user is the owner of the file">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="17" class="icon-information"><path class="primary" d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20z"/><path style="fill:white" d="M11 12a1 1 0 0 1 0-2h2a1 1 0 0 1 .96 1.27L12.33 17H13a1 1 0 0 1 0 2h-2a1 1 0 0 1-.96-1.27L11.67 12H11zm2-4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/></svg>
                                        </a>
                                    </p>
                                </th>
                                <th class="text-center" scope="col">
                                    <p class="text-muted text-uppercase font-weight-bold small">
                                        Group

                                        <a href="#" v-tooltip="{ placement: 'bottom' }" class="text-decoration-none" title="A user-group can contain multiple users">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="17" class="icon-information"><path class="primary" d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20z"/><path style="fill:white" d="M11 12a1 1 0 0 1 0-2h2a1 1 0 0 1 .96 1.27L12.33 17H13a1 1 0 0 1 0 2h-2a1 1 0 0 1-.96-1.27L11.67 12H11zm2-4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/></svg>
                                        </a>
                                    </p>
                                </th>
                                <th class="text-center" scope="col">
                                    <p class="text-muted text-uppercase font-weight-bold small">
                                        Other
                                        <a href="#" v-tooltip="{ placement: 'bottom' }" class="text-decoration-none" title="Any other user who has access to a file">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="17" class="icon-information"><path class="primary" d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20z"/><path style="fill:white" d="M11 12a1 1 0 0 1 0-2h2a1 1 0 0 1 .96 1.27L12.33 17H13a1 1 0 0 1 0 2h-2a1 1 0 0 1-.96-1.27L11.67 12H11zm2-4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/></svg>
                                        </a>
                                    </p>
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <th scope="row">Read</th>
                                <td class="text-center">
                                    <input class="form-check-input position-relative ml-0" type="checkbox" value="" id="">
                                </td>
                                <td class="text-center">
                                    <input class="form-check-input position-relative ml-0" type="checkbox" value="" id="">
                                </td>
                                <td class="text-center">
                                    <input class="form-check-input position-relative ml-0" type="checkbox" value="" id="">
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">Write</th>
                                <td class="text-center">
                                    <input class="form-check-input position-relative ml-0" type="checkbox" value="" id="">
                                </td>
                                <td class="text-center">
                                    <input class="form-check-input position-relative ml-0" type="checkbox" value="" id="">
                                </td>
                                <td class="text-center">
                                    <input class="form-check-input position-relative ml-0" type="checkbox" value="" id="">
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">Execute</th>
                                <td class="text-center">
                                    <input class="form-check-input position-relative ml-0" type="checkbox" value="" id="">
                                </td>
                                <td class="text-center">
                                    <input class="form-check-input position-relative ml-0" type="checkbox" value="" id="">
                                </td>
                                <td class="text-center">
                                    <input class="form-check-input position-relative ml-0" type="checkbox" value="" id="">
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Tooltip from '../directives/Tooltip';

    export default {
        name: 'bit-calculator',

        directives: {
            Tooltip
        },

        mounted() {
            console.log('Calculator mounted.')
        }
    }
</script>
