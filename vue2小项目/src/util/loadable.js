import LoadingComponent from '@/components/loading.vue'
//异步引入组件时的加载模块
const loadable = (asyncFunc) => {
    let component = () => ({
        component: asyncFunc(),
        loading: LoadingComponent
    })
    return {
        render(h) {
            return h(component)
        }
    }
}

export default loadable