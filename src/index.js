import VerticalLayout from "./compontents/vertical.vue";
import HorizontalLayout from "./compontents/horizontal.vue";
import ResponsiveHorizontal from "./compontents/responsiveHorizontal.vue";
import Placeholder from "./compontents/placeholder.vue";


export {
    VerticalLayout,
    HorizontalLayout,
    Placeholder,
    ResponsiveHorizontal,
};

// Provide an install function for Vue.use()
export default {
    install(app) {
        app.component("VerticalLayout", VerticalLayout);
        app.component("HorizontalLayout", HorizontalLayout);
        app.component("Placeholder", Placeholder);
        app.component("ResponsiveHorizontal", ResponsiveHorizontal);
    },
};