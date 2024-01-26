import { useSearch } from "../../context/search"
import { useState } from "react"
import {sellPrices,rentPrices} from '../../helpers/priceList'
import queryString from 'query-string'
import { useNavigate } from "react-router-dom"
import axios from "axios"
export default function SearchForm({ad,setAd}){
    const[search,setSearch]=useSearch()
    // const [input,setInput]=useState('')
    // console.log(sellPrices,rentPrices)
    // function handleChange(e){
    //   console.log(e.target.value  )
    // }
    const navigate=useNavigate()
   async function handleSearch(){
      setSearch({...search,loading:false})
      try{
        const {results,page,price,...rest}=search
        const query=queryString.stringify(rest)
        // console.log(query)
        const {data}=await axios.get(`/search?${query}`)
        console.log(data)
        if(search?.page!== '/search'){
          setSearch((prev)=>({...prev,results:data,loading:false}))
          navigate('/search')
        }
        else{
          setSearch((prev)=>({...prev,results:data,page:window.location.pathname,loading:false}))
        }
      }catch(err){
        console.error(err)
        setSearch({...search,loading:false})
      }
    }
    return(
        <>
        <div className="container m-5">
            <div className="row">
                {/* <input type="text" className="col-lg-12 form-control" value={ad}
                placeholder="Search for address"
                onChange={handleChange}
                /> */}
            </div>
            <div className="d-flex justify-content-center mt-3">
            <button onClick={()=>setSearch({...search, action:'Buy',price:""})} className="btn btn-primary col-lg-2 squared">{search.action==='Buy'?'✅ Buy':'Buy'}</button>
            <button onClick={()=>setSearch({...search, action:'Rent',price:""})} className="btn btn-primary col-lg-2 squared">{search.action==='Rent'?'✅ Rent':'Rent'}</button>
            <button onClick={()=>setSearch({...search, type:'House',price:""})} className="btn btn-primary col-lg-2 squared">{search.type==='House'?'✅ House':'House'}</button>
            <button onClick={()=>setSearch({...search, type:'Land',price:""})} className="btn btn-primary col-lg-2 squared">{search.type==='Land'?'✅ Land':'Land'}</button>
            <div className="dropdown">
            <button
              className="btn btn-primary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              &nbsp; {search?.price?search.price:'Price'}
            </button>
            <ul className="dropdown-menu">
              {search.action === "Buy" ? (
                <>
                  {sellPrices?.map((p) => (
                    <li key={p._id}>
                      <a
                        className="dropdown-item"
                        onClick={() =>
                          setSearch({
                            ...search,
                            price: p.name,
                            priceRange: p.array,
                          })
                        }
                      >
                        {p.name}
                      </a>
                    </li>
                  ))}
                </>
              ) : (
                <>
                  {rentPrices?.map((p) => (
                    <li key={p._id}>
                      <a
                        className="dropdown-item"
                        onClick={() =>
                          setSearch({
                            ...search,
                            price: p.name,
                            priceRange: p.array,
                          })
                        }
                      >
                        {p.name}
                      </a>
                    </li>
                  ))}
                </>
              )}
            </ul>
          </div>
            <button onClick={handleSearch} className="btn btn-danger col-lg-2 squared">Search</button>
         </div>
        {/* <pre>{JSON.stringify(search,null,4)}</pre> */}
        </div>
        </>
    )
}