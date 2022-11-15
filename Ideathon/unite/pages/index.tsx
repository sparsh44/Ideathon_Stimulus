
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Account from '../components/Account'
import { useState } from 'react'
import HomePage from '../components/HomeScreen/HomePage'

const customTheme = {
  default: {
    colors: {
      brand: 'hsl(354deg 88% 36%)',
      brandAccent: 'hsl(354deg 88% 36%)',
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
    
    <div >
      {!session ? (
        <div className='flex w-full justify-center'>

        <div className=' w-80 flex justify-center mt-28 bg-blue-300'>
         <Auth supabaseClient={supabase} 
         appearance={{ theme: customTheme }} theme="default"/>
         </div>
         </div>

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