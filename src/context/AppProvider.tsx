import { createContext, useEffect} from 'react'
import { notification } from 'antd';
import { usePathname } from 'next/navigation'



export const AppContext = createContext(null)

export default function AppProvider ({children}: {children: any}) {
  const [api, contextHolder] = notification.useNotification();
  const pathname = usePathname()
  return(
    <AppContext.Provider value={{ showNotification: api }}>
      {children}
      {contextHolder}
    </AppContext.Provider>
  )
}