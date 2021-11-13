import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  posts: [],
  comments: [],
  pages: 0,
  newer: null,
  older: null,
  profiles: null,
  activeProfile: {},
  banners: []
})
