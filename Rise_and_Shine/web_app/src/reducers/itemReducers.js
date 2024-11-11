//get current state  of  products   
//method accepts current state of products and action item and updates state in immutable manner
export const getAllitemsReducer = (state = { items: [] }, action) => {   
  switch (action.type) {
    case "GET_ITEMS_REQUEST":
      return {
        loading: true,
        ...state,
      };

    case "GET_ITEMS_SUCCESS":
      return {
        loading: false,
        items: action.payload,
      };
    case "GET_ITEMS_FAILED":
      return {
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export const addItemReducer = (state = { items: [] }, action) => {
  switch (action.type) {
    case "ADD_ITEM_REQUEST":
      return {
        loading: true,
        ...state,
      };

    case "ADD_ITEM_SUCCESS":
      return {
        loading: false,
        success: true,
      };
    case "ADD_ITEM_FAILED":
      return {
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export const getItemByIdReducer = (state = { items: [] }, action) => {
  switch (action.type) {
    case "GET_ITEM_BY_ID_REQUEST":
      return {
        loading: true,
        ...state,
      };

    case "GET_ITEM_BY_ID_SUCCESS":
      return {
        loading: false,
        item: action.payload,
      };
    case "GET_ITEM_BY_ID_FAILED":
      return {
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export const editItemReducer = (state = { items: [] }, action) => {
  switch (action.type) {
    case "EDIT_ITEM_REQUEST":
      return {
        editloading: true,
        ...state,
      };

    case "EDIT_ITEM_SUCCESS":
      return {
        editloading: false,
        editsuccess: true,
      };
    case "EDIT_ITEM_FAILED":
      return {
        editerror: action.payload,
        editloading: false,
      };

    default:
      return state;
  }
};