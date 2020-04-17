import React, { Component } from "react";
import { Link } from "gatsby"
import Tags from "./tags"

class PostCard extends Component {
  render() {
    const{props}=this.props;
    return (
      <div key={props.node.fields.slug}>
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
            <Link to={props.node.fields.slug}><img
              alt={props.node.frontmatter.thumbnail.childImageSharp.fluid.originalName}
              src={props.node.frontmatter.thumbnail.childImageSharp.fluid.src}
            /></Link>
          }
          <section>
            <p
              dangerouslySetInnerHTML={{
              __html: props.node.frontmatter.description || props.node.excerpt,
              }}
            />
          </section>
          <div className="post-card-readmore">
            <Link to={props.node.fields.slug}>
              <span>Read more</span>
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xmlSpace="preserve">
                <g><path d="M767.9,499.9L291.6,10l-59.4,61.3l416.6,428.7L232.1,928.7l59.5,61.3L767.9,499.9z"/></g>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default props => (
  <PostCard props={props}/>
)