import React, { Component } from 'react';

import './Finished.scss';

export default class Finished extends Component {

  render() {
    // if (this.props.flatfair) {
      return (
        <div className="modal Finished">
          <div className="inner finished-header">
            <span role="img" aria-label="Party Popper">🎉</span>
            <h1>Congratulations on your new FlatFair</h1>
            <span role="img" aria-label="Party Popper">🎉</span>
          </div>
          <div className="inner finished-content">
            <div className="finished-details">
              <h3 className="finished-details-membership">
                {`£ ${this.props.flatfair.membershipFee} / month`}
              </h3>
            </div>
          </div>
          <div className="inner">
            <span role="img" aria-label="House">🏠</span>
            <p>Home sweet home! You made it! All the best settling in!</p> 
            <span role="img" aria-label="House">🏠</span>
          </div> 
        </div>
      )
    // } else {
    //   return null;
    // }
  }
}

