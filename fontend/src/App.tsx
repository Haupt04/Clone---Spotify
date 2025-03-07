import { Routes, Route } from "react-router-dom";
import  Homepage  from "./pages/Home/Homepage";
import AuthCallbackPage from './pages/auth-callback/AuthCallbackPage'
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import MainLayout from "./layout/MainLayout";
import ChatPage from "./pages/chat/ChatPage";
import AlbumPage from './pages/album/AlbumPage'
import AdminPage from "./pages/admin/AdminPage";
import {Toaster} from 'react-hot-toast'


function App() {

  return (
    <>
       <Routes>
          <Route path='/sso-callback' element={<AuthenticateWithRedirectCallback signUpForceRedirectUrl={"/auth-callback"} />}/>
          <Route path='/auth-callback' element={<AuthCallbackPage />}/>
          <Route path='/admin' element={<AdminPage />}/>


          <Route element={<MainLayout />}>
            <Route path='/' element={<Homepage />}/>
            <Route path='/chat' element={<ChatPage />}/>
            <Route path='/albums/:albumId' element={<AlbumPage />}/>

          </Route>
       </Routes>
       <Toaster />
    </>
  )
}

export default App
