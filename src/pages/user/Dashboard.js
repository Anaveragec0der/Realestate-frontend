import { useState, useEffect } from "react"
import Sidebar from "../../Components/nav/Sidebar"
import {useAuth} from '../../context/auth.js'
import UserAdCard  from "./ad/UserAdCard"
import axios from "axios"
export default function Dashboard(){
    const [auth,setAuth]=useAuth()
    const [ads,setAds]=useState([])
    const [total,setTotal]=useState(0)
    //this is for showing different ads pages as one page displays only one ad
    const[page,setPage]=useState(1)
    const[loading,setLoading]=useState(false)

    useEffect(()=>{
        fetchAds()
    },[auth.token!==''])
    
    //this useEffect is to load more ads pages once the button is clicked to increment 
    //the page number 
    useEffect(()=>{
        if(page===1){
            return
        }
        fetchAds()
    },[page])
    
    async function fetchAds(){
        try{
            const {data}=await axios.get(`/user-ads/${page}`)
            setAds([...ads,...data.ads])
            setTotal(data.total)
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
    const seller=auth.user?.role?.includes('Seller')
    return(
        <div> 
            <h1 className="display-1 bg-primary text-light p-5">DashBoard</h1>
            <Sidebar/>
            {!seller?(
                <div className="d-flex justify-content-center align-items-center vh-100" style={{marginTop:'-5%'}}>
                    <h2>Hey {auth.user?.name?auth.user?.name :auth.user?.username} Welcome to MERNty nine acers</h2>
                </div>
            ):(
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2 mt-4 mb-4">
                           <p className="text-center">Total {total} ads found </p>
                        </div>
                    </div>
                    <div className="row">
                        {ads?.map((ad)=>(
                            <UserAdCard ad={ad} key={ad}/>
                        ))}
                    </div>
                    {ads?.length<total ?(<div className="row">
                        <div className="col text-center mt-4 mb-4">
                            <button className='btn btn-warning' onClick={(e)=>{
                                e.preventDefault()
                                setPage(page+1)
                            }} disabled={loading}
                            >
                                {loading? 'Loading....' :`${ads.length}/ ${total} Load more`}
                            </button>
                        </div>
                    </div>) :('')}
                </div>
            )}
        </div>
    )
}