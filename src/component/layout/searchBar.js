import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import {useNavigate } from 'react-router-dom';
function SearchBar() {
    const history=useNavigate()
    const [keyword,setKeyword]=useState("")
    const handleClick=(e)=>{
        e.preventDefault()
        console.log("sea",keyword);
        if(keyword.trim())
        {
            history(`/products/?keyword=${keyword}`)
        }
        else{
            history('/products')
        }
    }
    return (
        <div className="input-group h-auto w-auto">
            <div className="form-outline searchInp" >
                <input type="search" value={keyword} id="form1" className="form-control" onChange={(e)=>{setKeyword(e.target.value)}} placeholder='Search' />
            </div>
            <button type="button" onClick={handleClick} className="btn" style={{backgroundColor:"#7a08fa",color:"whitesmoke"}}>
               <SearchIcon/>
            </button>
        </div>
    )
}

export default SearchBar