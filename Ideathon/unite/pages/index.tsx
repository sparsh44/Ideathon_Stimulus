
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Account from '../components/Account'
import { useState } from 'react'
import HomePage from '../components/HomeScreen/HomePage'

const customTheme = {
  default: {
    colors: {
      brand: 'hsl(153 60.0% 53.0%)',
      brandAccent: 'hsl(154 54.8% 45.1%)',
      brandButtonText: 'white',
      // ..
  },
}
}
const Home = () => {
  var [pagechanger, setpage] = useState("account")
  const session = useSession()
  const supabase = useSupabaseClient()

  
  return (
    
    <div>
      {!session ? (
         <Auth supabaseClient={supabase} 
         appearance={{ theme: customTheme }} theme="default"/>
      ) : (
        // if(pagechanger==="account"){
        // <Account session={session}/>
        <HomePage />
        // }
       
      )}
    </div>


  )
}

export default Home