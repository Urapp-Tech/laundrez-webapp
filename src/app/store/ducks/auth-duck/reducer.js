import { AuthActionTypes } from './actions-types';
const initialAuthState = {
  isProgress: false,
  isError: false,
  errorMsg: '',
  errorStatus: 0,
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
};
export function AuthReducer(state = initialAuthState, action) {
  switch (action.type) {
    case AuthActionTypes.LOGIN_PROG:
      return { ...state, isProgress: true };

    case AuthActionTypes.LOGIN_SUCC:
      return { ...state, isProgress: false, user: action.payload.user };

    case AuthActionTypes.LOGIN_FAIL:
      return { ...state, isProgress: false, isError: true, errorText: action.payload.message, errorStatus: action.payload.status };

    case AuthActionTypes.SET_USER:
      return { ...state, user: action.payload.user };
    default:
      return state;
  }
};