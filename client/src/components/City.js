import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  InputAdornment,
} from '@material-ui/core';
import { getTripDetails } from '../store/actions/cityActions';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';

import '../styles/city.css';
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  searchContainer: {
    marginBottom: 20,
  }
});

const DataTable = ({data}) => {
  const classes = useStyles();

  // Sample data - you can replace this with your own data fetched from an API or stored in state
  const [tripDetails, setTripDetails] = useState([{name:"ankita chillargi", country: "India", startDate: "20/01/2023" , endDate: "20/03/2023", modeOfTrip: "Train"}]);
  const [searchTerm, setSearchTerm] = useState('');
  // useEffect(async() => {
  //   await this.props.getTripDetails()
  // }, [])
  const handleDelete = (id) => {
    const updatedtripDetails = tripDetails.filter(row => row.id !== id);
    setTripDetails(updatedtripDetails);
  };

  const handleEdit = (id) => {
    // Handle edit functionality here, if needed
    console.log(`Edit row with id ${id}`);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredtripDetails = tripDetails.filter(row =>
    row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='Itineraries' style={{ paddingTop: '100px' }}>
      {data}
      <div className={classes.searchContainer}>
        <TextField
          variant="outlined"
          label="Search"
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Travel Mode</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredtripDetails.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.startDate}</TableCell>
                <TableCell>{row.endDate}</TableCell>
                <TableCell>{row.modeOfTrip}</TableCell>
                <TableCell>{row.country}</TableCell>
                <TableCell>
                  <IconButton className="fontColor" aria-label="edit" onClick={() => handleEdit(row.id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton className="fontColor" aria-label="delete" onClick={() => handleDelete(row.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DataTable;
