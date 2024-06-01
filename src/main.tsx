import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { ThemeProvider } from '@modules/theme/theme-provider'
import { Toaster } from '@ui/toaster'
import { App } from '@/App'
import '@assets/global.css'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
      <React.StrictMode>
        <App />
        <Toaster />
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </React.StrictMode>
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
)
