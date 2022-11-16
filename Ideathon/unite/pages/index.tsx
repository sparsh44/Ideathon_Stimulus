
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Account from '../components/Account'
import { useState } from 'react'
import Home from './Home'

const customTheme = {
  default: {
    colors: {
      brand: 'rgb(30 41 59)',
      brandAccent: 'hsl(354deg 88% 36%)',
      brandButtonText: 'white',
      inputBorder: 'lightgray',
      inputPlaceholder: 'rgb(107 114 128)',
      defaultButtonBorder: '#eaeaea',
      // ..
  },
  fontSizes: {
    baseBodySize: '18px',
    baseInputSize: '18px',
    baseLabelSize: '18px',
    baseButtonSize: '18px',
  },
  space:{
    buttonPadding: '12px 12px',
    inputPadding: '16px 15px',
    labelBottomMargin: '4px',
    labelLeftMargin: '8px',
  },
  radii: {
    borderRadiusButton: '12px',
    buttonBorderRadius: '12px',
    inputBorderRadius: '12px',
  },
  
  
}
}
const Main = () => {
  var [pagechanger, setpage] = useState("account")
  const session = useSession()
  const supabase = useSupabaseClient()

  
  return (
    
    <div >
      {!session ? (
         <div className='flex w-full h-screen items-center justify-center bg-blue-300'>

         <div className=' bg-white px-20 py-20 rounded-3xl border-2 border-grey-200'>
           <div className = "flex justify-center items-center">
             <h1 className = "text-5xl font-semibold text-slate-800"> UNITE </h1>
           </div>
           <p className = "font-medium text-lg text-gray-500 mt-4">Welcome Back! Please enter your details.</p>
           <div className = "mt-8 ">
               <Auth supabaseClient={supabase} 
               appearance={{ theme: customTheme }} theme="default"/>
           </div>
         </div>
       </div>
      ) : (
        // if(pagechanger==="account"){
        <Home />
        // }

      )}
    </div>


  )
}

export default Main
