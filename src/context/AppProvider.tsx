import { createContext, useEffect} from 'react'
import { notification } from 'antd';

type NotificationContextType = {
  showNotification: any;
};

export const AppContext = createContext<NotificationContextType>({
  showNotification: null,
});

export default function AppProvider ({children}: {children: any}) {
  const [api, contextHolder] = notification.useNotification();
  return (
    <AppContext.Provider value={{ showNotification: api }}>
      {children}
      {contextHolder}
    </AppContext.Provider>
  )
}