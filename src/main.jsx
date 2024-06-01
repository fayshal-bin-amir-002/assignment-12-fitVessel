import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  RouterProvider,
} from "react-router-dom";
import './index.css'
import router from './Routes/Router';
import { HelmetProvider } from 'react-helmet-async';
import AuthProvider from './provider/AuthProvider';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoadingSpiner from './components/shared/LoadingSpiner/LoadingSpiner';


const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <AuthProvider>
          <RouterProvider router={router} fallbackElement={<LoadingSpiner isBig={true}></LoadingSpiner>} />
          <Toaster />
        </AuthProvider>
      </HelmetProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)