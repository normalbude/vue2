

const files = require.context('.', true, /\.js$/)

const modules = {}
files.keys().forEach(key => {
    const path = key.replace(/\.\/|\.js/g, '')
    if (path == 'index') return;
    let [namespace, type] = path.split('/')
    if (!modules[namespace]) {
        modules[namespace] = {
            namespaced: true
        }
    }

    modules[namespace][type] = files(key).default;//获取文件导出的结果
});


export default modules