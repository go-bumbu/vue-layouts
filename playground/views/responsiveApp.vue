<script setup>
import Vertical from '../../src/compontents/vertical.vue'
import Horizontal from '../../src/compontents/horizontal.vue'
import Placeholder from '../../src/compontents/placeholder.vue'

</script>

<template>
    <Vertical :center-content="false" :fullHeight="true">
        <template #header>
            <Horizontal :verticalCenterContent="true" :centerContent="true"
                        content-max-width="960px"
                        content-width="100%"
                        left-max-width="200px"
                        right-max-width="200px"
                        right-min-width="200px"

            >
                <template #left>
                    <Placeholder :width="'100%'" :height="30" :color="11">Header leftfsdfdfdfd</Placeholder>
                </template>
                <template #default>
                    <Placeholder :width="'100%'" :height="50" :color="16">Header</Placeholder>
                </template>
                <template #right>
                    <Placeholder :width="'100%'" :height="30" :color="11">Header right</Placeholder>
                </template>
            </Horizontal>
        </template>
        <template #default>
            <Horizontal :verticalCenterContent="true" :centerContent="true"
                        content-max-width="960px"
                       content-width="100%"
                        left-max-width="200px"
                        right-max-width="200px"
                        right-width="200px"
                        right-min-width="200px"
                >
                <template #default>
                    <Placeholder class="target" :width="'100%'" :height="25" :color="13">center</Placeholder>
                    <Placeholder class="target" :width="'100%'" :height="500" :color="14">center content 2</Placeholder>
                </template>
            </Horizontal>
        </template>
        <template #footer>
            <Placeholder :width="'100%'" :height="30" :color="12">Footer</Placeholder>
        </template>
    </Vertical>
</template>
