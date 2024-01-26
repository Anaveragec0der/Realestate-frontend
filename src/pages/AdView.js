import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import ImageGallery from 'react-image-gallery';
import AdFeatures from "../Components/cards/AdFeatures";
//to show how long it has been since the ad was posted
//we will calculate the time from the day the ad was created till today using this
//package
import dayjs from 'dayjs'
import { IoLocationSharp } from "react-icons/io5";
import relativeTime from 'dayjs/plugin/relativeTime'
import LikeUnlike from "../Components/misc/LikeUnlike";
import AdCard from "../Components/cards/AdCard";
import ContactSeller from '../Components/forms/ContactSeller'

dayjs.extend(relativeTime)
const images = [
    {
        original: 'https://images.pexels.com/photos/3288104/pexels-photo-3288104.png?auto=compress&cs=tinysrgb&w=600',
        thumbnail: 'https://images.pexels.com/photos/3288104/pexels-photo-3288104.png?auto=compress&cs=tinysrgb&w=600',
    },
    {
        original: 'https://images.pexels.com/photos/210617/pexels-photo-210617.jpeg?auto=compress&cs=tinysrgb&w=600',
        thumbnail: 'https://images.pexels.com/photos/210617/pexels-photo-210617.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
        original: 'https://images.pexels.com/photos/534151/pexels-photo-534151.jpeg?auto=compress&cs=tinysrgb&w=600',
        thumbnail: 'https://images.pexels.com/photos/534151/pexels-photo-534151.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
];
export default function AdView() {
    const params = useParams()
    const [ad, setAd] = useState({})
    const [related, setRelated] = useState([])
    useEffect(() => {
        if (params?.slug) {
            fetchAd()
        }
    }, [params?.slug])

    function formatNumber(x) {
        if (x) {
            return new Intl.NumberFormat().format(x)
        }
    }
    const fetchAd = async () => {
        try {
            const { data } = await axios.get(`/ad/${params.slug}`)
            setAd(data.ad)
            setRelated(data?.related)

        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row mt-2">
                    <div className="col-lg-4">
                        <div className="d-flex justify-content-between">
                            <button className="btn btn-primary disabled">{ad.type} for {ad.action}</button>
                            <LikeUnlike ad={ad} />
                        </div>
                        <div className="mt-4 mb-4"> {ad?.sold ? 'Off Market' : 'In Market'} </div>
                        <a className='hyperlink' href={"https://maps.google.com/?q=" + ad.address} rel='noreferrer' target="_blank"> <h2 className="display-5">{ad.address}  <IoLocationSharp /></h2></a>

                        <AdFeatures ad={ad} />
                        <h3 className="mt-3 h2">
                            {formatNumber(ad?.price)}
                        </h3>
                        <p className="text-muted">
                            {dayjs(ad?.createdAt).fromNow()}
                        </p>
                    </div>

                    <div className="col-lg-8">
                        <ImageGallery items={images} />
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 offset-lg-2 ">
                        <div className="mb-5">
                            <h1>MAP CONTAINER</h1>
                        </div>
                        <br />
                        <h1 className="mt-5">
                            {ad?.type} in {ad?.address} for {ad.action} Rs {ad.price}
                        </h1>
                        <AdFeatures ad={ad} />
                        <h3 className="fw-bold">{ad.title}</h3>
                        <p className="lead">{ad.description}</p>
                    </div>
                </div>

            </div>
            {/* <pre>
                {JSON.stringify({ ad, related }, null, 4)}
            </pre> */}
            <div className="container">
                <ContactSeller ad={ad} />
            </div>
            <div className="contianer-fluid">
                <div className="text-center mb-3">Related Properties</div>
                <hr style={{width:'33%'}}/>
                <div className="row">
                    {related?.map(ad => <AdCard key={ad._id} ad={ad} />)}
                </div>
            </div>
        </>
    )
}