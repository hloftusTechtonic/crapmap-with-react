import React, { Component } from 'react'
import '../App.css'
import ExitButton from '../buttons/ExitButton'

import PropTypes from 'prop-types'
import {connect} from 'react-redux';


import { IconButton } from '@material-ui/core';

class MyListingsModal extends Component {
  constructor(){
    super();
    this.state = {
      user: {},
      pins: []
    }
  }

  componentDidUpdate(prevProps) {
    
    // reduces pins promise to just pin array on update
    if (this.props.pins !== prevProps.pins) {
      this.props.pins.then((val) => { this.setState({ pins: val.pins }) })
    }
  }

  render() {
    if (!this.props.show) {
      return null;
    }

    let posts = this.state.pins.map((pin) => {

      // each post needs key (unique property)
      // also need to ensure on the front end that no posts get submitted with a single empty field.

      return <div className='pin-card'>
        <span className='my-pin-image'></span>
        <p className='my-pin-title'>{pin._fieldsProto.title.stringValue}</p>
        <p className='my-pin-category'>{pin._fieldsProto.category.stringValue}</p>
      </div>
    })


    return (
        <div className='vertical-modal'>  
            <div className="header">
                <h2 >My Pins</h2>
            <IconButton onClick={this.props.onClose}>
            <ExitButton />
            </IconButton>
            </div>
            <hr/>
            <div className="items-listing-container">
              {posts}
            </div>
        </div>
)}}

MyListingsModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
}

function mapStateToProps(reduxState) {
  return {
    user: reduxState.user,
    pins: reduxState.pins
  }
}

export default connect(mapStateToProps)(MyListingsModal);
