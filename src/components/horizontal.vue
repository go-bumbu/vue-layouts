<script setup>
import { computed, onMounted } from "vue";

const props = defineProps({
  fullHeight: {
    type: Boolean,
    default: false,
  },
  centerContent: {
    type: Boolean,
    default: false,
  },
  contentWidth: {
    type: [Number, String],
    default: null,
  },
  contentMaxWidth: {
    type: [Number, String],
    default: null,
  },
  verticalCenterContent: {
    type: Boolean,
    default: false,
  },
  minHeight: {
    type: [Number, String],
    default: null,
  },
  leftMinWidth: {
    type: [Number, String],
    default: null,
  },
  leftMaxWidth: {
    type: [Number, String],
    default: null,
  },
  rightMinWidth: {
    type: [Number, String],
    default: null,
  },
  rightMaxWidth: {
    type: [Number, String],
    default: null,
  },
  // New props for overall container sizing
  containerWidth: {
    type: [Number, String],
    default: "100%",
  },
  containerMaxWidth: {
    type: [Number, String],
    default: null,
  },
  // Two-way binding prop for controlling the sidebar.
  // When not provided, the component will set the default based on the window width.
  sidebarOpen: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["update:sidebarOpen"]);

// Create a computed property for two-way binding with sidebarOpen.
const sidebarStatus = computed({
  get() {
    return props.sidebarOpen;
  },
  set(val) {
    emit("update:sidebarOpen", val);
  },
});

// On mount, if sidebarOpen is not provided by the parent, determine a default based on window width.
onMounted(() => {
  if (props.sidebarOpen === null) {
    sidebarStatus.value = window.innerWidth >= 768;
  }
});

// Helper function to convert a number or string to a valid CSS value.
function convertToCss(value) {
  if (!value) return null;
  return typeof value === "number" ? value + "px" : value;
}

// Determine the sidebar's fixed width when open.
const leftWidth = computed(() => {
  return (
    convertToCss(props.leftMinWidth) ||
    convertToCss(props.leftMaxWidth) ||
    "auto"
  );
});

// Compute the overall container style.
// When the sidebar is closed, its column width is set to 0px.
const containerStyle = computed(() => {
  return {
    gridTemplateColumns: `${sidebarStatus.value ? leftWidth.value : "0px"} 1fr auto`,
    width: convertToCss(props.containerWidth),
    maxWidth: convertToCss(props.containerMaxWidth),
  };
});
</script>

<template>
  <!-- The container uses containerStyle to set grid columns and overall sizing -->
  <div
    class="cc-horizontal"
    :class="{ 'full-height': fullHeight }"
    :style="containerStyle"
  >
    <!-- Left Sidebar -->
    <div class="c-left">
      <slot name="left"></slot>
    </div>
    <div
      class="cc-main"
      :class="{
        'center-content': centerContent,
        'vertical-center': verticalCenterContent,
      }"
      :style="{ minHeight: minHeight }"
    >
      <div
        :style="{
          maxWidth: contentMaxWidth,
          width: contentWidth ? contentWidth : null,
        }"
      >
        <slot></slot>
      </div>
    </div>
    <!-- Right Section -->
    <div
      class="c-right"
      :style="{ minWidth: rightMinWidth, maxWidth: rightMaxWidth }"
    >
      <slot name="right"></slot>
    </div>
  </div>
</template>

<style>
/* Animate the grid-template-columns to smoothly collapse/expand the sidebar */
.cc-horizontal {
  width: 100%;
  display: grid;
  grid-template-columns: auto 1fr auto;
  transition: grid-template-columns 0.3s ease;
}
.cc-horizontal.full-height {
  height: 100%;
}

.cc-main {
  display: grid;
  place-items: start;
  width: auto;
}
.cc-main.center-content {
  place-items: start center;
}
.cc-main.vertical-center,
.c-right,
.c-left {
  align-items: center;
}
.cc-main > div {
  /* height: 100%; */
}
.cc-main.vertical-center > div {
  height: auto;
}

.c-left,
.c-right {
  display: grid;
  grid-auto-flow: column;
}
</style>
