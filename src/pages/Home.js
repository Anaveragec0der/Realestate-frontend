import { useEffect,useState } from "react"
import { useAuth } from "../context/auth"
import AdCard from "../Components/cards/AdCard"
import SearchForm from "../Components/forms/SearchForm"
import axios from "axios"
export default function Home(){
    const [auth,setAuth]=useAuth()
    const[adsForSell,setAdsForSell]=useState()
    const[adsForRent,setAdsForRent]=useState()
    
    useEffect(()=>{
        fetchAds()
    },[])
    async function fetchAds(){
        try{
            const {data}=await axios.get('/ads')
            setAdsForSell(data.adsForSell)
            setAdsForRent(data.adsForRent)
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
                    {adsForSell?.map(ad=>(
                        <AdCard ad={ad} key={ad._id} />
                    ))}
                </div>
            </div>
            <h1 className="display-1 bg-primary text-light p-5">For Rent</h1>
            <div className="container">
                <div className="row">
                    {adsForRent?.map(ad=>(
                        <AdCard ad={ad} key={ad._id} />
                    ))}
                </div>
            </div>
        </div>
    )
}