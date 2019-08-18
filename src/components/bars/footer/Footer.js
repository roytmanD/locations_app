//libs
import React from 'react';

//icons
import CategoriesIcon from '@material-ui/icons/List';
import LocationsIcon from '@material-ui/icons/LocationOn';

//m-ui components
import Button from '@material-ui/core/Button';

//style
import '../Bar.css';

class Footer extends React.Component{

  render(){
    return(
      <div className="footer-box bar">
        <Button>
          <a href="/locations">
            <LocationsIcon/>
          </a>
        </Button>
        <Button>
          <a href="/categories">
            <CategoriesIcon/>
          </a>
        </Button>
      </div>
    );
  }
}

export default Footer;
