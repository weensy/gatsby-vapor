import React, { Component } from "react";
import { Link } from "gatsby"
import Tags from "./tags"

class PostCard extends Component {
  render() {
    const{props}=this.props;
    return (
      <article key={props.node.fields.slug}>
        <div className="post-card">
        <Tags tags={props.node.frontmatter.tags}/>
        <header>
          <h1>
            <Link to={props.node.fields.slug}>
            {props.node.frontmatter.title || props.node.fields.slug}
            </Link>
          </h1>
          <small>{props.node.frontmatter.date}</small>
        </header>
        {props.node.frontmatter.thumbnail &&
          <img
            alt={props.node.frontmatter.thumbnail.childImageSharp.fluid.originalName}
            src={props.node.frontmatter.thumbnail.childImageSharp.fluid.src}
          />
        }
        <section>
          <p
            dangerouslySetInnerHTML={{
            __html: props.node.frontmatter.description || props.node.excerpt,
            }}
          />
        </section>
      </div>
    </article>
    );
  }
}

export default props => (
  <PostCard props={props}/>
)