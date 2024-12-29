

  const initialState = {
    bills: [],
    bill: {},
    category_bills: []
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case "GET_BILLS":
        return {
          ...state,
          bills: action.payload
        };
      case "DELETE_BILL":
        return {
          ...state,
          bills: state.bills.filter( bill => 
            (bill.id !== action.payload)
          )
        };
      case "ADD_BILL":
        console.log(action.payload);
        return {
          ...state,
          bills: [...state.bills, action.payload]
        };
      case "UPDATE_BILL":
        return {
          ...state,
          bills: state.bills.map(
            bill => (bill.id === action.payload.id
              ? (bill = action.payload)
              : bill)
          )
        };
      case "GET_BILL":
        console.log(action.payload);
        return {
          ...state,
          bill: action.payload
        };
      case "GET_CAT_BILLS":
        return {
          ...state,
          category_bills: action.payload
        };
      default:
        return state;
    }
  }
  