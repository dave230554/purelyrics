import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

export default ({ data: lyrics }) => (
  <Layout>
    <SEO title="Home" />
    {console.log(lyrics)}
    <h1>{lyrics.lyricsJson.title}</h1>
    <p style={{ "white-space": `pre` }}>{lyrics.lyricsJson.lyrics}</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}></div>
  </Layout>
)

export const query = graphql`
  query GetLyrics($slug: String!) {
    lyricsJson(slug: { eq: $slug }) {
      title
      lyrics
    }
  }
`
