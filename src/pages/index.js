import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

var xhr = new XMLHttpRequest();
xhr.responseType = 'json';
xhr.open('POST', 'https://coolql.cool/graphql');
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.setRequestHeader('Accept', 'application/json');
xhr.onload = function () {
  console.log('data returned:', xhr.response);
}
xhr.send(JSON.stringify({ query: `{
  site(url: "https://news.ycombinator.com") {
    titles: selectAll(elem: "tr.athing") {
      id: attr(name: "id")
      numberOfLinks: count(elem: ".storylink")
      link: selectAll(elem: ".storylink") {
        text
        href
        class
        classList
      }
    }
  }
}` }));

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

export default IndexPage
