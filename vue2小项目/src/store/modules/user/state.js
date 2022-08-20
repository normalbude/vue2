const userState = {
    username: '',
    hasPermission: false,//登录后-权限
    token: '',  //jwt的方式
    authList: [], //登录后-》菜单权限列表
    menuPermission: false,
    btnPermission: ['edit', 'remove'], //权限列表

}
export default userState