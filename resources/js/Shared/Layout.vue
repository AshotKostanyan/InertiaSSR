<script>
    import { Link } from '@inertiajs/vue3';
    import { Head } from '@inertiajs/inertia-vue3'
 
    export default{
        components: {
            Link
        },
    }
</script>


<template>
    <div class="container">
        <ul>
            <li>
                <Link :href="route('home')">
                    Home
                </Link>
            </li>
            <li>
                <Link :href="route('about')">
                    About
                </Link>
            </li>
            <li>
                <Link :href="route('users.index')">
                    Users
                </Link>
            </li>
        </ul>


        <slot/>
    </div>
</template>


<style>
</style>