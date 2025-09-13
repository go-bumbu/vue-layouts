<script setup>
import VerticalLayout from '../../src/components/vertical.vue'
import HorizontalLayout from '../../src/components/horizontal.vue'
import Placeholder from '../../src/components/placeholder.vue'

</script>

<template>
    <VerticalLayout :centerContent="true" class="vertical-layout">
        <template #default>
            <HorizontalLayout :verticalCenterContent="true" :centerContent="true" class="horizontal-layout">
                <template #default>
                    <Placeholder :width="350" :height="350" :color="12">Login View</Placeholder>
                </template>
            </HorizontalLayout>
        </template>
        <template #footer> </template>
    </VerticalLayout>
</template>

<style scoped>

.vertical-layout {
    background: #f1d5d5;
}

.horizontal-layout {
    background: #d5eff1;
}

</style>
