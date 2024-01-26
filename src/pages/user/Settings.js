import { useState} from "react"
import axios from 'axios'
import toast from 'react-hot-toast'
import Sidebar from "../../Components/nav/Sidebar.js"
export default function Settings() {
    const [password, setPassword] = useState('')
    const[loading,setLoading]=useState(false)
    
    async function handleSubmit(e) {
        e.preventDefault()
        try {
            // console.log({username,name,email,company,address,phone,about,photo})
            setLoading(true)
            const {data}=await axios.put('/update-password',{
                password,
            })
            if(data?.error){
                toast.error(data.error)
                setLoading(false)
            }
            else{
                    // console.log('update profile response',data)
                setLoading(false)
                toast.success('Password Updated')
            }
        } catch (err) {
            console.error(err)
        }
    }
    return (
        <>
            <h1 className="display-1 bg-primary text-light p-5">Profile</h1>
            <div className="container-fluid">
                <Sidebar />
                <div className="container mt-2">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2">
                            <form onSubmit={handleSubmit}>
                                <input type="password" placeholder="Enter your updated password" className="form-control mb-4"
                                    value={password}
                                    onChange={e => setPassword((e.target.value))}
                                />
                               
                                <button className="btn btn-primary col-12 mb-4"
                                disabled={loading}
                                >
                                    {loading ? "Processing":'Update Password'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                {/* <pre>{JSON.stringify({username,name,email,company,address,phone,about,photo})}</pre> */}
            </div>
        </>
    )
}