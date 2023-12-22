<script setup>
    import Layout from '../Shared/Layout.vue'
    import {Head} from '@inertiajs/inertia-vue3'

    defineProps({
        title: String
    })
</script>

<template>
    <Layout>
        <Head :title="title" />
        <p>{{ title }}</p>
    </Layout>
</template>