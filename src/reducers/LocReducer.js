const initialState = {array:[], checked: []};
const LocReducer = (state = initialState, action) =>{
  switch(action.type){
    case 'ADD LOC':
    const locations = state.array.concat(action.payload);
    console.log(locations);
    console.log('pizda');
    localStorage.setItem('locs',JSON.stringify(locations));
    return {
      ...state,
       array:locations
     }

     case 'DELETE LOC':

     let locSet = new Set(state.array);
     let toRemoveSet = new Set(action.payload);
     let afterRemoval = new Set([...locSet].filter(loc => !toRemoveSet.has(loc)));
     localStorage.setItem('locs', JSON.stringify(Array.from(afterRemoval)));

     return {
       ...state,
       array: Array.from(afterRemoval),
       checked: []
     }

     case 'UPDATE LOC':
     let locs = state.array;
     let changeFrom = action.payload[0];
     let to = action.payload[1];
     locs[locs.indexOf(changeFrom)] = to;
     localStorage.setItem('locs', JSON.stringify(locs));
     return {...state, array: locs, checked: []};

     case 'CHECK LOC':
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


export default LocReducer;
