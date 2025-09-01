# responsive horizontal

# Behaviour
* this component is used to shape the main structure of responsive web applications
* it has 3 responsive breaking points defined with min width 600px 900px and 1200px for mobile, tablet and desktop respectively
* in desktop view: 
  * it will put a main block item in the center of the page with a max with of 1100px
  * within the main block it will have 3 columns: a left sidebar, the main content and a right sidebar  
  * the left and right sidebars can be collapsed or opened with a property 
  * if there is no content in any of the sidebars, they will be rendered with width 0px, no need to explicitly define rule
* in tablet view: 
  * the main block item will occupy the whole screen width
  * the sidebar columns are still visible
* in mobile view a property defines the behaviour of the sidebars
  * if set to menu
    * the sidebars are hidden
    * the visibility will be controlled by the property
    * the sidebar should behave like a mobile menu:
      * overlaying the main content
  * if set to content
    * the sidebar is put on top of the main content block

# Props
* `leftSidebarCollapsed` (Boolean, default: false)
  * Controls the visibility of the left sidebar
  * Uses v-model for two-way binding
* `rightSidebarCollapsed` (Boolean, default: false)
  * Controls the visibility of the right sidebar
  * Uses v-model for two-way binding
* `mobileBehavior` (String, default: 'menu')
  * Defines how sidebars behave in mobile view
  * Valid values: 'menu' or 'content'

# Slots
* `default`
  * Main content area
* `left`
  * Left sidebar content
* `right`
  * Right sidebar content

# implementation details
* this is a vuejs component using single file component <script setup></script> <template></template> <style></style>
* it is not using typescript
* collapsing and opening the sidebar is annimated
* the css in the component does NOT use scoped css, but uses a specific class (short name) to scrope all instances of responsive horizontal
* uses CSS Grid for layout
* implements responsive design using media queries
* automatically handles window resize events
* provides smooth transitions for sidebar collapse/expand
* sidebars automatically hide when empty (no content in slot)