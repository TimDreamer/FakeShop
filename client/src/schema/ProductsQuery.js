import gql from 'graphql-tag';

export default gql`
	query {
		products {
			id
			name
			imageURL
			description
			brand
			category
			price
			countInStock
			rating
			numReviews
		}
	}
`;
