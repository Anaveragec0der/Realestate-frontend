import Resizer from 'react-image-file-resizer'
import axios from 'axios'
export default function ImageUpload({ad,setAd}){
    async function handleUpload(e){
        try{
            let files=e.target.files
            files=[...files]
            if(files?.length){
                console.log(files)
            setAd({...ad , uploading:true})

            files.map((file)=>{
                new Promise((resolve)=>{
                    Resizer.imageFileResizer(
                        file,
                        1080,
                        720,
                        'JPEG',
                        100,
                        0,
                        async (uri)=>{
                           try{
                                const{data}=await axios.post('/upload-image',{
                                    image:uri
                                })
                                setAd((prev)=>({
                                    ...prev,
                                    photos:[data,...prev.photos],
                                    uploading:false
                                }))
                           }catch(err){
                                console.error(err)
                                setAd({...ad,uploading:false})
                           }
                        },
                        'base64'
                    )
                })
            })
            }
        }
             catch(err){
            console.error(err)
            setAd({...ad, uploading:false})
        }
    }
    async function handleDelete(){
        try{
            setAd({...ad,uploading:true})
        }catch(err){
            console.error(err)
            setAd({...ad,uploading:false})
        }
    }
    return(
        <>
            <label className="btn btn-secondary mb-4">
                Upload photos
                <input className='my-3' onChange={handleUpload}type="file" accept="image/*" multiple hidden />
            </label>
        </>
    )
}