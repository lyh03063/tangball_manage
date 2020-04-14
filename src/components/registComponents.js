

//本文件用于批量注册全局组件
import com_column_topSort from '@/components/common/com_column_topSort.vue'

const Components = {
    com_column_topSort
}

//安装以上多个组件
Object.keys(Components).forEach(name => {
    Vue.component(name, Components[name])//全局注册
})




