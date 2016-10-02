import React from 'react';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  }

  handleExpandChange(expanded) {
    this.setState({expanded: expanded});
  }

  handleExpand() {
    this.setState({expanded: true});
  }

  render() {
    return (
      <MuiThemeProvider>
        <Card className="modal center" expanded={this.state.expanded} onExpandChange={this.handleExpandChange.bind(this)}>
          
          <CardTitle title="Apply now to become a Gruber Shopper!" />
          <CardText >
            Earn some extra dough by shopping for... dough... and other groceries. 
            Be a Shopper, Driver, or both, all on your own schedule. It's rewarding, easy, and most of all -- fun!
          </CardText>
          
          {/* TODO: REPLACE WITH FORM*/}
          <CardTitle title="Card title" subtitle="Card subtitle" expandable={true} />
          <CardText expandable={true}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
          </CardText>

          <CardActions >
            <TextField
              hintText="Email address"
              floatingLabelText="Email"
            />
            <FlatButton 
              label="Sign Up or Log In" 
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