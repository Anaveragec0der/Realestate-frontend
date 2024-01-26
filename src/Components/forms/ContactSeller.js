import { useState,useEffect } from "react"
import {useAuth} from '../../context/auth'
import {Link, useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'

export default function ContactSeller({ad}){
    const [auth,setAuth]=useAuth()
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [message,setMessage]=useState('')
    const [phone,setPhone]=useState('')
    const [loading ,setLoading]=useState(false)

    const navigate=useNavigate()
    const loggedIn=auth.user!==null && auth.token !==''
    //prepopulating the form if the user is logged in with the details like name username etc
    useEffect(()=>{
        if(auth?.user){
            setName(auth.user?.name)
            setEmail(auth.user?.email)
            setPhone(auth.user?.phone)
        }
    },[loggedIn])
        async function handleSubmit(e){
            e.preventDefault()
            setLoading(true)
            try{
                const {data}=await axios.post('/contact-seller',{
                    name,email,message,phone,adId:ad._id
                })
                if(data?.error){
                    toast.error(data?.error)
                    setLoading(false)
                }else{
                    setLoading(false)
                    toast.success('Your query has been emailed to the seller')
                    setMessage('')
                }
            }catch(err){
                console.error(err)
                toast.error('Something went wrong ')
            }
        }
    return(
        <>
            <div className="row">
                <div className="col-lg-8 offset-lg-2">
                    <h3> Contact {ad?.postedBy?.name ? ad?.postedBy?.name :ad?.postedBy?.username}</h3>
                    <form onSubmit={handleSubmit}>
                        <textarea name="message" className="form-control" style={{resize:'none'}} value={message} onChange={e=> setMessage(e.target.value)}placeholder="Write your message" autoFocus={true} disabled={!loggedIn} />
                        <input type='text' className="form-control mb-3" placeholder="Enter your name" onChange={e=> setName(e.target.value)} disabled={!loggedIn}/>
                        <input type='email' className="form-control mb-3" placeholder="Enter your email" value={email} onChange={e=> setEmail(e.target.value)} disabled={!loggedIn}/>
                        <input type='text' className="form-control mb-3" placeholder="Enter your phone" onChange={e=> setPhone(e.target.value)} disabled={!loggedIn}/>
                        <button className="btn btn-primary mt-4 mb-5" disabled={!name || !email ||loading}>
                            {/* here we are checking whether user is logged In if user is logged in then check if 
                            loading is true if loading is true then display Please wait else display Send enquiry
                            if user is not logged in then display on button login to send enquiry  */}
                            {loggedIn? loading ? 'Please Wait' : 'Send Enquiry' :'Login to send enquiry'}
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}