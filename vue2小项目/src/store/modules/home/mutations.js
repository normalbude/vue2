import * as Types from '@/store/action-types'
const homeMutations = {
    [Types.SET_CATEGORY](state, payload) {
        state.category = payload//修改分类状态
    },
    [Types.SET_SLIDES](state, slides) {
        state.slides = slides
    }

}
export default homeMutations