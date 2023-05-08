import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    mode:'dark',
    user:null,
    token:null,
    initialArr:["Berlin", "Madrid", "London", "Ibiza", "Antalya", "Hurghada", "New York City", "Bora Bora", "Rome", "Tokyo", "Maldives", "Phuket"],
    cities:[],
    search:'',
    city:'',
    searchResults:[],
    listings:[]
}

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setMode:(state)=>{
            state.mode = state.mode==='light' ? 'dark' :'light'
        },
        setLogin:(state,action)=>{
            state.user = action.payload.user
            state.token = action.payload.token
        },
        setLogout:(state)=>{
            state.user = null;
            state.token = null;
        },
        setCities:(state,action)=>{
            state.cities = action.payload.cities
        },
        setSearch:(state,action)=>{
            state.search=action.payload.search
        },
        setCity:(state,action)=>{
            state.city=action.payload.city
        },
        setSearchResults:(state,action) =>{
            state.searchResults=action.payload.searchResults
        },
        setListings:(state,action)=>{
            state.listings = action.payload.listings
        }
    }
})

export const {setMode, setLogin, setLogout, setCities, setSearch, setCity, setSearchResults, setListings} = authSlice.actions
export default authSlice.reducer