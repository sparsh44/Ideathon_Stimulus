
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Account from '../components/Account'
import { useState } from 'react'
import Home from './Home'

const main = () => {
  var [pagechanger, setpage] = useState("account")
  const session = useSession()
  const supabase = useSupabaseClient()

  return (
    <div>
      {!session ? (
        <Auth supabaseClient={supabase} />
      ) : (
        // if(pagechanger==="account"){
        <Home />
        // }

      )}
    </div>

  )
}

export default Home