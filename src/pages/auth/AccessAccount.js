import { useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import toast from 'react-hot-toast'
import axios from 'axios'
import {useAuth} from '../../context/auth'
export default function AccessAccount(){
    //as we defined this route as auth/account-activate/:token useParam will take anything 
    //after colon : as the parameter, in this case we used /:token hence we are getting 
    //token as the response from useParams
    const {token}=useParams()
    // console.log(token)
    const [auth,setAuth]=useAuth()

    const navigate=useNavigate()
    // to send this token to the backend we will be using the useEffect hook as it runs 
    // as soon as the component loads
    useEffect(()=>{
        if(token){
            requestAccess()
        }
    },[token])// making token as a dependency means that we will rerender the component
    //everytime the token changes

    const requestAccess= async ()=>{
        try{
            const {data}=await axios.post(`/access-account`,{resetCode:token})
            if(data?.error){
                toast.error(data.error)
            }else{
                //saving data in the local storage so it doesnt get lost when we refresh
                //the page 
                localStorage.setItem('auth',JSON.stringify(data))
                //saving data in context
                setAuth(data)
                toast.success('Please update your password in profile page')
                navigate('/')
            }
        }
        catch(err){
            console.error(err)
            toast.error('Something went wrong. Try again')
        }
    } 
    return(
        <div className="display-1 d-flex jusify-content-center align-items-center vh-100">
            Please Wait...
        </div>
    )
}