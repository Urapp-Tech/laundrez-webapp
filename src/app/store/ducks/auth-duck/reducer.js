import actionTypes from './actions-types'
const initialAuthState = {
    user: null, /* {
      "id": 1,
      "username": "admin",
      "email": "admin@demo.com",
      "accessToken": "access-token-8f3ae836da744329a6f93bf20594b5cc",
      "refreshToken": "access-token-f8c137a2c98743f48b643e71161d90aa",
      "roles": [1],
      "pic": "/media/users/300_25.jpg",
      "fullname": "Sean",
      "occupation": "CEO",
      "companyName": "Keenthemes",
      "phone": "456669067890",
      "address": {
        "addressLine": "L-12-20 Vertex, Cybersquare",
        "city": "San Francisco",
        "state": "California",
        "postCode": "45000"
      },
      "socialNetworks": {
        "linkedIn": "https://linkedin.com/admin",
        "facebook": "https://facebook.com/admin",
        "twitter": "https://twitter.com/admin",
        "instagram": "https://instagram.com/admin"
      }
    }, */
    authToken: undefined
};
export default function reducer(state = initialAuthState, action) {
    switch (action.type) {

        default:
            return state;
    }
};