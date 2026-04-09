const Blog = require('../modules/blog');
const User = require('../modules/user');

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger Dijkstra',
    url: 'http://example.com',
    likes: 5,
  },
];

const initialUsers = [
  {
    username: 'Peter123',
    name: 'Peter Hill',
    passwordHash: '$2b$10$6C6yM.Y6Xq/1XpS1z.G.Ge.rE9R.S1G2H3I4J5K6L7M8N9' 
  },
  {
    username: 'Robort123',
    name: 'Peter MC',
    passwordHash: '$2b$10$8D7zN.Z7Yr/2YqT2z.H.Hf.sF0S.T2H3I4J5K6L7M8N9O0P'
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((b) => b.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map(u => u.toJSON());
}

module.exports = {
  initialBlogs,
  initialUsers,
  blogsInDb,
  usersInDb
};