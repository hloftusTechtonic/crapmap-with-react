import React, { Component } from 'react';
import logo from '../assets/crapmap-logo-horizontal-gray.png'
import {NavLink} from 'react-router-dom'
import MyListingsModal from '../MyListings/MyListingsModal'
import SideMenu from '../SideMenu/SideMenu'
import MyAccountModal from '../myAccount/MyAccountModal';
export default class Navigation extends Component {

  constructor(props) {
    super(props);

    this.state = {
      category: 'All',
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (e) => {
    switch (e.target.value) {
      case "car":
        this.setState({ category: 'Auto-Parts', color: '#80334f !important' }, () => { console.log(this.state.category, this.state.color) });
        break;
      case "baseball-ball":
        this.setState({ category: "Sports", color: '#5200e8 !important' }, () => { console.log(this.state.category, this.state.color) });
        break;
      case "tv":
        this.setState({ category: "Electronics", color: '#467290 !important' }, () => { console.log(this.state.category, this.state.color) });
        break;
      case "question-circle":
        this.setState({ category: "Misc", color: '#00ffde !important' }, () => { console.log(this.state.category, this.state.color) });
        break;
      case "couch":
        this.setState({ category: "Furniture", color: '#ff4700 !important' }, () => { console.log(this.state.category, this.state.color) });
        break;
      default:
        this.setState({ category: "All", color: '#000' }, () => { console.log(this.state.category, this.state.color) });
    }
  }

  // toggleModal = (event) => {
  //   var targetID = event.target.id

  //   this.setState({
  //     [targetID]: !this.state.targetID
  //   })
  // }

  render() {
    
    return (
    <div className='home-page-body' >
      <NavLink exact to='/home'><img alt='crapmap logo' src={logo} className="home-page-logo"/></NavLink>
      <nav className="home-page-navbar">
        <ul className="main-nav-list" id="js-menu">
            <MyListingsModal />
            <MyAccountModal />
            <li onClick={this.toggleHamburger} class="hamburger-menu"><SideMenu /></li>
        </ul>
      </nav>
    </div>
    )
  }
}
