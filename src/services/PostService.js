import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"



class PostService{
async getAll(){
  const res = await api.get('api/posts')
  AppState.posts = res.data.posts
  AppState.pages = res.data.totalPages
  AppState.older = res.data.older?.split('/')[4]
  AppState.newer = res.data.newer?.split('/')[4]
  logger.log('GET TO APPSTATE POSTS', AppState.posts)
  logger.log('GET TO APPSTATE PAGES', AppState.pages)
  logger.log('GET TO APPSTATE NEWER', AppState.newer)
  logger.log('GET TO APPSTATE OLDER', AppState.older)
}
async findPostByQuery(query){
  const res = await api.get(`api/posts?query=${query}`)
  logger.log('GET BY QUERY OR PAGE',res.data)
  AppState.posts = res.data.posts
  AppState.pages = res.data.totalPages
  AppState.older = res.data.older?.split('/')[4]
  AppState.newer = res.data.newer?.split('/')[4]
}
async getPostsProfileById(id){
  const res = await api.get('api/profiles/' + id + '/posts')
  logger.log('GET POST BY PROFILE ID',res.data)
  AppState.posts = res.data.posts
  AppState.pages = res.data.page
  let end = res.data.older
  AppState.older = res.data.older
  AppState.newer = res.data.newer
}
async create(data){

  const res = await api.post('api/posts', data)
  logger.log('POST CREATE POST',res.data)
  AppState.posts.unshift(res.data)
}
async remove(id){
  const res = await api.delete('api/posts/' + id)
  logger.log('DELETE POST',res.data)
  AppState.posts = AppState.posts.filter(p => p.id !== id)
}
async newer(){
  const res = await api.get('api/'+ AppState.newer)
  logger.log(res.data)
  AppState.posts = res.data.posts
  AppState.pages = res.data.totalPages
  AppState.older = res.data.older?.split('/')[4]
  AppState.newer = res.data.newer?.split('/')[4]
}
async older(){
  const res = await api.get('api/'+ AppState.older)
  logger.log(res.data)
  AppState.posts = res.data.posts
  AppState.pages = res.data.totalPages
  AppState.older = res.data.older?.split('/')[4]
  AppState.newer = res.data.newer?.split('/')[4]
  logger.log(AppState.newer)
}
}
export const postService = new PostService()