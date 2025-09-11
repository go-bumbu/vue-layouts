
## Vertical

The Vertical component provides a simple, full-height vertical layout with three sections;
It uses CSS Grid to create a responsive layout that maintains proper spacing and alignment.

**Props**

| Prop            | Type    | Default | Description                                                         |
|-----------------|---------|---------|---------------------------------------------------------------------|
| `centerContent` | Boolean | `false` | When set to `true`, vertically centers the content in the main area |


**Slots**

| Slot Name | Description                                  |
|-----------|----------------------------------------------|
| `header`  | Content for the header section at the top    |
| `default` | Main content area (middle section)           |
| `footer`  | Content for the footer section at the bottom |


### Example Usage

```vue
<template>
  <Vertical :centerContent="true">
    <template #header>
      <nav>Navigation bar goes here</nav>
    </template>
    
    <div>
      <h1>Main Content</h1>
      <p>This content will be vertically centered in the main area</p>
    </div>
    
    <template #footer>
      <footer>Footer content goes here</footer>
    </template>
  </Vertical>
</template>

<script setup>
import { Vertical } from 'vue-layouts'
</script>
```
