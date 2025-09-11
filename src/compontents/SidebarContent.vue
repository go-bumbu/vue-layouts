<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'

const props = defineProps({
    breakpoints: {
        type: Object,
        default: () => ({ sm: 600, md: 900, lg: 1200 }),
    },
    leftSidebarCollapsed: {
        type: Boolean,
        default: undefined
    },
    rightSidebarCollapsed: {
        type: Boolean,
        default: undefined
    },
});

const emit = defineEmits(["update:leftSidebarCollapsed", "update:rightSidebarCollapsed"]);

const localLeft = ref(false);
const localRight= ref(false);
// if parent provides a value, sync local state
watch(
    () => props.leftSidebarCollapsed,
    (val) => {
        if (val !== undefined) localLeft.value = val;
    },
    { immediate: true }
);

// always use this as the source of truth in the template
const effectiveLeft = computed(() => {
    return props.leftSidebarCollapsed !== undefined
        ? props.leftSidebarCollapsed
        : localLeft.value;
});
const effectiveRight = computed(() => {
    return props.rightSidebarCollapsed !== undefined
        ? props.rightSidebarCollapsed
        : localRight.value;
});

// expose setter that works in both cases
function collapseLeft(val:boolean) {
    if (props.leftSidebarCollapsed === undefined) {
        localLeft.value = val; // uncontrolled mode
    } else {
        emit("update:leftSidebarCollapsed", val); // controlled mode
    }
}
function collapseRight(val:boolean) {
    if (props.rightSidebarCollapsed === undefined) {
        localRight.value = val; // uncontrolled mode
    } else {
        emit("update:rightSidebarCollapsed", val); // controlled mode
    }
}

const width = ref(window.innerWidth);
function updateWidth() {
    width.value = window.innerWidth;
    if (width.value <= props.breakpoints.md){
        collapseLeft(true);
        collapseRight(true);
    }
    if (width.value > props.breakpoints.md){
        collapseLeft(false);
        collapseRight(false);
    }
}

onMounted(() => window.addEventListener("resize", updateWidth));
onMounted(() => updateWidth());
onUnmounted(() => window.removeEventListener("resize", updateWidth));

const currentSize = computed(() => {
    if (width.value < props.breakpoints.sm) return "xs";
    if (width.value < props.breakpoints.md) return "sm";
    if (width.value < props.breakpoints.lg) return "md";
    return "lg";
});

</script>

<template>

    <div class="overlay" id="overlay"></div>

    <div class="layout-wrapper" :class="currentSize">
        <!-- Main container with max-width -->
        <div class="layout-container flex justify-content-center">
            <!-- Content area with sidebar and main content -->

                <!-- Sidebar - visible on desktop, hidden on mobile -->
                <div class="sidebar left"  :class="{ 'collapsed': effectiveLeft }" >
                    <slot name="left" />
                </div>

                <!-- Main content area -->
                <div class="main-content">
                    <slot />
                </div>

                <div class="sidebar right"  :class="{ 'collapsed': effectiveRight }" >
                    <slot name="right" />
                </div>

        </div>
    </div>

</template>

<style lang="scss"  >
.layout-wrapper {
    flex: 1; /* Takes up all available space */
    width: 100%;
    background: #d8afaf;
}

// this addresses the grid div
.layout-container {
    width: 100% !important;
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
}

// handle annimations
.sidebar {
    flex: 0 0 auto;
    width: 0;
    background: #b0d8af;
}

.main-content{
    //flex: 0 0 auto;
    //width: 100%;

    flex: 1; /* take up all remaining space */
    min-width: 0; /* prevent overflow when content is too wide */

    background: #6fb8ca;
}

.sidebar > * {
    opacity: 1;
    transition: opacity 0.1s ease;
}

/* Style for collapsed sidebar */
.sidebar.collapsed {
    display: none;
}

.layout-wrapper.md {
    .sidebar{
        width: 25%;
    }
    //.main-content{
    //    width: 50%;
    //}
}

.layout-wrapper.lg {
    .sidebar{
        width: 20%;
    }
    //.main-content{
    //    width: 60%;
    //}
}


</style>