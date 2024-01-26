import Sidebar from '../../../Components/nav/Sidebar'
import AdForm from '../../../Components/forms/AdForm'

export default function RentLand(){
 
    return(
        <div> 
            <h1 className="display-1 bg-primary text-light p-5">Rent Land</h1>
            <Sidebar/>
            <div className="container mt-2">
                <AdForm action='Rent' type='Land'/>
            </div>
        </div>
    )
}