// import './assets/main.css'

import './assets/font_air_panel/iconfont.css'

import { createApp, defineAsyncComponent } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
//import Chart
import { Chart, registerables } from 'chart.js';
// Chart.register(...registerables);
Chart.register(...registerables);
const app = createApp(App)
// Register the LineChart component globally
// app.component('line-chart', LineChart);

app.use(createPinia())

app.use(router)

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as labsComponents from 'vuetify/labs/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import 'vuetify/lib/styles/main.sass';
import '@mdi/font/css/materialdesignicons.css' // Import MDI CSS 必须需要导入，否则icon不能正常显示
// import { VDateInput } from 'vuetify/lib/labs/VDateInput'; 
// import {ref} from 'vue';
// export default {
//   components: {
//     VDateInput,
//   },
//   setup() {
//     const date = ref(new Date());
//     return { date };
//   },
// };
const vuetify = createVuetify({
  components:{
  ...components,
  ...labsComponents,
},
  directives,
  icons: {
  defaultSet: 'mdi',
  aliases,
  sets: {
    mdi,
  },
},
})
// Function to automatically import and register global components
// 全局注册后，不在需要单独每个页面都需要导入以Base开头的组件，直接使用
const registerGlobalComponents = (app) => {
  const requireComponent = import.meta.glob('./components/binhui/Base*.vue');

  Object.entries(requireComponent).forEach(([path, resolver]) => {
    const componentName = path.split('/').pop().replace(/\.\w+$/, '');
    app.component(componentName, defineAsyncComponent(resolver));
  });
};

// Register global components
registerGlobalComponents(app);

//echarts

//elment
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


app.use(vuetify)
app.use(ElementPlus)
app.mount('#app')
