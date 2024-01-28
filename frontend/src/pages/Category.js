import React from 'react'
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';

const CATEGORY = gql`query GetCategory($id: ID!) {
  category(id: $id) {
    data {
      id
      attributes {
        name
        reviews {
          data {
            id
            attributes {
              rating
              title
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
    }
  }
}
`


function Category() {

  const { id } = useParams();
  const { loading, error, data } = useQuery(CATEGORY, {
    variables: { id: id }
  });

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :|</p>
  console.log(data)

  return (
    <div>
      <h1>{data.category.data.attributes.name}</h1>
      {data.category.data.attributes.reviews.data.map(review => (
        <div key={review.id} className='review-card'>
          <div className='rating'>{review.attributes.rating}</div>
          <h2>{review.attributes.title}</h2>

          {review.attributes.categories.data.map(category => {
            return <small key={category.id}>{category.attributes.name}</small>
          })}

          
          <p>{review.attributes.body[0].children[0].text.substring(0, 200)}...</p>
          <Link to={`/details/${review.id}`}>Read more</Link>
        </div>
      ))}
    </div>
  )
}

export default Category;
