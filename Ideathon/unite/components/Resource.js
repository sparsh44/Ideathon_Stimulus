import { DocumentIcon, MusicNoteIcon, PaperClipIcon, PhotographIcon, SearchIcon, UploadIcon, VideoCameraIcon, ViewListIcon } from '@heroicons/react/outline'
import React, { useState,useEffect } from 'react'
import { useUser,useSupabaseClient,useSession } from '@supabase/auth-helpers-react'
import moment from 'moment'

import Modal from './modals/Modal'
import { useRouter } from 'next/router'

function Resource(props) {
    const router=useRouter();
    useEffect(()=>{
        if(!router.isReady) return 
    },[router.isReady,props]);
    const user=useUser();
    const session=useSession();
    const supabase = useSupabaseClient()
    const [uploading, setUploading] = useState(false)
    const [showModal, setShowModal] = useState(false);
    const [resource, setResource] = useState("");
    const uploadFile=async(event)=>{
        try {
            setUploading(true)
      
            if (!event.target.files || event.target.files.length === 0) {
              throw new Error('You must select an image to upload.')
            }
      
            const file = event.target.files[0]
            const fileExt = file.name
            const fileName = `${props.community}.${fileExt}`
            const filePath = `${fileName}`
      
            let { error: uploadError } = await supabase.storage
              .from('media')
              .upload(filePath, file, { upsert: true })
      
            if (uploadError) {
              throw uploadError
            }
            const { data,err } = supabase.storage.from('media').getPublicUrl(filePath);
            if(err){
                throw err;
            }
            console.log(data);
            setResource(data.publicUrl);
            let {error}= await supabase.from("resources").insert({
                  clubName:props.community,
                  document_url:data.publicUrl,
                  user_id:user.id,
                  document_name:fileExt.split('.')[0]
            });
            alert("Resource Uploaded");
            router.reload();


          } catch (error) {
            alert('Error uploading file!')
            console.log(error)
          } finally {
            setUploading(false)
          }

    }


    return (
        <div>
            <Modal show={showModal} setShow={setShowModal} community={props.community} />
            <div className='flex flex-col items-center space-x-2 border-t bg-white px-4 space-y-4 py-5 last:rounded-b justify-between'>
                <div className='cursor-pointer border-4 rounded-full border-red-500  bg-red-400 px-5 text-white w-full h-10 flex justify-between' onClick={() => setShowModal(true)} >
                    <h1 className='mt-1 font-bold flex'><SearchIcon className='h-6 w-6 mr-2 ' /> View Resources</h1>
                </div>
                <div className='cursor-pointer border-4 rounded-full border-blue-500 bg-blue-400 px-5 text-white w-full h-10 flex justify-between'  >
                <label style={{cursor:'pointer'}}>
                    <h1 className='mt-1 font-bold flex'><UploadIcon className='h-6 w-6 mr-2 ' /> Upload Resources</h1>
                      
      <input
          style={{
            visibility: 'hidden',
            position: 'absolute',
          }}
          type="file"
          id="single"
          accept="*"
          onChange={uploadFile}
          disabled={uploading}
        />
        </label>
                </div>
            </div>
        </div>
    )
}

export default Resource
