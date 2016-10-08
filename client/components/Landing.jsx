import React from 'react';

// Import material UI components
import {CardTitle, CardText} from 'material-ui/Card';

export default class Landing extends React.Component {
  render() {
    return ( 
      <div>
        <CardTitle title={this.props.title} />
        <CardText >
          {this.props.copy}
        </CardText>
      </div>
    );
  }
}