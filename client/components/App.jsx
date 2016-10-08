import React from 'react';
import axios from 'axios';
import Landing from './Landing.jsx';
import Form from './Form.jsx';
import CTA from './CTA.jsx';

// Import material UI components
import {Card, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Define copy, error messages, and validation regex rules
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

// Define initial state
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
  done: false,
  buttonText: 'Sign Up or Log In'
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  handleClick() {
    let nextState;

    if (!this.state.expanded) {
      nextState = initialState;
      nextState.email = this.state.email;
      if (this.state.email && emailPattern.test(this.state.email)) {
        this.setState({buttonText: 'Loading...'});
        // Post email address to db
        return axios.post('http://localhost:4568/api/applicants', {email: this.state.email})
        .then((res) => {
          nextState.expanded = true;
          nextState.emailErrorText = null;  
          nextState.buttonText = 'Submit';

          if (res.data.firstname) {
            nextState.firstname = res.data.firstname;
            nextState.lastname = res.data.lastname;
            nextState.phoneNumber = res.data.phoneNumber;
            nextState.zipCode = res.data.zipCode;
            nextState.dob = res.data.dob;
            nextState.ssn = res.data.ssn;
            nextState.allowBgCheck = true;
            nextState.applicationDate = res.data.applicationDate;
          }
          this.setState(nextState);
        });
      } else {
        nextState.emailErrorText = emailErrorText;
      }  
    } else if (this.state.firstname && this.state.lastname && 
               this.state.phoneNumber && this.state.zipCode &&
               this.state.dob && this.state.ssn && 
               this.state.allowBgCheck && this.state.email) {
      let currentDate = new Date();
      let day = currentDate.getDate();
      let month = currentDate.getMonth() + 1;
      let year = currentDate.getFullYear();
      let dateonly = year + '/' + month + '/' + day;

      // Post form to db and then update state
      let body = {
        firstname: this.state.firstname, 
        lastname: this.state.lastname, 
        phoneNumber: this.state.phoneNumber, 
        zipCode: this.state.zipCode,
        dob: this.state.dob, 
        ssn: this.state.ssn, 
        email: this.state.email,
        workflow_state: 'applied',
        applicationDate: this.state.applicationDate || dateonly
      };

      this.setState({buttonText: 'Loading...'});

      return axios.post('http://localhost:4568/api/applicants', body)
      .then((res) => {
        nextState = {
          expanded: false,
          title: doneTitle,
          copy: doneCopy,
          emailErrorText: null,
          done: true
        };
        this.setState(nextState);
      });
    } else {
      nextState = {emailErrorText: "Please complete all fields before submitting"};
    } 

    this.setState(nextState);
  }

  validateEmail(event) {
    if (!event.target.value || !emailPattern.test(event.target.value)) {
      this.setState({
        email: null,
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
        [event.target.name]: null,
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
        phoneNumber: null,
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
        zipCode: null,
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
        dob: null,
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
        ssn: null,
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
          <Landing title={this.state.title} copy={this.state.copy}/>
          <CardText expandable={true} >
            <Form 
              errorStyle={errorStyle}
              firstnameErrorText={this.state.firstnameErrorText}
              lastnameErrorText={this.state.lastnameErrorText}
              phoneNumberErrorText={this.state.phoneNumberErrorText}
              zipErrorText={this.state.zipErrorText}
              dobErrorText={this.state.dobErrorText}
              ssnErrorText={this.state.ssnErrorText}
              
              validateName={this.validateName.bind(this)}
              validatePhoneNumber={this.validatePhoneNumber.bind(this)}
              validateZipCode={this.validateZipCode.bind(this)}
              validateDOB={this.validateDOB.bind(this)}
              validateSSN={this.validateSSN.bind(this)}
              handleCheck={this.handleCheck.bind(this)}
              
              firstname={this.state.firstname}
              lastname={this.state.lastname}
              phoneNumber={this.state.phoneNumber}
              zipCode={this.state.zipCode}
              dob={this.state.dob}
              ssn={this.state.ssn}
              allowBgCheck={this.state.allowBgCheck}
            />
          </CardText>

          <Divider style={{marginTop: '30px'}} />

          { !this.state.done ? 
            <CTA
              errorStyle={errorStyle}
              emailErrorText={this.state.emailErrorText}
              validateEmail={this.validateEmail.bind(this)}
              buttonText={this.state.buttonText}
              handleClick={this.handleClick.bind(this)}
            /> : null }

        </Card>
      </MuiThemeProvider>
    );
  }
}