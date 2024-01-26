import {Badge} from 'antd'
import { Link } from 'react-router-dom'
import AdFeatures from './AdFeatures'
const Customimage = require('./house1.jpg')
export default function AdCard({ ad }) {
    function formatNumber(x) {
        return new Intl.NumberFormat().format(x)
    }
    return (
       
        <div className="col-lg-4 p-4 gx-4 gy-4">
             <Link to={`/ad/${ad.slug}`}>
            <Badge.Ribbon text={`${ad?.type} for ${ad?.action}`} color={`${ad?.action==='Sell'?'blue':'red'}`}>
            <div className="card hoverable shadow">
                <img src={Customimage} alt="place/house"
                    style={{ objectFit: 'cover' }}
                />
                <div className="card-body">
                    <h3>{formatNumber(ad?.price)}</h3>
                    <p>{`${ad?.address}`}</p>
                   <AdFeatures ad={ad}/>
                </div>
            </div>
            </Badge.Ribbon>
            </Link>
        </div>
    )
}