/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

// const { createFilePath } = require("gatsby-source-filesystem")

// exports.onCreateNode = ({ node, actions, getNode }) => {
//   const { createNodeField } = actions

//   // We only want to operate on `Mdx` nodes. If we had content from a
//   // remote CMS we could also check to see if the parent node was a
//   // `File` node here
//   if (node.internal.type === "LyricsJson") {
//     const value = createFilePath({ node, getNode })
//     // console.log(value)
//     createNodeField({
//       // Name of the field you are adding
//       name: "slug",
//       // Individual MDX node
//       node,
//       // Generated value based on filepath with "blog" prefix. We
//       // don't need a separating "/" before the value because
//       // createFilePath returns a path with the leading "/".
//       value: `/lyrics${value}`,
//     })
//   }
// }

const path = require("path")
exports.createPages = async ({ graphql, actions, reporter }) => {
  // Destructure the createPage function from the actions object
  const { createPage } = actions
  const result = await graphql(`
    query {
      allLyricsJson {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)
  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
  }
  // Create blog post pages.
  const posts = result.data.allLyricsJson.edges
  // We'll call `createPage` for each result
  posts.forEach(({ node }, index) => {
    createPage({
      // This is the slug we created before
      // (or `node.frontmatter.slug`)
      path: node.slug,
      // This component will wrap our MDX content
      component: path.resolve(`./src/templates/lyrics.js`),
      // We can use the values in this context in
      // our page layout component
      context: { slug: node.slug },
    })
  })
}
