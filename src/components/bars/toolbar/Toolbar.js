//libs
import React from 'react';
import Modal from 'react-modal';


//icons
import AddIcon from '@material-ui/icons/AddRounded';
import RemoveIcon from '@material-ui/icons/DeleteRounded';
import ViewIcon from '@material-ui/icons/PageviewRounded';
import EditIcon from '@material-ui/icons/EditRounded';

//m-ui components
import Button from '@material-ui/core/Button';

//style
import '../Bar.css';

//redux
import CatModalAct from '../../../actions/CatModalAct';
import LocModalAct from '../../../actions/LocModalAct';
import MapModalAct from '../../../actions/MapModalAct';
import DeleteCatAct from '../../../actions/DeleteCatAct';
import DeleteLocAct from '../../../actions/DeleteLocAct';



var view;

Modal.setAppElement('#root');
class Toolbar extends React.Component {

oneOrMoreSelected = (arr) =>{
  if(arr.length<1){
    alert('No item selected');
    return false;
  }
  return true;
}
checkSelected = (operation, view) =>{
    let toEdit = view === 'categories' ? this.props.data.categories.checked : this.props.data.locations.checked;
    if(operation === 'EDIT'){
    if(toEdit.length>1){
      alert(`Multiple items selected!`);
      return false;
    }else if(toEdit.length<1){
      alert('No item selected!');
      return false;
      }
    }
    return true;
  }

  openCatModal = (operation,e) => {
    e.preventDefault();
    if(this.checkSelected(operation, 'categories')){
      this.props.data.dispatch(CatModalAct(operation))
    }
  }

  openLocModal = (operation, e) => {
    e.preventDefault();
    if(this.checkSelected(operation, 'locations')){
  this.props.data.dispatch(LocModalAct(operation))
}

  }

  openMapModal = () =>{
    this.props.data.dispatch(MapModalAct);
  }

   viewLoc = (e) => {
     e.preventDefault();
     this.props.data.dispatch(MapModalAct);
   }

  deleteCat = () => {
    let toRemove = this.props.data.categories.checked;
    if(this.oneOrMoreSelected(toRemove)){
      const conf = window.confirm(`Are you sure you want to delete [${toRemove}] from Cat. list?`);
      if(conf){
        this.props.data.dispatch(DeleteCatAct(toRemove));
      }
    }
  }

  deleteLoc = () => {
    let toRemove = this.props.data.locations.checked;
    console.log(toRemove);
    if(this.oneOrMoreSelected(toRemove)){
      console.log(toRemove);
      const conf = window.confirm(`Are you sure you want to delete [${toRemove.map(l=>l.name)}] from Loc. list?`);
      if(conf){
        this.props.data.dispatch(DeleteLocAct(toRemove));
    }
  }
}

render(){
  console.log(this.props);
  view = window.location.pathname.slice(1);
  return(
    <div className="toolbar-box bar">
      <Button disabled={view === ""} onClick={e => this.viewLoc(e)}>
        <ViewIcon/>
      </Button>
      <Button disabled={view === ""} onClick={e => {view === 'categories' ? this.openCatModal('ADD',e) : this.openLocModal('ADD',e)}}>
        <AddIcon/>
      </Button>
      <Button disabled={view === ""} onClick={e => {view === 'categories' ? this.deleteCat(e) : this.deleteLoc(e)}}>
        <RemoveIcon/>
      </Button>
      <Button disabled={view === ""} onClick={e => {view === 'categories' ? this.openCatModal('EDIT',e) : this.openLocModal('EDIT',e)}}>
        <EditIcon/>
      </Button>
    </div>
  );
}
}


export default Toolbar;
