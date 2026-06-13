import React from "react";
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Tags from "./tags"

const PostCard = ({ node }) => {
  const image = getImage(node.frontmatter.thumbnail)

  return (
    <div>
      <div className="post-card">
        <Tags tags={node.frontmatter.tags}/>
        <header>
          <h1>
            <Link to={node.fields.slug}>
            {node.frontmatter.title || node.fields.slug}
            </Link>
          </h1>
          <small>{node.frontmatter.date}</small>
        </header>
        {image &&
          <Link to={node.fields.slug}>
            <GatsbyImage
              image={image}
              alt={node.frontmatter.title || "Post thumbnail"}
            />
          </Link>
        }
        <section>
          <p
            dangerouslySetInnerHTML={{
            __html: node.frontmatter.description || node.excerpt,
            }}
          />
        </section>
        <div className="post-card-readmore">
          <Link to={node.fields.slug}>
            <span>Read more</span>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enableBackground="new 0 0 1000 1000" xmlSpace="preserve">
              <g><path d="M767.9,499.9L291.6,10l-59.4,61.3l416.6,428.7L232.1,928.7l59.5,61.3L767.9,499.9z"/></g>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PostCard
