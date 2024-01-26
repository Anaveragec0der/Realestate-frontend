import { useState } from "react"
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate,Link } from "react-router-dom"
export default function Login(){
    const [email,setEmail]=useState('')
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
        const {data}=await axios.post(`/forgot-password`,{email})
        // console.log(data)
        if(data?.error){
            toast.error(data.error)
            setLoading(false)
        }
        else{
            toast.success('Check your email for reset link')
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
            <h1 className="display-1 bg-primary text-light p-5">Forgot Password</h1>
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

                            <button disabled={loading} className="btn btn-primary col-12 mb-4">
                                {loading?'Waiting..':'Submit'}
                            </button>
                        </form>
                        <Link className="text-danger" to='/login'>Back to login</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}