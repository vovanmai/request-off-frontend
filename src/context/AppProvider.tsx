import {createContext, useEffect} from 'react'
import { useAppDispatch } from '@/store/hooks'
import { getProfile as requestProfile} from "@/api/user/auth/index"
import { setCurrentUser } from '@/store/user/auth/authSlice'

export const AppContext = createContext(null);

export default function AppProvider ({children}: {children: any}) {
  const dispatch = useAppDispatch()
  const getProfile = async () => {
    try {
      const response = await requestProfile()
      dispatch(setCurrentUser(response?.data))
    } catch (error) {

    }
  }
  useEffect(() => {
    getProfile()
  }, [])
  return (
    <AppContext.Provider value={null}>
      {children}
    </AppContext.Provider>
  )
}