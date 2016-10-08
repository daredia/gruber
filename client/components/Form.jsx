import React from 'react';

// Import material UI components
import {CardActions} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import Checkbox from 'material-ui/Checkbox';

export default class Form extends React.Component {
  render() {
    return ( 
      <CardActions >
        <TextField
          hintText="John"
          floatingLabelText="First name"
          name="firstname"
          errorText={this.props.firstnameErrorText}
          errorStyle={this.props.errorStyle}
          onBlur={this.props.validateName}
          defaultValue={this.props.firstname}
        /> 
        <TextField
          hintText="Jones"
          floatingLabelText="Last name"
          name="lastname"
          errorText={this.props.lastnameErrorText}
          errorStyle={this.props.errorStyle}
          onBlur={this.props.validateName}
          defaultValue={this.props.lastname}
        />  <br />
        <TextField
          hintText="555-123-4567"
          floatingLabelText="Cell phone number"
          name="phoneNumber"
          errorText={this.props.phoneNumberErrorText}
          errorStyle={this.props.errorStyle}
          onBlur={this.props.validatePhoneNumber}
          defaultValue={this.props.phoneNumber}
        />
        <TextField
          hintText="90210"
          floatingLabelText="Zip code"
          name="zipCode"
          errorText={this.props.zipErrorText}
          errorStyle={this.props.errorStyle}
          onBlur={this.props.validateZipCode}
          defaultValue={this.props.zipCode}
        />  <br />
        <DatePicker 
          className="date-picker"
          hintText="MM/DD/YYYY"
          floatingLabelText="Date of birth"
          autoOk={true}
          name="dob"
          errorText={this.props.dobErrorText}
          errorStyle={this.props.errorStyle}
          onChange={this.props.validateDOB}
          defaultDate={this.props.dob ? new Date(Date.parse(this.props.dob)) : undefined}
        />
        <TextField
          hintText="123-45-6789"
          floatingLabelText="Social Security Number"
          name="ssn"
          errorText={this.props.ssnErrorText}
          errorStyle={this.props.errorStyle}
          onBlur={this.props.validateSSN}
          defaultValue={this.props.ssn}
        /> <br />
        <Checkbox
          className="bg-check"
          label="I allow Instacart to run a background check from a consumer reporting agency in connection with my application"
          onCheck={this.props.handleCheck}
          defaultChecked={this.props.allowBgCheck}
        />
      </CardActions>
    );
  }
}