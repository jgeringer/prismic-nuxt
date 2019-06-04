/**
 * To learn more about Link Resolving check out the Prismic documentation
 */

export default function (doc) {
  if (doc.isBroken) {
    return '/not-found'
  }

  if (doc.type === 'blog_home') {
    if(doc.lang !== 'en-us') {
      return '/' + doc.lang
    }
    return '/'
  }

  if (doc.type === 'post') {
    if(doc.lang !== 'en-us') {
      return '/' + doc.lang + '/blog/' + doc.uid
    }
    return '/blog/' + doc.uid
  }

  return '/not-found'
}