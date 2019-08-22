//libs
import React from 'react';
import Modal from 'react-modal';
import Geocode from "react-geocode";
import Switch from "react-switch";
import Select from 'react-select';

//style
import '../View.css';

//redux
import CheckLocAct from '../../../actions/CheckLocAct';
import CatModalAct from '../../../actions/LocModalAct';
import MapModalAct from '../../../actions/MapModalAct';
import AddLocAct from '../../../actions/AddLocAct';
import EditLocAct from '../../../actions/EditLocAct';
import OnOptionChangeAct from '../../../actions/OnOptionChangeAct';

//components
import MapContainer from '../map/MapContainer';

//api key
import {GOOGLE_API_KEY}  from '../map/MapContainer';

Geocode.setApiKey(GOOGLE_API_KEY);
// Geocode.enableDebug(); // throws errors

const TABLE_COLUMNS = [
    {
        label: 'name',
        sort: 'default',
    },{
        label: 'category',
    },{
        label: 'address',
    },
    {
        label: 'coordinates',
    }
];

const customStyles = {
  content : {
    width: '25em',
    height: '22em',
    left: '30%',
    top: '30%',
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

class Locations extends React.Component{
  constructor(props) {
      super(props);
      this.state = {
        ltLgVal:'',
        switch:false};
    }
    onSwitchSort = () => {
      this.setState({switch:!this.state.switch})
    }
  focusInput = (component) => {
      if (component) {
        component.focus();
      }
    };
  handleChange = selectedOption => {
   let option;
   if(Array.isArray(selectedOption)){
  option =   selectedOption.map(opt=>opt.value);
}else if(!selectedOption){
  option=null;
}else{
  option = selectedOption.value;
}
   this.props.data.dispatch(OnOptionChangeAct(option));
    };

  closeModal = () => {
    this.props.data.dispatch(CatModalAct(false,null));
    this.setState({ltLgVal: ''});
  }
  closeMapModal = () => {
    this.props.data.dispatch(MapModalAct);
  }

  requestLatLong = () =>{
    Geocode.fromAddress(document.querySelector('#loc_address').value).then(
  response => {
    const { lat, lng } = response.results[0].geometry.location;
    console.log(lat, lng);
    let coords = lat + ', ' +lng;
    this.setState({ltLgVal: coords});
  },
  error => {
    console.error(error);
    // alert('No coordinates found for this address, please type manually');
    this.setState({ltLgVal: ""});
  }
);
  }

  saveLoc = (e) => {
    e.preventDefault();
    const newLocation = {
      name: document.querySelector('#loc_name').value,
      category: this.props.data.locations.modal.locationCats,
      address: document.querySelector('#loc_address').value,
      coordinates: document.querySelector('#loc_coordinates').value
    }
    console.log(newLocation);
    const locs = this.props.data.locations.array;
    const locNames = new Set(locs.map((loc)=> {return loc['name']}));

if(locNames.has(newLocation.name)){
  alert(`The location ${newLocation.name} already exists!`);
  return false;
}
    if(Object.values(newLocation).some(input=> input ==='' || input === 'Choose location category')){
        alert('All fields must be filled!');
        return false;
      }
    this.props.data.dispatch(AddLocAct(newLocation));
    this.closeModal();
  }


  editLoc = () =>{
    const toEdit = this.props.data.locations.checked[0];
    const changeToInput = {
      name:document.querySelector('#loc_name').value,
      category: this.props.data.locations.modal.locationCats,
      address: document.querySelector('#loc_address').value,
      coordinates: document.querySelector('#loc_coordinates').value
    }
    this.props.data.dispatch(EditLocAct(toEdit, changeToInput));
    this.closeModal();

  }

  componentDidMount(){
    if(!JSON.parse(localStorage.getItem('locs'))){
      alert('No locations to display yet! Create some.');
    }
  }

  render(){
    const selectedCats = this.props.data.locations.modal.locationCats;
    const operation = this.props.data.locations.modal.operation;
    const options = this.props.data.categories.array.map(cat=> {
      return {value:cat,label:cat}
    });
    return(
      <div className="locations-box view">
        <div className="locs-table-box">
        <label className="switch-box">
          <span className="switch-label">by name   </span>
          <Switch uncheckedIcon={false}
          height={10}
          width={18}
          checkedIcon={false}
          onColor={'#add8e6'}
          offColor={'#add8e6'}
          onChange={this.onSwitchSort}
          checked={this.state.switch}/>
          <span className="switch-label">   by cat.</span>
        </label>
          <table className="locs-table">
            <thead className="locs">
              <tr className='l-tr' onClick={this.openModal}>
                {TABLE_COLUMNS.map((element, index) =>
                  <th key={index}>{element.label}</th>)}
              </tr>
            </thead>

              <tbody>
                  {
                    this.state.switch ?
                    this.props.data.locations.array.sort((a, b) => (a.category > b.category) ? 1 : -1).map((location, indx)=>{
                    return <TR checked={new Set(this.props.data.locations.checked).has(location)} location={location} key={`TR${indx}`} indx={indx} dispatch={this.props.data.dispatch}/>
                  })
                  :
                  this.props.data.locations.array.sort((a, b) => (a.name > b.name) ? 1 : -1).map((location, indx)=>{
                  return <TR checked={new Set(this.props.data.locations.checked).has(location)} location={location} key={`TR${indx}`} indx={indx} dispatch={this.props.data.dispatch}/>
                })
                }
              </tbody>
          </table>
        </div>

        <Modal
             isOpen={this.props.data.locations.modal.locModalIsOpen}
             onRequestClose={this.closeModal}
             style={customStyles}
           >
            <div className="modal-title">
              <h2 className="modal-title locs">{operation} Location</h2>
            </div>
            <form onSubmit={e => operation === 'ADD' ? this.saveLoc(e) : this.editLoc(e)}>
               <label htmlFor="loc_name">Loc. name:</label>
               <input  ref={this.focusInput} className="text" id="loc_name"
               placeholder="Type loc. name"
               defaultValue={operation==='EDIT' ? this.props.data.locations.checked[0].name : null}/>

               <label htmlFor="loc_address">Loc. address:</label>
               <input onChange={this.requestLatLong} className="text" id="loc_address" placeholder="Type loc. address"
               defaultValue={operation==='EDIT' ? this.props.data.locations.checked[0].address : null}/>

               <label htmlFor="loc_coordinates">Loc. coordinates:</label>
               <input className="text" id="loc_coordinates" placeholder= "Type loc. coordinates"
               defaultValue={operation==='EDIT' ? this.props.data.locations.checked[0].coordinates : this.state.ltLgVal}/>

               <label htmlFor="loc_category" >Loc. category:</label>

            <Select
       value={selectedCats===null ? null : !Array.isArray(selectedCats) ? {label:selectedCats,value:selectedCats} : selectedCats.map(c=>{return{label:c,value:c}})}
       onChange={this.handleChange}
       options={options}
       isMulti
       placeholder="Select categories"
     />

                <button type="button" className="cancel" onClick={this.closeModal}>cancel</button>
                <button className="save" type="submit">save</button>
            </form>
            </Modal>

            <Modal
                 isOpen={this.props.data.map}
                 onRequestClose={this.closeMapModal}
                 style={mapModalStyle}>
                 <MapContainer locations ={this.props.data.locations.checked}/>
            </Modal>

      </div>
    );
  }
}

export default Locations;

 class TR extends React.Component{

  handleClick = () => {
    this.props.dispatch(CheckLocAct(this.props.location))
  }

render(){

  return(
    <tr onClick={this.handleClick} className='l-tr' key={`tr${this.props.indx}`} style={{backgroundColor: this.props.checked ? "lightblue" : null}}>
      {Object.values(this.props.location).map((field, indx)=> {
        return <td key={`td${this.props.indx}${indx}`}>{Array.isArray(field)? field.join(", ") : field}</td>
      })}
    </tr>
  );
}
}
