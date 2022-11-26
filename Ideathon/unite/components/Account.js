import { useState, useEffect } from 'react'
import { useUser, useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Avatar from '../components/Avatar'
import { useRouter } from 'next/router'

export default function Account({session, user, supabase}) {
  const router = useRouter();
  // const user=useUser();
  // const supabase = useSupabaseClient()
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [full_name, setfullname] = useState(null)
  const [email, setEmail] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)
  const [userId, setUserId] = useState(null)
  useEffect(() => {
    getProfile()
  }, [session])

  async function getProfile() {
    try {
      setLoading(true)
      // console.log(user.id)
      setUserId(user.id)
      setEmail(user.email)
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
      // alert('Error loading user data!')
      // console.log(error)
    } finally {
      setLoading(false)
    }
  }
  // console.log(session);
  // console.log(user);
  async function removePhoto() {


    const { data, error } = await supabase.storage.from('avatars')

      .remove([avatar_url]);

    if (error) {
      alert(error);
    }

    if (data) {

      setAvatarUrl(null);
    }


    const updates = {
      id: user.id,

      avatar_url: null

    }

    let { erro } = await supabase.from('profiles').upsert(updates)
    if (erro) throw erro
    alert("Photo Removed")
    router.reload();




  }


  async function updateProfile({ username, avatar_url, full_name }) {
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
      router.push("/")
      // router.reload()
    }
  }

  return (

    <div className="form-widget">
      <div className="ml-32 w-full rounded-full">
        <Avatar className="rounded-full"
          uid={userId}
          url={avatar_url}
          size={150}
          onUpload={(url) => {
            setAvatarUrl(url)

          }}
        />
    
        <svg  onClick={removePhoto} class="w-6 h-6 ml-3 mt-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
      </div>



      <div className='mt-3'>
        <label htmlFor="email" className="ml-1 text-lg font-medium ">Email</label>
        <input id="email" type="email" className="mb-2 w-full border-2 border-gray-100 rounded-xl p-3 mt-1 bg-transparent" value={email} disabled />
      </div>
      <div>
        <label htmlFor="username" className="ml-1 text-lg font-medium">Full-Name</label>
        <input
          id="username"
          type="text" className="mb-2 w-full border-2 border-gray-100 rounded-xl p-3 mt-1 bg-transparent"
          value={full_name || ''}
          onChange={(e) => setfullname(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="username" className="ml-1 text-lg font-medium">Username</label>
        <input
          id="username"
          type="text" className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1 bg-transparent"
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="flex">
        <div>
          <button
            className="button primary block mt-6 ml-4 bg-violet-500 p-3 rounded-xl text-white"
            onClick={() => { updateProfile({ username, avatar_url, full_name }) }}
            disabled={loading}
          >
            {loading ? 'Loading ...' : 'Update'}
          </button>
        </div>

        <div>
          <button className="button block mt-6 ml-28 bg-violet-500 p-3 rounded-xl text-white" onClick={() => supabase.auth.signOut()}>
            Sign Out
          </button>
          
        </div>
      </div>
    </div>
  )
}



// ...





