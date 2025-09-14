<script setup>
import { ref, computed } from "vue";

// Props kept to the essentials
const props = defineProps({
    sidebarOpen: { type: Boolean, default: true },
    sidebarWidth: { type: [Number, String], default: 240 },
    maxContentWidth: { type: [Number, String], default: null },
    fullHeight: { type: Boolean, default: false },
    centerContent: { type: Boolean, default: false },
    verticalCenter: { type: Boolean, default: false },
});

const emit = defineEmits(["update:sidebarOpen"]);

const sidebar = computed({
    get: () => props.sidebarOpen,
    set: (val) => emit("update:sidebarOpen", val),
});

function toCss(value) {
    return typeof value === "number" ? `${value}px` : value;
}

const containerStyle = computed(() => ({
    gridTemplateColumns: `${sidebar.value ? toCss(props.sidebarWidth) : "0px"} 1fr auto`,
}));
</script>

<template>
    <div
        class="layout"
        :class="{ 'full-height': fullHeight }"
        :style="containerStyle"
    >
        <!-- Sidebar -->
        <aside class="sidebar">
            <slot name="sidebar" />
        </aside>

        <!-- Main -->
        <main
            class="main"
            :class="{ center: centerContent, 'v-center': verticalCenter }"
        >
            <div :style="{ maxWidth: toCss(maxContentWidth) }">
                <slot />
            </div>
        </main>

        <!-- Right -->
        <aside class="right">
            <slot name="right" />
        </aside>
    </div>
</template>

<style scoped>
.layout {
    display: grid;
    grid-template-columns: auto 1fr auto;
    width: 100%;
    transition: grid-template-columns 0.3s ease;
}

.layout.full-height {
    height: 100%;
}

.sidebar,
.right {
    display: grid;
    align-items: center;
}

.main {
    display: grid;
    place-items: start;
}

.main.center {
    place-items: start center;
}

.main.v-center {
    place-items: center;
}
</style>
