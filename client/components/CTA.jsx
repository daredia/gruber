import React from 'react';

// Import material UI components
import {CardActions} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

export default class CTA extends React.Component {
  render() {
    return ( 
      <CardActions >
        <TextField
          hintText="Email address"
          floatingLabelText="Email"
          errorText={this.props.emailErrorText}
          errorStyle={this.props.errorStyle}
          onBlur={this.props.validateEmail}
        />
        <FlatButton 
          className="button"
          disabled={this.props.buttonText === 'Loading...'}
          label={this.props.buttonText}
          backgroundColor="#a4c639"
          hoverColor="#8AA62F"
          onTouchTap={this.props.handleClick}
        />
      </CardActions>
    );
  }
}