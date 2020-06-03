import React, {Component} from 'react';

import {connect} from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import  moment  from 'moment';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flexGrow: 1,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  slot: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.light, 
    width: '200px'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});



//TODO use button to open a modal to create a new session

class RemoveVolunteer extends Component {
    
  state = {
    open: false,
    volunteer: ''
  };

  
  handleClickOpen = () => {
    this.setState({ open: true });
    this.props.dispatch({type: 'FETCH_VOLUNTEERS'})

  };

  handleClose = (blob) => {
    if(blob === 'create'){

      // console.log(`Sending assigned volunteer with session id: ${this.props.session_id}, slot id: ${this.props.slot_id}, user id: ${this.state.volunteer}`);
      this.props.dispatch({ type: 'ASSIGN_VOLUNTEER', 
                            payload: {volunteer_id: this.state.volunteer, 
                                      session_id: this.props.session_id,
                                      slot_id: this.props.slot_id}});


    }
    this.setState({ open: false });
  };

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;
   
return (
  <div>
    <Button color='secondary' variant='contained' onClick={this.handleClickOpen} >Remove Volunteer</Button>
          <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="assign-volunteer"
        >
          <DialogTitle id="assign-volunteer">Reassign A Volunteer</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Remove the volunteer from this position, and if you want, replace the volunteer with someone else.
              {JSON.stringify(this.state)}
            </DialogContentText>
              <Select
                value={this.state.volunteer}
                onChange={this.handleInputChangeFor('volunteer')}
                inputProps={{
                  volunteer: 'volunteer',
                }}
              >
                <MenuItem value="">
                  <em>No One</em>
                </MenuItem>
                {this.props.state.volunteer.volunteer.map( volunteer => (
                  <MenuItem value={volunteer.id}>{volunteer.first_name} {volunteer.last_name}</MenuItem>
                ))}
              </Select>
        
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={() => this.handleClose('create')} color="primary">
              Assign Volunteer
            </Button>
          </DialogActions>
        </Dialog>

      }     
  </div>
    )
  }
}

RemoveVolunteer.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    state
  });

export default withStyles(styles)(connect(mapStateToProps)(RemoveVolunteer));
