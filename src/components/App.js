
//libs
import React from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {connect} from 'react-redux';

//style
import './App.css';

//my components
import Toolbar from './bars/toolbar/Toolbar';
import Footer from './bars/footer/Footer';
import Locations from './view/locations/Locations';
import Categories from './view/categories/Categories';
import Index from './view/index/Index';

//redux
import AddCatAct from '../actions/AddCatAct';
import AddLocAct from '../actions/AddLocAct';

//test data
import {CATS} from '../test-data/localStorageCopy';
import {LOCS} from '../test-data/localStorageCopy';

class App extends React.Component {

  componentDidMount(){
    //fetching cats. from localStorage when component first mounts
    let cats = JSON.parse(localStorage.getItem('cats'));
    let locs = JSON.parse(localStorage.getItem('locs'));


    if(cats.length===0){ //TODO this some backup data. For development/testing only.
      cats = CATS;
      }
    if(locs.length===0){
      locs = LOCS
     }

    if(cats){
      this.props.dispatch(AddCatAct(cats));
    }
    if(locs){
      this.props.dispatch(AddLocAct(locs));
    }
  }


  render(){
    return (
      <div className="App">
        <Toolbar
        data={this.props}/>
          <Router>
            <Switch>
              <Route path="/" exact component={Index}/>
              <Route path="/locations"
              render={(props)=> <Locations data={this.props}/>}
              />
              <Route path="/categories"
              render={(props)=>
              <Categories
              data={this.props}
              dispatch={this.props.dispatch}/>}/>
            </Switch>
          </Router>
        <Footer dispatch={this.props.dispatch}/>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  categories: {
    array: state.categories.array,
    checked: state.categories.checked,
    modal: state.modal
  },
  locations: {
    array: state.locations.array,
    checked: state.locations.checked,
    modal: state.modal
  },
  map: state.modal.mapModalIsOpen
});
export default connect(mapStateToProps)(App);
