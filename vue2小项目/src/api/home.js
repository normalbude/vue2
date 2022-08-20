import axios from '@/util/axios'
//轮播图
export const fecthSlides = () => axios.get('/api/slider')