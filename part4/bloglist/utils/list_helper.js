const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    return blogs.reduce((acc, blog) => acc + blog.likes, 0)
  }

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    const favorite = blogs.reduce((acc, blog) => acc.likes > blog.likes ? acc : blog)

    return {
      title: favorite.title,
      author: favorite.author,
      likes: favorite.likes
    }
  }

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
      return null
    }

    const authors = blogs.reduce((acc, blog) => {
      acc[blog.author] = acc[blog.author] ? acc[blog.author] + 1 : 1
      return acc
    }, {})

    const mostBlogsAuthor = Object.entries(authors).reduce((acc, [author, blogs]) => acc.blogs > blogs ? acc : { author, blogs })

    return mostBlogsAuthor
  }

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
      return null
    }

    const authors = blogs.reduce((acc, blog) => {
      acc[blog.author] = acc[blog.author] ? acc[blog.author] + blog.likes : blog.likes
      return acc
    }, {})

    const mostLikesAuthor = Object.entries(authors).reduce((acc, [author, likes]) => acc.likes > likes ? acc : { author, likes })

    return mostLikesAuthor
  }

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}
