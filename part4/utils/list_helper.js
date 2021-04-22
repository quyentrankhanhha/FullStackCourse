// a dummy function that receives an array of blog posts as a parameter and always returns the value 1

const dummy = (blogs) => {
  let blogArray = [...blogs];
  return 1;
};

// Define a new totalLikes function that receives a list of blog posts as a parameter. The function returns the total sum of likes in all of the blog posts.

const totalLikes = (blogPosts) => {
  var likesArray = blogPosts.map((post) => post.likes);
  var total = likesArray.reduce((a, b) => a + b);
  return total;
};

// Define a new favoriteBlog function that receives a list of blogs as a parameter. The function finds out which blog has most likes. If there are many top favorites, it is enough to return one of them.

const favoriteBlog = (blogPosts) => {
  var likesArray = blogPosts.map((post) => post.likes);
  var maxLikes = Math.max(...likesArray);
  var mostLikes = blogPosts.findIndex((post) => maxLikes === post.likes);
  var favMost = {
    title: blogPosts[mostLikes].title,
    author: blogPosts[mostLikes].author,
    likes: blogPosts[mostLikes].likes
  };
  return favMost;
};

// Define a function called mostBlogs that receives an array of blogs as a parameter. The function returns the author who has the largest amount of blogs

const mostBlogs = (blogs) => {
  var likesArray = blogs.map((post) => post.blogs);
  var maxLikes = Math.max(...likesArray);
  var mostLikes = blogs.findIndex((post) => maxLikes === post.blogs);
  var favMost = {
    author: blogs[mostLikes].author,
    blogs: blogs[mostLikes].blogs
  };
  return favMost;
};

// The function returns the author, whose blog posts have the largest amount of likes. The return value also contains the total number of likes that the author has received:

const mostLikes = (blogs) => {
  var likesArray = blogs.map((post) => post.likes);
  var a = Math.max(...likesArray);
  var mostLikes = blogs.findIndex((post) => a === post.likes);
  var fav = {
    author: blogs[mostLikes].author,
    likes: blogs[mostLikes].likes
  };
  return fav;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
