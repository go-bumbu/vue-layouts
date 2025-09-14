<script setup lang="ts">
import { ref, computed } from "vue";

interface Props {
    sidebarOpen?: boolean;
    sidebarWidth?: number | string;
    maxContentWidth?: number | string | null;
    fullHeight?: boolean;
    centerContent?: boolean;
    verticalCenter?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    sidebarOpen: true,
    sidebarWidth: 240,
    maxContentWidth: null,
    fullHeight: false,
    centerContent: false,
    verticalCenter: false,
});

type Emits = {
    'update:sidebarOpen': [value: boolean];
}

const emit = defineEmits<Emits>();

const sidebar = computed({
    get: (): boolean | undefined => props.sidebarOpen,
    set: (val: boolean): void => emit("update:sidebarOpen", val),
});

function toCss(value: number | string | null | undefined): string | undefined {
    if (!value) return undefined;
    return typeof value === "number" ? `${value}px` : value;
}

const containerStyle = computed((): Record<string, string> => ({
    gridTemplateColumns: `${sidebar.value ? toCss(props.sidebarWidth) || "240px" : "0px"} 1fr auto`,
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
