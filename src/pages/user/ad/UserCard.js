import { useEffect,useState } from 'react'
import {Badge} from 'antd'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import axios from 'axios'
dayjs.extend(relativeTime)
const Customimage = require('./Agent.jpg')
export default function UserCard({ user }) {
    const[count,setCount]=useState(0)
    useEffect(()=>{
        if(user?._id) fetchAdCount()
    },[user?._id])
    
    async function fetchAdCount(){
        try{
            const {data}= await axios.get(`agent-ad-count/${user._id}`)
            setCount(data.length)
        }catch(err){
            console.error(err)
        }
    }

    return (
        <div className="col-lg-4 p-4 gx-4 gy-4">
             <Link to={`/agent/${user.username}`}>
            <Badge.Ribbon text={`${count} listings`} >
            <div className="card hoverable shadow">
                <img src={Customimage} alt="place/house"
                    style={{ objectFit: 'cover' }}
                />
                <div className="card-body">
                    <h3>{user?.username??user?.name}</h3>
                    <p className='card-text'>Joined {dayjs(user.createdAt).fromNow()}</p>
                </div>
            </div>
            </Badge.Ribbon>
            </Link>
        </div>
    )
}