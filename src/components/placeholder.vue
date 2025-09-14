<template>
  <div
    class="container"
    :style="containerStyle"
    @mouseover="handleHover(true)"
    @mouseleave="handleHover(false)"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: [Number, String],
      required: true,
      default: "100%",
    },
    height: {
      type: [Number, String],
      required: true,
      default: "100%",
    },
    color: {
      type: [Number, String],
      required: false,
      default: "",
    },
    showBorder: {
      type: Boolean,
      required: false,
      default: false,
    },
    showBackgroundOnHover: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      pastelColors: [
        "#FFB3BA",
        "#FFDFBA",
        "#FFFFBA",
        "#BAFFC9",
        "#BAE1FF",
        "#D4A5A5",
        "#FFD1DC",
        "#E2CFCF",
        "#B5EAD7",
        "#FFE156",
        "#F7B7A3",
        "#FF8B94",
        "#A7C7E7",
        "#C5E1A5",
        "#F3C1C6",
        "#F5E6A7",
        "#B0E0E6",
        "#D8BFD8",
        "#D4A017",
        "#E0BBE4",
        "#957DAD",
        "#D291BC",
        "#FEC8D8",
        "#FFDFD3",
        "#E6E6FA",
        "#C2DFFF",
        "#B5D8CC",
        "#FFC3A0",
        "#FFDAC1",
        "#D4A5A5",
        "#A2D5C6",
        "#E6A4B4",
        "#BFD8D2",
        "#F5CBA7",
        "#F7D7A3",
      ],
      isHovered: false,
    };
  },
  computed: {
    widthValue() {
      return typeof this.width === "number" ? `${this.width}px` : this.width;
    },
    heightValue() {
      return typeof this.height === "number" ? `${this.height}px` : this.height;
    },
    backgroundColor() {
      if (!this.color) return "transparent";
      if (
        typeof this.color === "string" &&
        /^#([0-9A-F]{3}){1,2}$/i.test(this.color)
      ) {
        return this.color;
      }
      if (
        typeof this.color === "number" &&
        this.color >= 0 &&
        this.color < this.pastelColors.length
      ) {
        return this.pastelColors[this.color];
      }
      return "transparent";
    },
    containerStyle() {
      return {
        backgroundColor: this.showBackgroundOnHover
          ? this.isHovered
            ? this.backgroundColor
            : "transparent"
          : this.backgroundColor,
        width: this.widthValue,
        height: this.heightValue,
        border: this.showBorder ? "1px dashed #636363" : "none",
        transition: "background-color 0.3s ease-in-out",
      };
    },
  },
  methods: {
    handleHover(state) {
      this.isHovered = state;
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
