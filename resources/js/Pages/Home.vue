

<script setup>
    import Layout from '../Shared/Layout.vue'
    import {Head} from '@inertiajs/vue3'


    defineProps({
        title: String
    })

</script>



<template>
    <Layout>
        <p>{{ title }}</p>
    </Layout>
</template>