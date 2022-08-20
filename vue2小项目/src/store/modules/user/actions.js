import * as Types from '@/store/action-types'
import { toLogin, validate } from '@/api/user'
import per from '@/router/permission'
import router from "@/router"
const filterRouter = (authList) => {
    authList = authList.map(item => item.auth)
    function filter(per) {
        let result = per.filter(route => {
            if (authList.includes(route.meta.auth)) {
                if (route.children) {
                    route.children = filter(route.children)
                }
                return route
            }
        })
        return result
    }
    return filter(per)
}
const userActions = {
    async [Types.SET_USER]({ commit }, { userInfo, has }) {
        commit(Types.SET_USER, userInfo)
        commit(Types.SET_PERMISSION, has)
    },
    async [Types.SET_LOGIN]({ commit, dispatch }, payload) {
        let userInfo = await toLogin(payload)
        dispatch(Types.SET_USER, { userInfo, has: true })
    },
    async [Types.VALIDATE]({ commit, dispatch }, payload) {
        if (!localStorage.getItem('token')) return false
        try {
            let userInfo = await validate()
            dispatch(Types.SET_USER, { userInfo, has: true })
            return true
        } catch (e) {
            dispatch(Types.SET_USER, { userInfo: {}, has: false })
            return false
        }
    },
    async [Types.ADD_ROUTE]({ commit, dispatch, state }, payload) {
        //添加路由
        let authList = state.authList
        let routes = filterRouter(authList)
        console.log(routes)
        let route = router.options.routes.find(item => item.path == '/profile')
        console.log(route)
        route.children = routes
        router.addRoutes([route])
        commit(Types.SET_MENU_PERMISSION, true)
    }
}
export default userActions