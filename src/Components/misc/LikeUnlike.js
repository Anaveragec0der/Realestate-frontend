    import { useAuth } from '../../context/auth.js'
    import { FcLike, FcLikePlaceholder } from 'react-icons/fc'
    import { useNavigate } from 'react-router-dom'
    import axios from 'axios'
    import toast from 'react-hot-toast'
    export default function LikeUnlike({ ad }) {
        const [auth, setAuth] = useAuth()
        const navigate=useNavigate()
        const handleLike=async()=>{
            try{
                if(auth.user===null){
                    //adding better user experience as we will be redirecting the user 
                    //to the place where user liked or dislked the land or house 
                    //once the user logs in he will be redirected to the place where they 
                    //left off 
                    navigate('/login',{
                        state:`/ad/${ad.slug}`,
                    })
                    return
                }
                const {data}=await axios.post('/wishlist',{adId:ad._id})
                console.log('handle like =>', data)
                setAuth({...auth,user:data})
                //updating the data in local storage as the user wishlist has changed 
                const fromLS=JSON.parse(localStorage.getItem('auth'))
                fromLS.user=data
                localStorage.setItem('auth',JSON.stringify(fromLS))
                toast.success('added to wishlist')
            }   
            catch(err){
                console.error(err)
            }
        }
        const handleUnlike=async()=>{
            try{
                if(auth.user===null){
                    navigate('/login',{
                        state:`/ad/${ad.slug}`,
                    })
                    return
                }
                const {data}=await axios.delete(`/wishlist/${ad._id}`)
                console.log('handle dislike =>', data)
                setAuth({...auth,user:data})
                //updating the data in local storage as the user wishlist has changed 
                const fromLS=JSON.parse(localStorage.getItem('auth'))
                fromLS.user=data
                localStorage.setItem('auth',JSON.stringify(fromLS))
                toast.success('Removed from the wishlist')
            }   
            catch(err){
                console.error(err)
            }
        }
        return (
            <>
                {auth.user?.wishlist?.includes(ad?._id) ?( <span>
                    <FcLike onClick={handleUnlike} className='h2 mt-3 pointer' />
                </span>) :
                    (<span>
                        <FcLikePlaceholder onClick={handleLike} className='h2 mt-3 pointer' />
                    </span>
                )}
            </>
        )
    }