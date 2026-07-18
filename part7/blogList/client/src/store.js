import { create } from 'zustand';
import blogService from './services/blogs';
import loginService from './services/login';


export const useBlogStore = create((set) => ({
  
  blogs: [],
  user: null,
  notification: null,

  
  initializeBlogs: async () => {
    const blogs = await blogService.getAll();
    set({ blogs: blogs.sort((a, b) => b.likes - a.likes) });
  },

  createBlog: async (newBlog) => {
    const savedBlog = await blogService.create(newBlog);
    set((state) => ({ blogs: [...state.blogs, savedBlog] }));
  },

  updateBlogLikes: async (id, updatedBlog) => {
    const returnedBlog = await blogService.update(id, updatedBlog);
    set((state) => ({
      blogs: state.blogs
        .map((b) => (b.id !== id ? b : returnedBlog))
        .sort((a, b) => b.likes - a.likes),
    }));
  },

  removeBlog: async (id) => {
    await blogService.remove(id);
    set((state) => ({ blogs: state.blogs.filter((b) => b.id !== id) }));
  },

 
  setUser: (user) => {
    if (user) blogService.setToken(user.token);
    set({ user });
  },

  login: async (credentials) => {
    const user = await loginService.login(credentials);
    window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
    blogService.setToken(user.token);
    set({ user });
  },

  logout: () => {
    window.localStorage.removeItem('loggedBlogAppUser');
    blogService.setToken(null);
    set({ user: null });
  },

 
  setNotification: (text, type = 'success') => {
    set({ notification: { text, type } });
    setTimeout(() => set({ notification: null }), 5000);
  },
}));


export const selectBlogs = (state) => state.blogs;
export const selectUser = (state) => state.user;
export const selectNotification = (state) => state.notification;