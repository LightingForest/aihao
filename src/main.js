import '@/styles/common.scss'
import App from './App.vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

//引入初始样式化文件
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
