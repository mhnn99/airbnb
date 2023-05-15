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
    if (search.city?.length > 0 && search.city!=="No options yet") {
      navigate(`/locations/${search.city.split(' ').join('%20').split(',').join('%2C')}`)
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
  // console.log(fetchCity)

  const options = search.searchResults.length > 0 ? search.searchResults.map(el => el.query) : ['No options yet'];

  return (
          <Autocomplete
            disablePortal
            inputValue={search.search}
            value={search.city}
            id="combo-box-demo"
            options={options}
            sx={{ width:200 }}
            onInputChange={fetchCity}
            onChange={(e, newValue) => dispatch(setCity({ city: newValue }))}
            renderInput={(params) => <TextField {...params} label="Where to?" />}
          />
  );
};

export default DestinationInput;
