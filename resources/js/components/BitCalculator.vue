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
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="17" class="icon-information">
                                                <path class="primary" d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20z"/>
                                                <path style="fill:white" d="M11 12a1 1 0 0 1 0-2h2a1 1 0 0 1 .96 1.27L12.33 17H13a1 1 0 0 1 0 2h-2a1 1 0 0 1-.96-1.27L11.67 12H11zm2-4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                                            </svg>
                                        </a>
                                    </p>
                                </th>
                                <th class="text-center" scope="col">
                                    <p class="text-muted text-uppercase font-weight-bold small">
                                        Group

                                        <a href="#" v-tooltip="{ placement: 'bottom' }" class="text-decoration-none" title="A user-group can contain multiple users">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="17" class="icon-information">
                                                <path class="primary" d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20z"/>
                                                <path style="fill:white" d="M11 12a1 1 0 0 1 0-2h2a1 1 0 0 1 .96 1.27L12.33 17H13a1 1 0 0 1 0 2h-2a1 1 0 0 1-.96-1.27L11.67 12H11zm2-4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                                            </svg>
                                        </a>
                                    </p>
                                </th>
                                <th class="text-center" scope="col">
                                    <p class="text-muted text-uppercase font-weight-bold small">
                                        Other
                                        <a href="#" v-tooltip="{ placement: 'bottom' }" class="text-decoration-none" title="Any other user who has access to a file">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="17" class="icon-information">
                                                <path class="primary" d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20z"/>
                                                <path style="fill:white" d="M11 12a1 1 0 0 1 0-2h2a1 1 0 0 1 .96 1.27L12.33 17H13a1 1 0 0 1 0 2h-2a1 1 0 0 1-.96-1.27L11.67 12H11zm2-4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                                            </svg>
                                        </a>
                                    </p>
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <th scope="row">Read</th>
                                <td class="text-center">
                                    <input
                                        id="userRead"
                                        ref="userRead"
                                        v-model="components.user.read"
                                        class="form-check-input position-relative ml-0"
                                        type="checkbox"
                                        aria-label="User read">
                                </td>
                                <td class="text-center">
                                    <input
                                        id="groupRead"
                                        ref="groupRead"
                                        v-model="components.group.read"
                                        class="form-check-input position-relative ml-0"
                                        type="checkbox"
                                        aria-label="Group read">
                                </td>
                                <td class="text-center">
                                    <input
                                        id="otherRead"
                                        ref="otherRead"
                                        v-model="components.other.read"
                                        class="form-check-input position-relative ml-0"
                                        type="checkbox"
                                        aria-label="Other read">
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">Write</th>
                                <td class="text-center">
                                    <input
                                        id="userWrite"
                                        ref="userWrite"
                                        v-model="components.user.write"
                                        class="form-check-input position-relative ml-0"
                                        type="checkbox"
                                        aria-label="User write">
                                </td>
                                <td class="text-center">
                                    <input
                                        id="groupWrite"
                                        ref="groupWrite"
                                        v-model="components.group.write"
                                        class="form-check-input position-relative ml-0"
                                        type="checkbox"
                                        aria-label="Group write">
                                </td>
                                <td class="text-center">
                                    <input
                                        id="otherWrite"
                                        ref="otherWrite"
                                        v-model="components.other.write"
                                        class="form-check-input position-relative ml-0"
                                        type="checkbox"
                                        aria-label="Other write">
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">Execute</th>
                                <td class="text-center">
                                    <input
                                        id="userExecute"
                                        ref="userExecute"
                                        v-model="components.user.execute"
                                        class="form-check-input position-relative ml-0"
                                        type="checkbox"
                                        aria-label="User execute">
                                </td>
                                <td class="text-center">
                                    <input
                                        id="groupExecute"
                                        ref="groupExecute"
                                        v-model="components.group.execute"
                                        class="form-check-input position-relative ml-0"
                                        type="checkbox"
                                        aria-label="Group execute">
                                </td>
                                <td class="text-center">
                                    <input
                                        id="otherExecute"
                                        ref="otherExecute"
                                        v-model="components.other.execute"
                                        class="form-check-input position-relative ml-0"
                                        type="checkbox"
                                        aria-label="Other execute">
                                </td>
                            </tr>
                            </tbody>
                        </table>

                        <p class="text-center lead text-muted">{{ permissionString }}</p>
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

        data() {
            return {
                components: {
                    user: {
                        read: true,
                        write: true,
                        execute: true,
                    },
                    group: {
                        read: true,
                        write: false,
                        execute: true,
                    },
                    other: {
                        read: true,
                        write: false,
                        execute: true,
                    },
                }
            }
        },

        computed: {
            permissionString() {
                return '-' +
                    (this.components.user.read ? 'r' : '-') +
                    (this.components.user.write ? 'w' : '-') +
                    (this.components.user.execute ? 'x' : '-') +
                    (this.components.group.read ? 'r' : '-') +
                    (this.components.group.write ? 'w' : '-') +
                    (this.components.group.execute ? 'x' : '-') +
                    (this.components.other.read ? 'r' : '-') +
                    (this.components.other.write ? 'w' : '-') +
                    (this.components.other.execute ? 'x' : '-');
            }
        }
    }
</script>
