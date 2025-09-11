## Placeholder

The Placeholder component provides a flexible container for creating placeholder spaces with 
customizable dimensions and styling. It's useful for prototyping layouts, creating empty spaces, 
or displaying content with specific dimensions.

**Props**

| Prop                    | Type           | Default  | Description                                                        |
|-------------------------|----------------|----------|--------------------------------------------------------------------|
| `width`                 | Number, String | `'100%'` | Sets the width of the placeholder container                        |
| `height`                | Number, String | `'100%'` | Sets the height of the placeholder container                       |
| `color`                 | Number, String | `''`     | Background color (hex string or index of predefined pastel colors) |
| `showBorder`            | Boolean        | `false`  | When set to `true`, displays a dashed border around the container  |
| `showBackgroundOnHover` | Boolean        | `false`  | When set to `true`, shows background color only on hover           |

**Slots**

| Slot Name | Description                                    |
|-----------|------------------------------------------------|
| `default` | Content to be displayed inside the placeholder |

**Notes**

- When providing a numeric value for `width` or `height`, it will be interpreted as pixels.
- The `color` prop can accept either a hex color string (e.g., `'#FFB3BA'`) or a numeric index to select from the predefined pastel colors.
- The component centers its content both horizontally and vertically by default.

### Example Usage

```vue
<template>
  <div>
    <h2>Fixed Size Placeholder</h2>
    <Placeholder :width="300" :height="200" color="#BAE1FF" :showBorder="true">
      <p>This is a placeholder with fixed dimensions</p>
    </Placeholder>
    
    <h2>Percentage-based Placeholder</h2>
    <Placeholder width="50%" height="100px" :color="5">
      <p>This uses a predefined pastel color (index 5)</p>
    </Placeholder>
    
    <h2>Hover Effect Placeholder</h2>
    <Placeholder 
      width="200px" 
      height="200px" 
      color="#FFD1DC" 
      :showBackgroundOnHover="true"
      :showBorder="true"
    >
      <p>Hover over me to see the background color</p>
    </Placeholder>
  </div>
</template>
```