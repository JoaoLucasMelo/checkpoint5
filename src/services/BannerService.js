import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"



class BannerService {
async getBanner(){
  const res = await api.get('api/ads')
  // logger.log('BANNER',res.data)
  AppState.banners = res.data
}
}
export const bannerService = new BannerService()