import React from 'react';

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