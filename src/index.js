import VerticalLayout from './components/vertical.vue'
import HorizontalLayout from './components/horizontal.vue'
import Placeholder from './components/placeholder.vue'
import ResponsiveHorizontal from './components/responsiveHorizontal.vue'


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