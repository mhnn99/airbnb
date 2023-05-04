import { Box, Grid, TextField } from "@mui/material";
import { setCity, setSearchResults, setSearch } from "../../state";
import { useDispatch, useSelector } from "react-redux";
import Autocomplete from "@mui/material/Autocomplete";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const DestinationInput = () => {
  const search = useSelector((state) => ({ search: state.search, city: state.city, searchResults: state.searchResults }));
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    if (search.city?.length > 0) {
      navigate(`/locations/${search.city.split(' ').join('%20')}`)
      dispatch(setSearch({ search: '' }))
      dispatch(setCity({ city: '' }))
    }
  }, [search.city, dispatch, navigate])

  const fetchCity = async (e, newInputValue) => {
    const url = `https://airbnb13.p.rapidapi.com/autocomplete?query=${newInputValue}`;
    dispatch(setSearch({ search: newInputValue }))
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'f6dfa6fc95msh3ea6d12e80670ecp18a7dfjsne8f981e298ac',
        'X-RapidAPI-Host': 'airbnb13.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      dispatch(setSearchResults({ searchResults: result }));
    } catch (error) {
      console.error(error);
    }
  }

  const options = search.searchResults.length > 0 ? search.searchResults.map(el => el.query) : [''];

  return (
    <Box sx={{ p: 2, maxWidth: "sm", marginLeft: "auto", marginRight: "auto" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <TextField type="date" />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Autocomplete
            disablePortal
            inputValue={search.search}
            value={search.city}
            id="combo-box-demo"
            options={options}
            sx={{ width: 300 }}
            onInputChange={fetchCity}
            onChange={(e, newValue) => dispatch(setCity({ city: newValue }))}
            renderInput={(params) => <TextField {...params} label="Movie" />}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DestinationInput;
