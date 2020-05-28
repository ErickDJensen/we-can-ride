import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import Input from '@material-ui/core/Input';
import { Link } from 'react-router-dom';


const moment = require('moment');

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontsize: 14,
    }
}))(TableCell)

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
    absolute: {
        position: 'absolute',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 3,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    volunteerHover: {
        "&:hover": {
            color: "blue !important"
        }
    },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    'sidewalker',
    'leader',
    'barn aid',
    'feeder',
];

class ManageVolunteersList extends Component {

    state = {
        name: [],
    };

    handleChange = event => {
        this.setState({ name: event.target.value });
    };

    handleChangeMultiple = event => {
        const { options } = event.target;
        const value = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        this.setState({
            name: value,
        });
    };

    goToEditPage = (id) => {
        console.log('In goToEditPage', id)
        this.props.dispatch( { type: 'FETCH_SELECTED_VOLUNTEER', payload: id } );
    }

    disableVolunteer = (id) => {
        console.log('In disableVolunteer', id)
    }

    render() {
        const { classes } = this.props
        return (
            <>
                {this.props.state.volunteer.volunteer.map(volunteer => {
                    return <TableRow className={classes.row} key={volunteer.id}>
                        <CustomTableCell className="edit-link">
                            <Link to="/editVolunteer" onClick={() => this.goToEditPage(volunteer.id)}>
                                {volunteer.first_name} {volunteer.last_name}
                            </Link>
                        </CustomTableCell>
                        <CustomTableCell>
                            {moment(volunteer.birthday).fromNow(true)}
                        </CustomTableCell>
                        <CustomTableCell>

                        </CustomTableCell>
                        <CustomTableCell>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="select-multiple-checkbox">Role</InputLabel>
                                <Select
                                    multiple
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                    input={<Input id="select-multiple-checkbox" />}
                                    renderValue={selected => selected.join(', ')}
                                    MenuProps={MenuProps}
                                >
                                    {names.map(name => (
                                        <MenuItem key={name} value={name}>
                                            <Checkbox checked={this.state.name.indexOf(name) > -1} />
                                            <ListItemText primary={name} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </CustomTableCell>
                        <CustomTableCell>
                            <Button variant="contained" onClick={() => this.disableVolunteer(volunteer.id)}>Disable</Button>
                        </CustomTableCell>
                    </TableRow>
                })}
            </>
        )
    }
}


const mapStateToProps = state => ({
    state,
    classes: PropTypes.object.isRequired,
});

export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(ManageVolunteersList));