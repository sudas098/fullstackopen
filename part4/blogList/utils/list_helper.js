const dummy = (blog) => 1;

const totalLikes = (blogs) => {
   
   
    const likes = blogs.map(blog => blog.likes);
    console.log(likes);
    
    const reducer = (sum, item) => {
       return sum + item
    }

    return likes.length === 0 
                     ? 0
                     : likes.reduce(reducer, 0) / likes.length
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;

  return blogs.reduce((prev, current) => {
    return (prev.likes > current.likes) ? prev : current;
  });
};

module.exports = { dummy, totalLikes, favoriteBlog }