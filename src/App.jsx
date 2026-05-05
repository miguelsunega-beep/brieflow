import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Admin from './pages/Admin'
import FormEditor from './pages/FormEditor'
import ClientForm from './pages/ClientForm'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/form/:id" element={<FormEditor />} />
        <Route path="/form/:id" element={<ClientForm />} />
      </Routes>
    </BrowserRouter>
  )
}
