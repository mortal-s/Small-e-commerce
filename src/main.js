import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios';
import App from './App.vue'
import router from './router'

import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

import 'normalize.css';
const app = createApp(App)
function useTable (app) {
    app.use(VXETable)
}
app.use(useTable)
app.use(createPinia())
app.use(router)

app.mount('#app')
