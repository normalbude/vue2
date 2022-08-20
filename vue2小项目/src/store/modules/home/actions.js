import * as Types from '@/store/action-types'
import { fecthSlides } from '@/api/home.js'
const homeActions = {
    async [Types.SET_SLIDES]({ commit }) {
        let slides = await fecthSlides();
        // let slides = []
        commit(Types.SET_SLIDES, slides)
    }
}
export default homeActions