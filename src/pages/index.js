import React from "react"
import { Link } from "gatsby"
import styled, { css } from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"

import { StaticQuery, graphql } from "gatsby"
export default () => (
  <StaticQuery
    query={graphql`
      query MyQuery {
        allLyricsJson {
          edges {
            node {
              slug
              title
            }
          }
        }
      }
    `}
    render={data => (
      <Layout>
        <SEO title="Home" />
        <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}></div>
        <ul>
          {data.allLyricsJson.edges.map(({ node }) => (
            <li>
              <Link to={node.slug}>{node.title}</Link>
            </li>
          ))}
        </ul>
      </Layout>
    )}
  />
)
