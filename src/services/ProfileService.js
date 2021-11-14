import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class ProfileService{

  async getProfile(query){
    const res = await api.get('api/profiles?query=' + query)
    // logger.log('GET PROFILES',res.data)
    AppState.profiles = res.data
        // logger.log('GET PROFILES',AppState.profiles)
  }
  async getProfileById(id){
    const res = await api.get('api/profiles/' + id)
        // logger.log('GET PROFILE BY ID',res.data)
        AppState.activeProfile = res.data
        // logger.log('ACTIVE PROFILE',AppState.activeProfile)
  }
  async profile(){
    AppState.activeProfile = AppState.account
  }
}

export const profileService = new ProfileService()