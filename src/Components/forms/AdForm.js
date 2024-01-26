import { useState } from "react"
import CurrencyInput from 'react-currency-input-field'
import ImageUpload from "./ImageUpload"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import {useAuth} from '../../context/auth'
import toast from 'react-hot-toast'
import SearchForm from "./SearchForm"
export default function AdForm({action,type}){
    const[auth,setAuth]=useAuth()
    const navigate=useNavigate()
    const[ad,setAd]=useState({
        photos:[],
        uploading:false,
        price:'',
        address:'',
        bedrooms:'',
        bathrooms:'',
        carpark:'',
        landsize:'',
        type:type,
        title:'',
        action:action,
        description:'',
        loading:false,
    })
    async function handleClick(){
        try{
            setAd({...ad,loading:true})
            const {data}=await axios.post('/ad',ad)
            console.log('ad create response', data)
            if(data?.error){
                toast.error(data.error)
                setAd({...ad,loading:false})
            }else{  
                setAuth({...auth,user:data.user})
                const fromLS=JSON.parse(localStorage.getItem('auth'))
                fromLS.user=data.user
                localStorage.setItem('auth',JSON.stringify(fromLS))
                toast.success('Ad created Successfully')
                setAd({...ad, loading:false})
            //    navigate('/dashboard')    
                window.location.href='/dashboard'
            }
        }catch(err){
            console.log(err)
            setAd({...ad, loading:false})
        }
    }
    return(
        <>
           <div className="mb-3" >
            <ImageUpload ad={ad} setAd={setAd} />
           <input className='form-control' value={ad.address} placeholder="enter the address"  onChange={(e)=>setAd({...ad,address:e.target.value})}/>
           </div>
            {/* <SearchForm ad={ad} setAd={setAd} /> */}
           <CurrencyInput placeholder="enter the price" 
           defaultValue={ad.price} className="form-control mb-3"
           onValueChange={(value)=>{
            setAd({...ad,price:value})
           }}
           />
           {type==='House'?(
            <>
            <input type='number' min='0' className="form-control mb-3"
            placeholder="enter number of bedrooms" 
            value={ad.bedrooms} onChange={e=>setAd({...ad,bedrooms:e.target.value})}
            />
           <input type='number' min='0' className="form-control mb-3"
            placeholder="enter number of bathrooms" 
            value={ad.bathrooms} onChange={e=>setAd({...ad,bathrooms:e.target.value})}
            />
           <input type='number' min='0' className="form-control mb-3"
            placeholder="enter number of carparks" 
            value={ad.carpark} onChange={e=>setAd({...ad,carpark:e.target.value})}
            />
            </>
           ):(
            ''
           )}
           <input type='text' className="form-control mb-3"
            placeholder="enter size of land" 
            value={ad.landsize} onChange={e=>setAd({...ad,landsize:e.target.value})}
            />
           <input type='text' className="form-control mb-3"
            placeholder="enter title of the place" 
            value={ad.title} onChange={e=>setAd({...ad,title:e.target.value})}
            />
            <textarea className='form-control mb-3' value={ad.description} 
            style={{resize:'none'}} rows='5' 
            onChange={e=>setAd({...ad,description:e.target.value})}
            />
            <button onClick={handleClick} className={`btn btn-primary ${ad.loading?'disabled':''} mb-5`}>{ad.loading?'Saving':'Submit'}</button>
            {/* <pre>{JSON.stringify(ad,null,4)}</pre> */}
        </>
    )
}