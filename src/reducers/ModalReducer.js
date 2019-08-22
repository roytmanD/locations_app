const initialState = {mapModalIsOpen: false, catModalIsOpen: false, locModalIsOpen: false, operation: false};

const ModalReducer = (state = initialState, action) => {
  switch (action.type){
      case 'CAT MODAL':
      return {...state, catModalIsOpen: !state.catModalIsOpen, operation: action.payload}

      case 'LOC MODAL':
      return {...state, locModalIsOpen: !state.locModalIsOpen, operation: action.payload.operation,locationCats:action.payload.locationCats }

      case 'MAP MODAL':
      return {...state, mapModalIsOpen: !state.mapModalIsOpen}

      case 'OPTION CHANGE':
      return {...state, locationCats: action.payload}
      default:
       return state;
  }
}

export default ModalReducer;
