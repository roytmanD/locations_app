const initialState = {array:[], checked: []};
const CatReducer = ( state = initialState, action) => {
  switch (action.type) {
    case 'ADD CAT':
    const categories = state.array.concat(action.payload);
    localStorage.setItem('cats',JSON.stringify(categories));
    return {
      ...state,
       array:categories
     }
      case 'DELETE CAT':

      let catsSet = new Set(state.array);
      let toRemoveSet = new Set(action.payload);
      let afterRemoval = new Set([...catsSet].filter(cat => !toRemoveSet.has(cat)));
      localStorage.setItem('cats', JSON.stringify(Array.from(afterRemoval)));

      return {
        ...state,
        array: Array.from(afterRemoval),
        checked: []
      }

      case 'UPDATE CAT':
      let cats = state.array;
      let changeFrom = action.payload[0];
      let to = action.payload[1];
      cats[cats.indexOf(changeFrom)] = to;
      localStorage.setItem('cats', JSON.stringify(cats));
      return {...state, array: cats, checked: []};

      case 'CHECK CAT':
      let checkedSet = new Set(state.checked);
      if(checkedSet.has(action.payload)){
        checkedSet.delete(action.payload);
      }else{
        checkedSet.add(action.payload);
      }
      let checkedArr = Array.from(checkedSet);
      return {...state, checked: checkedArr}

    default:
    return state;
  }
}

export default CatReducer;
