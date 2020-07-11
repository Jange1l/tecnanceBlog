import React, { Component } from "react"
import {Link} from "gatsby"
import ThemeChanger from "../components/themeChanger"
// import DropDownMenu from 'material-ui/DropDownMenu';
// import MenuItem from 'material-ui/MenuItem';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default (props) => (
  <nav className="navigation">
     <Link to="/contact">Authors</Link> 
    <ThemeChanger/>
  </nav>
  
)