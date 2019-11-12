<template>
    <div class="card shadow my-auto">
        <div class="card-body">
            <table class="table table-borderless">
                <thead>
                <tr>
                    <th></th>
                    <th class="text-center" scope="col">
                        <p class="text-muted text-uppercase font-weight-bold small">
                            User
                            <a href="#" v-tooltip="{ placement: 'bottom' }" class="text-decoration-none" title="The user who owns the file">
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
                            <a href="#" v-tooltip="{ placement: 'bottom' }" class="text-decoration-none" title="The group to which the user belongs">
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
                            <a href="#" v-tooltip="{ placement: 'bottom' }" class="text-decoration-none" title="Any other user who has access to the file">
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
        </div>
        <div class="card-footer border-0 py-3">
            <div class="d-flex justify-content-between">
                <p class="mb-0 px-3"><code class="text-muted"><span class="font-weight-bold" style="user-select: none">~$ </span>chmod {{ permissionAsOctal }} <em>filename</em></code></p>
                <a href="#" v-tooltip="{ placement: 'bottom' }" class="text-decoration-none" :data-original-title="permissionAsHumanReadable">
                    <p class="mb-0 px-3 text-muted">
                        {{ permissionAsString }}

                        <span v-if="permissionStrength === 'strong'">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" viewBox="0 0 24 24" class="ml-2 icon-security-check"><path class="fill-success-primary" d="M4 4l8-2 8 2v9.06a8 8 0 0 1-4.42 7.15L12 22l-3.58-1.79A8 8 0 0 1 4 13.06V4z"/><path class="fill-success-secondary" d="M10.5 12.59l4.3-4.3a1 1 0 0 1 1.4 1.42l-5 5a1 1 0 0 1-1.4 0l-2-2a1 1 0 0 1 1.4-1.42l1.3 1.3z"/></svg>
                        </span>
                        <span v-if="permissionStrength === 'moderate'">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" viewBox="0 0 24 24" class="icon-security-important"><path class="fill-warning-primary" d="M4 4l8-2 8 2v9.06a8 8 0 0 1-4.42 7.15L12 22l-3.58-1.79A8 8 0 0 1 4 13.06V4z"/><path class="fill-warning-secondary" d="M12 18a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm1-5.9c-.13 1.2-1.88 1.2-2 0l-.5-5a1 1 0 0 1 1-1.1h1a1 1 0 0 1 1 1.1l-.5 5z"/></svg>
                        </span>
                        <span v-if="permissionStrength === 'weak'">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" viewBox="0 0 24 24" class="icon-security-important"><path class="fill-danger-primary" d="M4 4l8-2 8 2v9.06a8 8 0 0 1-4.42 7.15L12 22l-3.58-1.79A8 8 0 0 1 4 13.06V4z"/><path class="fill-danger-secondary" d="M12 18a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm1-5.9c-.13 1.2-1.88 1.2-2 0l-.5-5a1 1 0 0 1 1-1.1h1a1 1 0 0 1 1 1.1l-.5 5z"/></svg>
                        </span>
                    </p>
                </a>
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
                },
                rules: {
                    read: 4,
                    write: 2,
                    execute: 1,
                }
            }
        },

        computed: {
            permissionAsString() {
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
            },

            permissionAsOctal() {
                return this.calculateUserOctal() +
                    this.calculateGroupOctal() +
                    this.calculateOtherOctal();
            },

            permissionAsHumanReadable() {
                return this.humanReadablePermissionsLevel(this.permissionAsOctal);
            },

            permissionStrength() {
                return this.calculatePermissionStrength(this.permissionAsString);
            }
        },

        methods: {
            calculateUserOctal() {
                return String(
                    (this.components.user.read === true ? this.rules.read : 0) +
                    (this.components.user.write === true ? this.rules.write : 0) +
                    (this.components.user.execute === true ? this.rules.execute : 0)
                );
            },

            calculateGroupOctal() {
                return String(
                    (this.components.group.read === true ? this.rules.read : 0) +
                    (this.components.group.write === true ? this.rules.write : 0) +
                    (this.components.group.execute === true ? this.rules.execute : 0)
                );
            },

            calculateOtherOctal() {
                return String(
                    (this.components.other.read === true ? this.rules.read : 0) +
                    (this.components.other.write === true ? this.rules.write : 0) +
                    (this.components.other.execute === true ? this.rules.execute : 0)
                );
            },

            humanReadablePermissionsLevel(val) {
                switch(val) {
                    case '600':
                        return 'Only the owner can read and write';
                    case '644':
                        return 'Only owner can read and write while everyone else can read';
                    case '700':
                        return 'Only the owner can read, write, and execute';
                    case '755':
                        return 'The owner can read, write, and execute while everyone else can only read and execute';
                    case '711':
                        return 'The owner can read, write, and execute while everyone else can only execute';
                    case '666':
                        return 'Everyone in the world can read and write';
                    case '777':
                        return 'Everyone in the world can read, write, and execute';
                    default:
                        return 'I sure hope you know what you\'re doing';
                }
            },

            calculatePermissionStrength(val) {
                let groupAccess = val.substring(4, 7);
                let otherAccess = val.substring(7, 10);

                switch (true) {
                    case otherAccess.includes('w'):
                        return 'weak';
                    case groupAccess.includes('w'):
                        return 'moderate';
                    default:
                        return 'strong';
                }
            }
        }
    }
</script>
