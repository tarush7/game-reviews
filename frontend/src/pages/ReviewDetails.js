import React from 'react'
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

const REVIEW = gql`query GetReview($id: ID!) {
    review(id: $id) {
      data {
        id
        attributes {
          title
          rating
          body
          categories {
            data {
              id
              attributes {
                name
              }
            }
          }
        }
      }
    }
  }
`

function ReviewDetails() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(REVIEW, {
    variables: { id: id }
  })

  if (loading) return <p>loading...</p>
  if (error) return <p>error :|</p>

  return (
    <div className='review-card'>
      <div className='rating'>{data.review.data.attributes.rating}</div>
      <h2>{data.review.data.attributes.title}</h2>

      {data.review.data.attributes.categories.data.map(category => {
        return <small key={category.id}>{category.attributes.name}</small>
      })}


      {data.review.data.attributes.body.map((item, index) => (
        item.children.map((child, i) => (
          <p key={i}>{child.text}</p>
        ))
      ))}
    </div>
  )
}

export default ReviewDetails;

