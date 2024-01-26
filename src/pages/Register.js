import { useState } from "react"
import axios from 'axios'
import { API } from "../Config"
import toast from 'react-hot-toast'
//this hook is imported to redirect the user to diffent page once the registration 
//email is sent to their inbox
import { useNavigate } from "react-router-dom"
export default function Register(){
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [loading,setLoading]=useState(false)
    //this hook is to redirect the user 
    const navigate=useNavigate()
    //making async function beacuse we will be posting this data to our backend 
   async function handleSubmit(e){
    e.preventDefault()
    try{
        setLoading(true)
        // console.table({email,password})
        //we always get an object from response of axios request and there is a data key 
        //in it so we can always destructure it as data 
        const {data}=await axios.post(`${API}/pre-register`,{email,password})
        // console.log(data)
        if(data?.error){
            toast.error(data.error)
            setLoading(false)
        }
        else{
            console.log(data)
            toast.success('Please check your email to activate your account')
            setLoading(false)
            navigate('/')
        }
    }
    catch(err){
        console.error(err)
        toast.error('Something went wrong')
    }
    }
    return(
        <div>
            <h1 className="display-1 bg-primary text-light p-5">Register</h1>
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 offset-lg-4">
                        <form onSubmit={handleSubmit}>
                            <input type="text" placeholder="Enter your Email"
                            className="form-control mb-4"
                            required
                            autoFocus
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            />
                            <input type="password" placeholder="Enter your password"
                            className="form-control mb-4"
                            required
                            autoFocus
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            />
                            <button disabled={loading} className="btn btn-primary col-12 mb-4">
                                {loading?'Waiting..':'Register'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}