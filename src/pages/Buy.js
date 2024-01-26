import { useEffect,useState } from "react"
import { useAuth } from "../context/auth"
import AdCard from "../Components/cards/AdCard"
import SearchForm from "../Components/forms/SearchForm"
import axios from "axios"
export default function Buy(){
    const [auth,setAuth]=useAuth()
    const[ads,setAds]=useState()

    
    useEffect(()=>{
        fetchAds()
    },[])
    async function fetchAds(){
        try{
            const {data}=await axios.get('/ads-for-sell')
            // console.log(data)
            setAds(data)
        }catch(err){
            console.error(err)
        }
    }
    return(
        <div>
            <SearchForm />
            <h1 className="display-1 bg-primary text-light p-5">For Sell</h1>
            <div className="container">
                <div className="row">
                    {ads?.map(ad=>(
                        <AdCard ad={ad} key={ad._id} />
                    ))}
                </div>
            </div>
        </div>
    )
}