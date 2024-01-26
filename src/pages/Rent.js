import { useEffect,useState } from "react"
import { useAuth } from "../context/auth"
import AdCard from "../Components/cards/AdCard"
import SearchForm from "../Components/forms/SearchForm"
import axios from "axios"
export default function Rent(){
    const [auth,setAuth]=useAuth()
    const[ads,setAds]=useState()

    useEffect(()=>{
        fetchAds()
    },[])
    async function fetchAds(){
        try{
            const {data}=await axios.get('/ads-for-rent')
            setAds(data)
        }catch(err){
            console.error(err)
        }
    }
    return(
        <div>
            <SearchForm />
            <h1 className="display-1 bg-primary text-light p-5">For Rent</h1>
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