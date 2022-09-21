import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

const opts = {
    theme: { 
        dark: true,
        themes: {
            dark: {
                anchor: '#ffffff',
                primary: '#B2794C',
            }
        }
    },
}

export default new Vuetify(opts)