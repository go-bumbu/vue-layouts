<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from "vue";

const props = defineProps({
  breakpoints: {
    type: Object,
    default: () => ({ sm: 600, md: 900, lg: 1200 }),
  },
  leftSidebarCollapsed: {
    type: Boolean,
    default: undefined,
  },
  rightSidebarCollapsed: {
    type: Boolean,
    default: undefined,
  },
});

const emit = defineEmits([
  "update:leftSidebarCollapsed",
  "update:rightSidebarCollapsed",
]);

const localLeft = ref(false);
const localRight = ref(false);
const isMobile = ref<boolean | undefined>(undefined)
// if parent provides a value, sync local state
watch(
  () => props.leftSidebarCollapsed,
  (val) => {
    if (val !== undefined) localLeft.value = val;
  },
  { immediate: true },
);

// always use this as the source of truth in the template
const effectiveLeft = computed(() => {
  console.log(props.leftSidebarCollapsed);
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
function collapseLeft(val: boolean) {
  if (props.leftSidebarCollapsed === undefined) {
    localLeft.value = val; // uncontrolled mode
  } else {
    emit("update:leftSidebarCollapsed", val); // controlled mode
  }
}
function collapseRight(val: boolean) {
  if (props.rightSidebarCollapsed === undefined) {
    localRight.value = val; // uncontrolled mode
  } else {
    emit("update:rightSidebarCollapsed", val); // controlled mode
  }
}

const width = ref(window.innerWidth);
function updateWidth() {
  width.value = window.innerWidth;
  if (
    width.value <= props.breakpoints.md &&
    (isMobile.value == false || isMobile.value === undefined)
  ) {
    isMobile.value = true;
    collapseLeft(true);
    collapseRight(true);
  }
  if (
    width.value > props.breakpoints.md &&
    (isMobile.value == true || isMobile.value === undefined)
  ) {
    isMobile.value = false;
    collapseLeft(false);
    collapseRight(false);
  }
}

onMounted(() => window.addEventListener("resize", updateWidth));
onMounted(() => {
  width.value = window.innerWidth;
  if (width.value <= props.breakpoints.md) {
    isMobile.value = true;
    collapseLeft(true);
    collapseRight(true);
  } else {
    isMobile.value = false;
  }
});
onUnmounted(() => window.removeEventListener("resize", updateWidth));

const currentSize = computed(() => {
  if (width.value < props.breakpoints.sm) return "xs";
  if (width.value < props.breakpoints.md) return "sm";
  if (width.value < props.breakpoints.lg) return "md";
  return "lg";
});
</script>

<template>
  <div
    class="b-sbc-wrapper"
    :class="[currentSize, { lo: !effectiveLeft }, { ro: !effectiveRight }]"
  >
    <div
      class="overlay"
      @click="
        collapseLeft(true);
        collapseRight(true);
      "
    ></div>
    <div class="b-sbc-container">
      <div
        class="b-sbc-sidebar b-sbc-left"
        :class="{ collapsed: effectiveLeft }"
      >
        <slot name="left" />
      </div>
      <div class="b-sbc-main">
        <slot />
      </div>
      <div
        class="b-sbc-sidebar b-sbc-right"
        :class="{ collapsed: effectiveRight }"
      >
        <slot name="right" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.b-sbc-wrapper {
  flex: 1; /* Takes up all available space */
  width: 100%;

  // make overlay visible when sidebars are opened
  &.xs.lo,
  &.xs.ro,
  &.sm.lo,
  &.sm.ro {
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.4);
      z-index: 900;
      cursor: pointer;
    }
  }
}

// this addresses the grid div
.b-sbc-container {
  width: 100% !important;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
}

// handle annimations
.b-sbc-sidebar {
  flex: 0 0 auto;
  width: 0;
  //background: #b0d8af;
}

.b-sbc-main {
  flex: 1; /* take up all remaining space */
  min-width: 0; /* prevent overflow when content is too wide */
  //background: #6fb8ca;
}

.b-sbc-sidebar > * {
  opacity: 1;
  transition: opacity 0.1s ease;
}

/* Style for collapsed sidebar */
.b-sbc-sidebar.collapsed {
  display: none;
}

.b-sbc-wrapper.xs,
.b-sbc-wrapper.sm {
  .b-sbc-sidebar {
    position: fixed;
    display: block;
    top: 0;
    bottom: 0;
    left: -250px;
    width: 250px;
    z-index: 1000;
  }
}

.b-sbc-wrapper.lo {
  .b-sbc-sidebar {
    left: 0;
  }
}

.b-sbc-wrapper.md {
  .b-sbc-sidebar {
    width: 25%;
  }
}

.b-sbc-wrapper.lg {
  .b-sbc-sidebar {
    width: 20%;
  }
}
</style>
