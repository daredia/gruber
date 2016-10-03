import React from 'react';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import DatePicker from 'material-ui/DatePicker';
import Checkbox from 'material-ui/Checkbox';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const startTitle = "Apply now to become a Gruber Shopper!";
const startCopy = "Earn some extra dough by shopping for... dough... and other groceries. Be a Shopper, Driver, or both, all on your own schedule. It's rewarding, easy, and most of all -- fun!";
const doneTitle = "Your application has been received!";
const doneCopy = "Check your email for next steps, including a link to download our InstaShopper app.";
const errorStyle = {float: "left"};
const emailErrorText = 'Invalid email address';
const generalErrorText = 'This field is required';
const phoneNumberErrorText = 'Invalid phone number';
const zipErrorText = 'Invalid zip code';
const ssnErrorText = 'Invalid SSN';
const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const phonePattern = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;
const zipPattern = /^\d{5}([\-]?\d{4})?$/;
const ssnPattern = /(^\d{3}-?\d{2}-?\d{4}$|^XXX-XX-XXXX$)/;

let initialState = {
  title: startTitle,
  copy: startCopy,
  expanded: false,
  email: null,
  emailErrorText: null,
  firstname: null,
  firstnameErrorText: null,
  lastname: null,
  lastnameErrorText: null,
  phoneNumber: null,
  phoneNumberErrorText: null,
  zipCode: null,
  zipErrorText: null,
  ssn: null,
  ssnErrorText: null,
  dob: null,
  dobErrorText: null,
  allowBgCheck: false,
  done: false
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  handleClick() {
    console.log('state:', this.state);
    let nextState;

    if (!this.state.expanded) {
      nextState = initialState;
      nextState.email = this.state.email;
      if (this.state.email && emailPattern.test(this.state.email)) {
        nextState.expanded = true;
        nextState.emailErrorText = null;
      } else {
        nextState.emailErrorText = emailErrorText;
      }  
    } else if (this.state.firstname && this.state.lastname && 
               this.state.phoneNumber && this.state.zipCode &&
               this.state.dob && this.state.ssn && 
               this.state.allowBgCheck && this.state.email) {
      nextState = {
        expanded: false,
        title: doneTitle,
        copy: doneCopy,
        emailErrorText: null,
        done: true
      };
    } else {
      nextState = {emailErrorText: "Please complete all fields before submitting"}
    } 

    this.setState(nextState);
  }

  validateEmail(event) {
    if (!event.target.value || !emailPattern.test(event.target.value)) {
      this.setState({
        emailErrorText: emailErrorText
      });
    } else {
      this.setState({
        email: event.target.value.trim(),
        emailErrorText: null
      });
    }
  }

  validateName(event) {
    let errorText = event.target.name === 'firstname' ? 'firstnameErrorText' : 'lastnameErrorText';
    if (!event.target.value.trim()) {
      this.setState({
        [errorText]: generalErrorText
      });
    } else {
      this.setState({
        [event.target.name]: event.target.value.trim(),
        [errorText]: null
      });
    }
  }

  validatePhoneNumber(event) {
    if (!event.target.value || !phonePattern.test(event.target.value)) {
      this.setState({
        phoneNumberErrorText: phoneNumberErrorText
      });
    } else {
      this.setState({
        phoneNumber: event.target.value.trim(),
        phoneNumberErrorText: null
      });
    }
  }

  validateZipCode(event) {
    if (!event.target.value || !zipPattern.test(event.target.value)) {
      this.setState({
        zipErrorText: zipErrorText
      });
    } else {
      this.setState({
        zipCode: event.target.value.trim(),
        zipErrorText: null
      });
    }
  }

  validateDOB(event, date) {
    if (!date) {
      this.setState({
        dobErrorText: generalErrorText
      });
    } else {
      this.setState({
        dob: date,
        dobErrorText: null
      });
    }
  }

  validateSSN(event) {
    if (!event.target.value || !ssnPattern.test(event.target.value)) {
      this.setState({
        ssnErrorText: ssnErrorText
      });
    } else {
      this.setState({
        ssn: event.target.value.trim(),
        ssnErrorText: null
      });
    }
  }

  handleCheck(event, isInputChecked) {
    this.setState({allowBgCheck: isInputChecked});
  }

  render() {
    return (
      <MuiThemeProvider>
        <Card className="modal center" expanded={this.state.expanded} >
          
          <CardTitle title={this.state.title} />
          <CardText >
            {this.state.copy}
          </CardText>

          <CardText expandable={true} >
            <CardActions >
              <TextField
                hintText="John"
                floatingLabelText="First name"
                name="firstname"
                errorText={this.state.firstnameErrorText}
                errorStyle={errorStyle}
                onBlur={this.validateName.bind(this)}
              /> 
              <TextField
                hintText="Jones"
                floatingLabelText="Last name"
                name="lastname"
                errorText={this.state.lastnameErrorText}
                errorStyle={errorStyle}
                onBlur={this.validateName.bind(this)}
              />  <br />
              <TextField
                hintText="555-123-4567"
                floatingLabelText="Cell phone number"
                name="phoneNumber"
                errorText={this.state.phoneNumberErrorText}
                errorStyle={errorStyle}
                onBlur={this.validatePhoneNumber.bind(this)}
              />
              <TextField
                hintText="90210"
                floatingLabelText="Zip code"
                name="zipCode"
                errorText={this.state.zipErrorText}
                errorStyle={errorStyle}
                onBlur={this.validateZipCode.bind(this)}
              />  <br />
              <DatePicker 
                className="date-picker"
                hintText="MM/DD/YYYY"
                floatingLabelText="Date of birth"
                autoOk={true}
                name="dob"
                errorText={this.state.dobErrorText}
                errorStyle={errorStyle}
                onChange={this.validateDOB.bind(this)}
              />
              <TextField
                hintText="123-45-6789"
                floatingLabelText="Social Security Number"
                name="ssn"
                errorText={this.state.ssnErrorText}
                errorStyle={errorStyle}
                onBlur={this.validateSSN.bind(this)}
              /> <br />
              <Checkbox
                className="bg-check"
                label="I allow Instacart to run a background check from a consumer reporting agency in connection with my application"
                onCheck={this.handleCheck.bind(this)}
              />
            </CardActions>
          </CardText>

          <Divider style={{marginTop: '30px'}} />


          { !this.state.done ?
            <CardActions >
              <TextField
                hintText="Email address"
                floatingLabelText="Email"
                errorText={this.state.emailErrorText}
                errorStyle={errorStyle}
                onBlur={this.validateEmail.bind(this)}
              />
              <FlatButton 
                label={this.state.expanded ? "Submit" : "Sign Up or Log In" }
                backgroundColor="#a4c639"
                hoverColor="#8AA62F"
                onTouchTap={this.handleClick.bind(this)} 
              />
            </CardActions> : null 
          }

        </Card>
      </MuiThemeProvider>
    );
  }
}