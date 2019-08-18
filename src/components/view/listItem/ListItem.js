import React from 'react';
//style
import '../View.css';

//redux
import CheckCatAct from '../../../actions/CheckCatAct';


class ListItem extends React.Component{
  constructor(props){
    super(props);
    this.state = {selected: false}
  }

  handleClick = () => {
    this.props.dispatch(CheckCatAct(this.props.children))
    this.setState({selected: !this.state.selected})
  }


  render(){
    return(
      <li onClick={this.handleClick} className='cat-item' style={{backgroundColor: this.state.selected ? "lightblue" : null}}>
      {this.props.children}
      </li>
    );
  }
}


export default ListItem;
