//libs
import React from 'react';
import Modal from 'react-modal';

//style
import '../View.css';

//my components
import ListItem from '../listItem/ListItem';
import MapContainer from '../map/MapContainer';

//redux
import CatModalAct from '../../../actions/CatModalAct';
import MapModalAct from '../../../actions/MapModalAct';
import AddCatAct from '../../../actions/AddCatAct';
import EditCatAct from '../../../actions/EditCatAct';

const customStyles = {
  content : {
    width: '15em',
    height: '10em',
    left: '38%',
    top: '35%',
    border: '2px solid lightblue',
    borderRadius: '25px',
    padding: '5px'
    }
}

const mapModalStyle = {
  content : {
    ...customStyles.content,
     width: '65em',
    height: '35em',
    left: '10%',
    right:'10%',
    top:'9%',
    padding: '1em'
  }
}
Modal.setAppElement('#root');

class Categories extends React.Component{

  focusInput = (component) => {
      if (component) {
        component.focus();
      }
    };
  closeModal = () => {
    this.props.data.dispatch(CatModalAct(false));
  }
  closeMapModal = () => {
    this.props.data.dispatch(MapModalAct);
  }

componentDidMount(){
  if(!JSON.parse(localStorage.getItem('cats'))){
    alert('No categories to display yet! Create some.');
  }
}

saveCat = (e) => {
  e.preventDefault();
  let catNameInput = document.querySelector('#cat_name').value;
  let categories = this.props.data.categories.array ? this.props.data.categories.array : [];
  let catSet = new Set(categories);
  if(catSet.has(catNameInput)){
    alert(`Category '${catNameInput}' already exists!`);
    this.closeModal();
    return false;
  }else if(catNameInput===''){
    alert(`The field is empty!`);
    return false;
  }
  this.props.data.dispatch(AddCatAct(catNameInput));
  //categories.push(catNameInput);
  // localStorage.setItem('cats',JSON.stringify(categories));
  this.closeModal();
}

editCat = () => {
  const toEdit = this.props.data.categories.checked;
    const changeToInput = document.querySelector('#cat_name').value;
  this.props.data.dispatch(EditCatAct(toEdit[0], changeToInput));
  this.closeModal();
}

  render(){
    const operation = this.props.data.categories.modal.operation;
    return(
      <div className="categories-box view">
        <div className='cats-list-box'>
        <h2>Categories list:</h2>
          <ul className='cats-list'>
            {this.props.data.categories.array.sort().map(cat =>{
            return  cat===null ? null : <ListItem dispatch={this.props.data.dispatch} key={`cat.${cat}`}>{cat}</ListItem>
            })}
          </ul>
        </div>

        <Modal
           isOpen={this.props.data.categories.modal.catModalIsOpen}
           onRequestClose={this.closeModal}
           style={customStyles}>

          <div className="modal-title">
         <h2 className="modal-title cats">{this.props.data.categories.modal.operation} Category</h2>
         </div>

          <form onSubmit={e=> operation === 'ADD' ? this.saveCat(e) : this.editCat(e)}>
          <div className='modal-input-box'>
            <label htmlFor="cat_name">Cat. name:</label>
            <input ref={this.focusInput} className="text" id="cat_name" placeholder="Type cat. name"
            defaultValue={operation==='EDIT' ? this.props.data.categories.checked[0] : null}/>
          </div>
            <button type="button" className="cancel" onClick={this.closeModal}>cancel</button>
            <button className="save" type="submit">save</button>
          </form>
         </Modal>


         <Modal
              isOpen={this.props.data.map}
              onRequestClose={this.closeMapModal}
              style={mapModalStyle}>

              <MapContainer
              locations = {this.props.data.locations.array.filter(location=>new Set(this.props.data.categories.checked).has(location.category))}/>
         </Modal>
      </div>
    );
  }
}

export default Categories;
