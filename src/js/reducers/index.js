

const initialState = {
  articles: [],
  cart: [],
  product: [],
  category: [],
  user: [],
  userdetail:[],
  selectProduct:[],
  invoice:[]
};

function rootReducer(state = initialState, action) {
  if (action.type === 'ADD_ARTICLE') {
    return Object.assign({}, state, {
      articles: state.articles.concat(action.payload)
    });
  }
  if (action.type === 'ADD_CART') {
    return Object.assign({}, state, {
      cart: state.cart.concat(action.payload)
    });
  }
  if (action.type === 'ADD_PRODUCT') {
    return Object.assign({}, state, {
      product: action.payload
    });
  }
  if (action.type === 'ADD_CATEGORY') {
    return Object.assign({}, state, {
      category: action.payload
    });
  }
  if (action.type === 'ADD_USER') {
    return Object.assign({}, state, {
      user: action.payload
    });
  }
  if (action.type === 'ADD_USER_DETAIL') {
    return Object.assign({}, state, {
      userdetail: action.payload
    });
  }
  if (action.type === 'SELECT_PRODUCT') {
    return Object.assign({}, state, {
      selectProduct: action.payload
    });
  }
  if (action.type === 'INVOICE') {
    return Object.assign({}, state, {
      invoice: action.payload
    });
  }
  return state;
}

export default rootReducer;