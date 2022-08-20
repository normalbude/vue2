import store from "@/store"
import * as Types from '@/store/action-types'
export default {
    'clear_token': (to, from, next) => {
        store.commit(Types.CLEAR_TOKEN)//清空token
        next()
    },
    'login_permission': async (to, from, next) => {
        //用户时否需要登录才能访问的标识
        let needLogin = to.matched.some(item => item.meta.needLogin)
        //如果vuex中有值 认为当前登陆过了
        if (!store.state.user.hasPermission) {
            //返回一个isLogin字段标识用户是否登录过了
            let isLogin = await store.dispatch(`user/${Types.VALIDATE}`)
            if (needLogin) {
                if (!isLogin) {
                    next('/login')//需要登录没有登录
                } else {
                    next()//需要登录页登录了
                }
            } else {//不需要登录
                if (to.name == 'login') {//访问的是登录页面
                    if (!isLogin) {
                        next()
                    } else {
                        next('/profile')
                    }
                } else {
                    next()
                }
            }
        } else {
            if (to.name == 'login') {
                next('/profile')//登录了 访问登录页
            } else {
                next()
            }
        }
    },
    'menu-permisssion': async (to, from, next) => {
        //动态添加路由
        if (store.state.user.hasPermission) {//要求用户登录，才能拿去菜单权限
            if (!store.state.user.menuPermission) {//没菜单权限 才需要处理
                await store.dispatch(`user/${Types.ADD_ROUTE}`)//路由动态加载，此时组件异步加载
                //希望等待组件加载完毕后跳转过去
                next({ ...to, replace: true })//页面重新跳了一次 组件也ok hack /home
            } else {
                next()
            }
        } else {
            next()
        }
    }
}