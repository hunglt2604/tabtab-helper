import {defineAsyncComponent} from "vue";
const Index = defineAsyncComponent(() =>
    import('../components/Preview/Index.vue')
)
const InputCustomField = defineAsyncComponent(() =>
    import('../components/InputCustomField/Index.vue')
)
export default {
    install: (app, options) => {
        if (options.mode.includes('preview')) {
            app.component('Preview', Index)
        }
        if (options.mode.includes('input')) {
            app.component('InputCustomField', InputCustomField)
        }
    }
}
