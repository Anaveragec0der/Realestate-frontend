import { useState, useEffect } from "react"
import { useAuth } from '../../context/auth.js'
import axios from 'axios'
import toast from 'react-hot-toast'
// import { useNavigate } from "react-router-dom"
import slugify from 'slugify'
import Sidebar from "../../Components/nav/Sidebar"
export default function Profile() {
    const [auth, setAuth] = useAuth()
    const [username, setUsername] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [company, setCompany] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [about, setAbout] = useState('')
    const [loading, setLoading] = useState(false)
    const [photo, setPhoto] = useState(null)
    // const [uploading, setUploading] = useState(false)
    // const navigate = useNavigate()
    useEffect(() => {
        if (auth.user) {
            setUsername(auth.user?.username)
            setName(auth.user?.name)
            setEmail(auth.user?.email)
            setCompany(auth.user?.company)
            setAddress(auth.user?.address)
            setPhone(auth.user?.address)
            setAbout(auth.user?.ph)
            setPhoto(auth.user?.username)
        }
    }, [])
    async function handleSubmit(e) {
        e.preventDefault()
        try {
            // console.log({username,name,email,company,address,phone,about,photo})
            setLoading(true)
            const {data}=await axios.put('/update-profile',{
                username,name,email,company,address,phone,about,photo
            })
            if(data?.error){
                toast.error(data.error)
            }
            else{
                // console.log('update profile response',data)
                setAuth({...auth,user:data})
                let fromLS =JSON.parse(localStorage.getItem('auth'))
                fromLS.user=data
                localStorage.setItem('auth',JSON.stringify(fromLS))
                setLoading(false)
                toast.success('Profile Updated')
            }
        } catch (err) {
            console.error(err)
            setLoading(false)
        }
    }
    return (
        <>
            <h1 className="display-1 bg-primary text-light p-5">Settings</h1>
            <div className="container-fluid">
                <Sidebar />
                <div className="container mt-2">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2">
                            <form onSubmit={handleSubmit}>
                                <input type="text" placeholder="Update your username" className="form-control mb-4"
                                    value={username}
                                    onChange={e => setUsername(slugify(e.target.value.toLowerCase()))}
                                />
                                <input type="text" placeholder="Update your name" className="form-control mb-4"
                                    value={name}
                                    onChange={e => setName((e.target.value))}
                                />
                                <input type="email" placeholder="Enter your Email" className="form-control disabled mb-4"
                                    value={email}
                                    disabled={true}
                                />
                                <input type="text" placeholder="Enter your company name" className="form-control mb-4"
                                    value={company}
                                    onChange={e => setCompany((e.target.value))}
                                />
                                <input type="text" placeholder="Enter your address" className="form-control mb-4"
                                    value={address}
                                    onChange={e => setAddress((e.target.value))}
                                />
                                <input type="text" placeholder="Enter your phone number" className="form-control mb-4"
                                    value={phone}
                                    onChange={e => setPhone((e.target.value))}
                                />
                                <textarea className='form-control mb-3' 
                                style={{resize:'none'}} rows='5' placeholder="Enter something interesting about yourself" 
                                    value={about}
                                    onChange={e => setAbout((e.target.value))}
                                    maxLength={200}
                                />
                                <button className="btn btn-primary col-12 mb-4"
                                disabled={loading}
                                >
                                    {loading ? "Processing":'Update Profile'}
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