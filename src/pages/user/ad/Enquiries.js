import { useState, useEffect } from "react" 
import Sidebar from "../../../Components/nav/Sidebar.js"
import { useAuth } from "../../../context/auth"
import UserAdCard from "./UserAdCard"
import axios from "axios"
export default function Wishlist(){
    const [auth,setAuth]=useAuth()
    const [ads,setAds]=useState([])
     //this is for showing different ads pages as one page displays only one ad

    useEffect(()=>{
        fetchAds()
    },[auth.token!==''])
    
    
    async function fetchAds(){
        try{
            const {data}=await axios.get(`/enquiries`)
            setAds(data )
        }catch(err){
            console.error(err)
        }
    } 
    //loadMore function was much similar to fetchAd function so we do not need this function

    // async function loadMore(){
    //     try{
    //         setLoading(true)
    //         const{data}=await axios.get(`/user-ads/${page}`)
    //         setAds([...ads,...data.ads])
    //         setTotal(data.total)
    //         setLoading(false)
    //     }catch(err){
    //         console.error(err)
    //     }
    // }  
    return(
        <div> 
            <h1 className="display-1 bg-primary text-light p-5">Enquiries</h1>
            <Sidebar/>
            {!ads?.length?(
                <div className="d-flex justify-content-center align-items-center vh-100" style={{marginTop:'-5%'}}>
                    <h2>Hey {auth.user?.name?auth.user?.name :auth.user?.username} You have not liked any properties yet </h2>
                </div>
            ):(
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2 mt-4 mb-4">
                           <p className="text-center">You have Enquired {ads?.length} Properties </p>
                        </div>
                    </div>
                    <div className="row">
                        {ads?.map((ad)=>(
                            <UserAdCard ad={ad} key={ad._id}/>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}