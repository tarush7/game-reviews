import React from 'react'
import { Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

const REVIEWS = gql`query GetReviews {
    reviews {
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

function Homepage() {
    const { loading, error, data } = useQuery(REVIEWS);

    if (loading) return <p>...loading</p>
    if (error) return <p>Error :|</p>

    return (
        <div>
            {data.reviews.data.map(review => (
                <div key={review.id} className='review-card'>
                    <div className='rating'>{review.attributes.rating}</div>
                    <h2>{review.attributes.title}</h2>

                    {review.attributes.categories.data.map(category => {
                        return <small key={category.id}>{category.attributes.name}</small>
                    })}

                    <p>{review.attributes.body[0].children[0].text.substring(0, 200)}...</p>
                    
                    <Link to={`/details/${review.id}`}>Read More</Link>
                </div>
            ))}
        </div>
    )
}

export default Homepage;