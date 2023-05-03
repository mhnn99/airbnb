import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    mode:'light',
    user:null,
    token:null,
    initialArr:["Berlin", "Madrid", "London", "Ibiza", "Antalya", "Hurghada"],
    cities:[]
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
        }
    }
})

export const {setMode, setLogin, setLogout, setCities} = authSlice.actions
export default authSlice.reducer