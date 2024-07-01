import React, { Component } from 'react';
import City from '../components/City';
import loader from '../img/loader.svg';
//higher order component
import { connect } from 'react-redux';
// import { getCities } from '../store/actions/cityActions';
import { getTripDetails } from '../store/actions/cityActions';
import { withStyles } from '@material-ui/core/styles';
const styles = (theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
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

class Cities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ''
    };
  }
  
  componentDidMount() {
    debugger
    this.props.getTripDetails();
  }

  handleSearch = async (evt) => {
    await this.setState({
      searchText: evt.target.value,
    });
    this.checkResults();
  };

  checkResults = () => {
    let cityResults = document.querySelector('.Cities-cityList');
    let noResults = document.querySelector('#noResults');
    cityResults.innerHTML === ''
      ? (noResults.style.display = 'block')
      : (noResults.style.display = 'none');
  };

  render() {
    const { tripDetails } = this.props.tripDetails; //this.props.cities;
    // tripDetails.filter((city) => city.name.toLowerCase().startsWith(this.state.searchText.toLowerCase()))
    //   .map((city) => {
    //     return (
    //       <div key={city._id} className='Cities-cityCard'>
    //         <City city={city} />
    //       </div>
    //     );
    //   });

    return (
      <City tripDetails={tripDetails} />
    );
  }
}

//map some of the data in the state of the Store as a Props in this component
const mapStateToProps = (state) => {
  return {
    tripDetails: state.tripDetails,
    isFetching: state.isFetching,
  };
};

//connect is a higher order component that connects the component to the Store
export default connect(mapStateToProps, {getTripDetails})(withStyles(styles)(Cities)
);
