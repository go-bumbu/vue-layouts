import type { DefineComponent, Plugin, Slot } from 'vue';

declare module '@go-bumbu/vue-layouts' {
    export const VerticalLayout: DefineComponent<
        {}, // props
        {}, // raw bindings
        any, // data
        {}, // computed
        {}, // methods
        {}, // mixins
        {}, // extends
        {    // slots
            header?: Slot;
            default?: Slot;
            footer?: Slot;
        }
    >;

    export const HorizontalLayout: DefineComponent<{}, {}, any, {}, {}, {}, {}, {
        header?: Slot;
        default?: Slot;
        footer?: Slot;
    }>;

    export const HorizontalLayout2: DefineComponent<{}, {}, any>;
    export const Placeholder: DefineComponent<{}, {}, any>;
    export const ResponsiveHorizontal: DefineComponent<{}, {}, any>;
    export const SidebarContent: DefineComponent<{}, {}, any>;

    declare const plugin: Plugin;
    export default plugin;
}