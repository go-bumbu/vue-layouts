import VerticalLayout from "./components/vertical.vue";
import HorizontalLayout from "./components/horizontal.vue";
import HorizontalLayout2 from "./components/Horizontal2.vue";
import Placeholder from "./components/placeholder.vue";
import ResponsiveHorizontal from "./components/responsiveHorizontal.vue";
import SidebarContent from "./components/SidebarsContent.vue";

export {
  VerticalLayout,
  HorizontalLayout,
  HorizontalLayout2,
  Placeholder,
  ResponsiveHorizontal,
  SidebarContent,
};

// Provide an install function for Vue.use()
export default {
  install(app) {
    app.component("VerticalLayout", VerticalLayout);
    app.component("HorizontalLayout", HorizontalLayout);
    app.component("HorizontalLayout2", HorizontalLayout2);
    app.component("Placeholder", Placeholder);
    app.component("ResponsiveHorizontal", ResponsiveHorizontal);
    app.component("SidebarContent", SidebarContent);
  },
};
