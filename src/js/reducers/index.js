

const initialState = {
  articles: [],
  cart: [],
  product: [],
  category: [],
  user: [],
  selectProduct:[]
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
      product: state.product.concat(action.payload)
    });
  }
  if (action.type === 'ADD_CATEGORY') {
    return Object.assign({}, state, {
      category: state.category.concat(action.payload)
    });
  }
  if (action.type === 'ADD_USER') {
    return Object.assign({}, state, {
      user: state.user.concat(action.payload)
    });
  }
  if (action.type === 'SELECT_PRODUCT') {
    return Object.assign({}, state, {
      selectProduct: action.payload
    });
  }
  return state;
}

export default rootReducer;