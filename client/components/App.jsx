import React from 'react';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  }

  handleExpand() {
    this.setState({expanded: true});
  }

  render() {
    return (
      <MuiThemeProvider>
        <Card className="modal center" expanded={this.state.expanded} >
          
          <CardTitle title="Apply now to become a Gruber Shopper!" />
          <CardText >
            Earn some extra dough by shopping for... dough... and other groceries. 
            Be a Shopper, Driver, or both, all on your own schedule. It's rewarding, easy, and most of all -- fun!
          </CardText>

          <CardText expandable={true} >
            <CardActions >
              <TextField
                hintText="John"
                floatingLabelText="First name"
              /> 
              <TextField
                hintText="Jones"
                floatingLabelText="Last name"
              />  <br />
              <TextField
                hintText="555-123-4567"
                floatingLabelText="Cell phone number"
              />
              <TextField
                hintText="90210"
                floatingLabelText="Zip code"
              />  <br />
              <TextField
                hintText="MM/DD/YYYY"
                floatingLabelText="Date of birth"
              /> 
              <TextField
                hintText="123-45-6789"
                floatingLabelText="Social Security Number"
              /> 
            </CardActions>
          </CardText>

          <Divider style={{marginTop: '30px'}} />


          <CardActions >
            <TextField
              hintText="Email address"
              floatingLabelText="Email"
            />
            <FlatButton 
              label={this.state.expanded ? "Continue" : "Sign Up or Log In" }
              backgroundColor="#a4c639"
              hoverColor="#8AA62F"
              onTouchTap={this.handleExpand.bind(this)} 
            />
          </CardActions>

        </Card>
      </MuiThemeProvider>
    );
  }
}