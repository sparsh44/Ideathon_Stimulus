import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import Avatar from '../components/Avatar'
import { createFalse } from 'typescript'

export default function Account({session}) {
  const supabase = useSupabaseClient()
  const user = useUser()
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [full_name, setfullname] = useState(null)
  
  const [avatar_url, setAvatarUrl] = useState(null)
  useEffect(() => {
    getProfile()
  }, [session])

  async function getProfile() {
    try {
      setLoading(true)

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, avatar_url,full_name`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
     
        setAvatarUrl(data.avatar_url)
        setfullname(data.full_name)
      }
    } catch (error) {
      alert('Error loading user data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  async function removePhoto(){
    const { data, error } = await supabase.storage.from('avatars')

  .remove([avatar_url]);
  if(error){
    alert(error);
  }
  if(data){
    alert("Photo Removed")
    setAvatarUrl(null);
  }
  }


  async function updateProfile({ username, avatar_url,full_name }) {
    try {
      setLoading(true)

      const updates = {
        id: user.id,
        username,
        
        avatar_url,
        full_name,
        updated_at: new Date().toISOString(),
      }

      let { error } = await supabase.from('profiles').upsert(updates)
      if (error) throw error
      alert('Profile updated!')
    } catch (error) {
      alert('Error updating the data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
   
    <div className="form-widget">
      <div className = "ml-32 w-full rounded-full">
        <Avatar className = "rounded-full"
          uid={user.id}
          url={avatar_url}
          size={150}
          onUpload={(url) => {
            setAvatarUrl(url)
          
          }}
          />
      </div>


 
      <div>
        <label htmlFor="email" className = "ml-1 text-lg font-medium ">Email</label>
        <input id="email" type="text" className = "mb-2 w-full border-2 border-gray-100 rounded-xl p-3 mt-1 bg-transparent" value={session.user.email} disabled />
      </div>
      <div>
        <label htmlFor="username" className = "ml-1 text-lg font-medium">Full-Name</label>
        <input
          id="username"
          type="text" className = "mb-2 w-full border-2 border-gray-100 rounded-xl p-3 mt-1 bg-transparent"
          value={full_name || ''}
          onChange={(e) => setfullname(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="username" className = "ml-1 text-lg font-medium">Username</label>
        <input
          id="username"
          type="text" className = "w-full border-2 border-gray-100 rounded-xl p-3 mt-1 bg-transparent"
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
   
      <div className = "flex">
        <div>
          <button
            className="button primary block mt-6 ml-4 bg-violet-500 p-3 rounded-xl text-white"
            onClick={() => {updateProfile({ username, avatar_url,full_name })}}
            disabled={loading}
          >
            {loading ? 'Loading ...' : 'Update'}
          </button>
        </div>

        <div>
          <button className="button block mt-6 ml-28 bg-violet-500 p-3 rounded-xl text-white" onClick={() => supabase.auth.signOut()}>
            Sign Out
          </button>
          <button className="button block mt-6 ml-28 bg-violet-500 p-3 rounded-xl text-white" onClick={removePhoto}>
            Remove DP
          </button>
        </div>
      </div>
    </div>
  )
    }



// ...



