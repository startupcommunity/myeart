import vue from 'vue';
import VueI18n from "vue-i18n";
import { en } from "./../lang/en";
import { es } from "./../lang/es";

vue.use(VueI18n);
export default new VueI18n({
    locale: "es",
    fallbackLocale: "es",
    messages: {
        en,
        es,
    },
});
