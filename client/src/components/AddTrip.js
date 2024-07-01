import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import clsx from "clsx";
import { connect } from "react-redux";
import { addTripDetails } from "../store/actions/cityActions";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormHelperText from "@material-ui/core/FormHelperText"; //maybe to give tips on password
import ModalAlert from "./ModalAlert";
import { clearErrors } from "../store/actions/errActions";
import "../styles/registration.css";

const styles = (theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
});

class AddTrip extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      password: "",
      modeOfTrip: "",
      firstName: "",
      lastName: "",
      country: "",
      modalState: false,
      showPassword: false,
      firstNameError: false,
      passwordError: false,
      modeOfTripError: false,
      firstNameError: false,
      lastNameError: false,
      countryError: false,
      errorTitle: "",
      errorMsg: "",
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleMouseDownPassword = (e) => {
    e.preventDefault();
  };


  handleSubmit = async (e) => {
    e.preventDefault();
    //destructure fields from state
    const { firstName, lastName, country, modeOfTrip, startDate, endDate } =
      this.state;

    //toogle UI error
    if (firstName === "") {
      this.setState({ firstNameError: true });
    } else {
      this.setState({ firstNameError: false });
    }
    if (firstName === "") {
      this.setState({ firstNameError: true });
    } else {
      this.setState({ firstNameError: false });
    }
    if (lastName === "") {
      this.setState({ lastNameError: true });
    } else {
      this.setState({ lastNameError: false });
    }
    if (country === "") {
      this.setState({ countryError: true });
    } else {
      this.setState({ countryError: false });
    }
    if (startDate === "") {
      this.setState({ startDateError: true });
    } else {
      this.setState({ startDateError: false });
    }
    if (endDate === "") {
      this.setState({ endDateError: true });
    } else {
      this.setState({ endDateError: false });
    }

    //toggle modal msg
    if (
      firstName === "" ||
      lastName === "" ||
      country === "",
      modeOfTrip === ""
    ) {
      this.setState({ errorMsg: "Please enter all fields.", modalState: true });
      //else, submit form
    }
    //uncomment!
    else {
      this.props.addTripDetails({  firstName, lastName, country, modeOfTrip, startDate, endDate });
    }
    console.log("Form was sent");
  };

  handleCloseAlert = async () => {
    if (this.props.error.status !== null) {
      this.props.clearErrors();
    } else if (this.state.modalState) {
      await this.setState({ modalState: false });
    }
  };

  render() {
    const { classes, isAuthenticated, error } = this.props;
    const {
      firstName,
      lastName,
      country,
      startDate,
      endDate,
      modeOfTrip
    } = this.state;

    if (isAuthenticated) {
      return <Redirect to="/" />;
    } else {
      return (
        <div className={classes.root}>
          {error.status !== null ? (
            <ModalAlert
              title={`Error ${error.status}: Cannot Register`}
              msg={error.msg}
              handleCloseAlert={this.handleCloseAlert}
            />
          ) : this.state.modalState ? (
            <ModalAlert
              title={"Cannot register"}
              msg={this.state.errorMsg}
              handleCloseAlert={this.handleCloseAlert}
            />
          ) : null}
          <form id="addTrip" onSubmit={(e) => this.handleSubmit(e)}>
            <div className="Form-mui-parent">
              {/* <div
                className="Form-avatar"
                style={{ backgroundImage: avatar }}
              ></div> */}
              {/* <InputLabel htmlFor="upload-button"> */}
              {/* <Button color="primary" component="span" size="small"> */}
              {/* Change Photo */}
              {/* </Button> */}
              {/* </InputLabel> */}
              <FormControl
                fullWidth
                className={classes.margin}
                variant="outlined"
              >
                {/* <InputLabel htmlFor="register-username">Username</InputLabel> */}
                {/* <OutlinedInput
                  id="register-username"
                  name="username"
                  value={username}
                  onChange={this.handleChange}
                  placeholder="billtravel97"
                  labelWidth={75}
                  error={this.state.usernameError}
                /> */}
                <InputLabel htmlFor="register-firstName">First Name</InputLabel>
                <OutlinedInput
                  id="register-firstName"
                  name="firstName"
                  value={firstName}
                  onChange={this.handleChange}
                  placeholder="First Name"
                  labelWidth={80}
                  error={this.state.firstNameError}
                />
              </FormControl>
              <FormControl
                fullWidth
                className={classes.margin}
                variant="outlined"
              >
                <InputLabel htmlFor="register-lastName">Last Name</InputLabel>
                <OutlinedInput
                  id="register-lastName"
                  name="lastName"
                  value={lastName}
                  onChange={this.handleChange}
                  placeholder="Last Name"
                  labelWidth={80}
                  error={this.state.lastNameError}
                /> 
                </FormControl>
                <FormControl
                fullWidth
                className={classes.margin}
                variant="outlined"
              >

                <TextField
                  id="startDate"
                  label="Start Date"
                  type="date"
                  value={startDate}
                  name= "startDate"
                  onChange={this.handleChange}
                  InputLabelProps={{ shrink: true }}
                  error={this.state.startDateError}
                />
              </FormControl>
              <FormControl
                 fullWidth
                 className={classes.margin}
                variant="outlined"
              >
                {/* <InputLabel htmlFor="register-password">Password</InputLabel>
                <OutlinedInput
                  id="register-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={this.handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={this.handleClickShowPassword}
                        onMouseDown={this.handleMouseDownPassword}
                        edge="end"
                        id="show-password"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                  error={this.state.passwordError}
                  helper
                />

                <FormHelperText>Minimum 6 characters</FormHelperText> */}

                <TextField
                  id="endDate"
                  label="End Date"
                  type="date"
                  name= "endDate"
                  value={endDate}
                  onChange={this.handleChange}
                  InputLabelProps={{ shrink: true }}
                  error={this.state.endDateError}
                />
              </FormControl>
              <FormControl
                fullWidth
                className={classes.margin}
                variant="outlined"
              >
                <InputLabel htmlFor="Trip-Mode">Mode of Trip</InputLabel>
                <OutlinedInput
                  id="Trip-Mode"
                  name="modeOfTrip"
                  value={modeOfTrip}
                  onChange={this.handleChange}
                  placeholder="Mode"
                  labelWidth={45}
                  error={this.state.modeOfTripError}
                />
              </FormControl>
              {/* <FormControl
                fullWidth
                className={classes.margin}
                variant="outlined"
              > */}
                {/* <InputLabel htmlFor="register-firstName">First Name</InputLabel>
                <OutlinedInput
                  id="register-firstName"
                  name="firstName"
                  value={firstName}
                  onChange={this.handleChange}
                  placeholder="William"
                  labelWidth={80}
                  error={this.state.firstNameError}
                />
              </FormControl>
              <FormControl
                fullWidth
                className={classes.margin}
                variant="outlined"
              >
                <InputLabel htmlFor="register-lastName">Last Name</InputLabel>
                <OutlinedInput
                  id="register-lastName"
                  name="lastName"
                  value={lastName}
                  onChange={this.handleChange}
                  placeholder="Johnson"
                  labelWidth={80}
                  error={this.state.lastNameError}
                /> */}
              {/* </FormControl> */}
              <FormControl
                fullWidth
                variant="outlined"
                className={classes.formControl}
              >
                <InputLabel id="demo-simple-select-outlined-label">
                  Country
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={country}
                  onChange={this.handleChange}
                  name="country"
                  labelWidth={55}
                  error={this.state.countryError}
                  endAdornment={
                    <InputAdornment position="end">
                      <ArrowDropDownIcon
                        aria-label="drop down menu"
                        onMouseDown={this.handleMouseDownPassword}
                        edge="end"
                        id="dropdown"
                      ></ArrowDropDownIcon>
                    </InputAdornment>
                  }
                >
                  <MenuItem value="">
                    <em>Choose</em>
                  </MenuItem>
                  <MenuItem value="AU">Australia</MenuItem>
                  <MenuItem value="IND">India</MenuItem>
                  <MenuItem value="BR">Brazil</MenuItem>
                  <MenuItem value="NL">Netherlands</MenuItem>
                  <MenuItem value="PE">Peru</MenuItem>
                  <MenuItem value="ES">Spain</MenuItem>
                  <MenuItem value="SW">Sweden</MenuItem>
                  <MenuItem value="UK">United Kingdom</MenuItem>
                </Select>
              </FormControl>
              {/* <FormControlLabel
                id="checkbox"
                control={
                  <Checkbox
                    onClick={this.handleTandC}
                    value="termsConditions"
                    color="primary"
                  />
                }
                label="I agree to the terms and conditions of MYtinerary"
              /> */}
              <FormControl fullWidth className={classes.formControl}>
                <Button
                  type="submit"
                  name="submit"
                  id="submit-button"
                  variant="contained"
                  className="register active"
                >
                  Add trip
                </Button>
              </FormControl>
            </div>
          </form>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.users.isAuthenticated,
    isFetching: state.users.isFetching,
    error: state.errors,
  };
};

export default connect(mapStateToProps, { addTripDetails, clearErrors })(
  withStyles(styles)(AddTrip)
);
