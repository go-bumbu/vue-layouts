<script setup>
import Vertical from '../../src/components/vertical.vue'
import Horizontal from '../../src/components/horizontal.vue'
import Placeholder from '../../src/components/placeholder.vue'
import SidebarContent from '../../src/components/SidebarContent.vue'
import { ref } from "vue";

const leftCollapsed2 = ref(true);


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
                    <br>
                    <SidebarContent ref="childRef1">
                        <template #left>
                            <h3>Sidebar</h3>
                            <ul class="list-none p-0 m-0">
                                <li class="mb-2">Menu Item 1</li>
                                <li class="mb-2">Menu Item 2</li>
                                <li class="mb-2">Menu Item 3</li>
                            </ul>
                        </template>

                        <template #default >
                            <div class="button" @click="handleLeftClick1" >»»</div>

                            <div class="p-3">
                                <h2>Main Content</h2>
                                <p>This is the main content area that will take the remaining space.</p>
                            </div>
                        </template>

                        <template #right>
                            <h3>Sidebar</h3>
                            <ul class="list-none p-0 m-0">
                                <li class="mb-2">Menu Item 1</li>
                                <li class="mb-2">Menu Item 2</li>
                                <li class="mb-2">Menu Item 3</li>
                            </ul>
                        </template>

                    </SidebarContent>


                    <!--
                    =========================================================================================
                    -->
                    <br>

                </template>
            </Horizontal>
            <SidebarContent  v-model:left-sidebar-collapsed="leftCollapsed2" :right-sidebar-collapsed="true" >
                <template #left>
                    <h3>Sidebar</h3>
                    <ul class="list-none p-0 m-0">
                        <li class="mb-2">Menu Item 1</li>
                        <li class="mb-2">Menu Item 2</li>
                        <li class="mb-2">Menu Item 3</li>
                    </ul>
                </template>

                <template #default >
                    <div class="button" @click="leftCollapsed2 = !leftCollapsed2"> >»»</div>


                    <div class="p-3">
                        <h2>Main Content</h2>
                        <p>This is the main content area that will take the remaining space.</p>
                    </div>
                </template>

                <template #right>
                    <h3>Sidebar</h3>
                    <ul class="list-none p-0 m-0">
                        <li class="mb-2">Menu Item 1</li>
                        <li class="mb-2">Menu Item 2</li>
                        <li class="mb-2">Menu Item 3</li>
                    </ul>
                </template>

            </SidebarContent>
        </template>

        <template #footer>
            <Placeholder :width="'100%'" :height="30" :color="12">Footer</Placeholder>
        </template>
    </Vertical>
</template>

<style>
.cc-rh-left{
    background: #d5bcbc;
}
.cc-rh-right{
    background: #495057;
}
.cc-rh-main{
    background: #a5b1ba;
}

.button{
    padding: 2px;
    border: 1px solid #595656;
    display: inline-block;
    margin: 0.3rem 0.5rem ;
    cursor: pointer;
    background: #d1d1d1;
}
</style>