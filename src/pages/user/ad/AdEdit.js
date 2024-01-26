import { useState, useEffect } from "react"
import CurrencyInput from 'react-currency-input-field'
import ImageUpload from "../../../Components/forms/ImageUpload"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import toast from 'react-hot-toast'
import Sidebar from "../../../Components/nav/Sidebar"
export default function AdEdit({ action, type }) {
    const navigate = useNavigate()
    const params = useParams()
    const [ad, setAd] = useState({
        _id: '',
        photos: [],
        uploading: false,
        price: '',
        address: '',
        bedrooms: '',
        bathrooms: '',
        carpark: '',
        landsize: '',
        type: type,
        title: '',
        action: action,
        description: '',
        loading: false,
    })
    const [loaded, setLoaded] = useState(false)
    useEffect(() => {
        if (params?.slug) {
            fetchAd()
        }
    }, [params?.slug])

    async function fetchAd() {
        try {
            const { data } = await axios.get(`/ad/${params.slug}`)
            // console.log('single ad edit page',data)
            setAd(data?.ad)
            setLoaded(true)
        } catch (err) {
            console.error(err)
        }
    }

    async function handleClick() {
        try {
            setAd({ ...ad, loading: true })
            //validation
            if (!ad.price) {
                toast.error('price is required')
                return
            } else if (!ad.description) {
                toast.error('Description is required')
                return
            } else {
                setAd({ ...ad, loading: true })
                const { data } = await axios.put(`/ad/${ad._id}`, ad)
                console.log('ad create response', data)
                if (data?.error) {
                    toast.error(data.error)
                    setAd({ ...ad, loading: false })
                } else {
                    toast.success('Ad created Successfully')
                    setAd({ ...ad, loading: false })
                    navigate('/dashboard')

                }
            }
        } catch (err) {
            console.log(err)
            setAd({ ...ad, loading: false })
        }
    }
    async function handleDelete() {
        try {
            setAd({ ...ad, loading: true })
            const { data } = await axios.delete(`/ad/${ad._id}`)
            if (data?.error) {
                toast.error(data.error)
                setAd({ ...ad, loading: false })
            } else {
                toast.success('Ad deleted successfully')
                setAd({ ...ad, loading: false })
                navigate("/dashboard")
            }
        } catch (err) {
            console.log(err)
            setAd({ ...ad, loading: false })
        }
    }

    return (
        <div >
            <h1 className="display-1 bg-primary text-light p-5">Ad Edit</h1>
            <Sidebar />
            <div className="container">
                <div className="container">
                    <div className="mb-3" >
                        <ImageUpload ad={ad} setAd={setAd} />
                        <input className='form-control' value={ad.address} placeholder="enter the address" onChange={(e) => setAd({ ...ad, address: e.target.value })} />
                    </div>

                    {loaded ? (<CurrencyInput placeholder="enter the price"
                        defaultValue={ad.price} className="form-control mb-3"
                        onValueChange={(value) => {
                            setAd({ ...ad, price: value })
                        }}
                    />) :
                        ('')}
                    {ad.type === 'House' ? (
                        <>
                            <input type='number' min='0' className="form-control mb-3"
                                placeholder="enter number of bedrooms"
                                value={ad.bedrooms} onChange={e => setAd({ ...ad, bedrooms: e.target.value })}
                            />
                            <input type='number' min='0' className="form-control mb-3"
                                placeholder="enter number of bathrooms"
                                value={ad.bathrooms} onChange={e => setAd({ ...ad, bathrooms: e.target.value })}
                            />
                            <input type='number' min='0' className="form-control mb-3"
                                placeholder="enter number of carparks"
                                value={ad.carpark} onChange={e => setAd({ ...ad, carpark: e.target.value })}
                            />
                        </>
                    ) : (
                        ''
                    )}
                    <input type='text' className="form-control mb-3"
                        placeholder="enter size of land"
                        value={ad.landsize} onChange={e => setAd({ ...ad, landsize: e.target.value })}
                    />
                    <input type='text' className="form-control mb-3"
                        placeholder="enter title of the place"
                        value={ad.title} onChange={e => setAd({ ...ad, title: e.target.value })}
                    />
                    <textarea className='form-control mb-3' value={ad.description}
                        style={{ resize: 'none' }} rows='5'
                        onChange={e => setAd({ ...ad, description: e.target.value })}
                    />
                    <div className="d-flex justify-content-between">
                        <button onClick={handleClick} className={`btn btn-primary ${ad.loading ? 'disabled' : ''} mb-5`}>{ad.loading ? 'Saving' : 'Submit'}</button>
                        <button onClick={handleDelete} className={`btn btn-danger ${ad.loading ? 'disabled' : ''} mb-5`}>{ad.loading ? 'Deleting...' : 'Delete'}</button>
                    </div>
                    {/* <pre>{JSON.stringify(ad,null,4)}</pre> */}
                </div>
            </div>
        </div>
    )
}