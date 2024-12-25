import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import PageNotFound from './pages/PageNotFound'
import Navbar from './components/Navbar'
import Books from './pages/Books'
import Footer from './components/Footer'
import Categories from './pages/Categories'
import BookDetail from './pages/BookDetail'
import Dashboard from './pages/dashboard/Dashboard'
import ProtectedRoute from './pages/ProtectedRoutes'
import EditBook from './pages/dashboard/EditBook'

const App = () => {
  const location = useLocation(); // Get current route

  // Conditionally render the Navbar based on the current route
  const showNavbar = !['/login', '/register'].includes(location.pathname);


  const allowedEmail = 'koech3659@gmail.com'
  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Signup />}></Route>
        <Route path='/' element={<Home />}></Route>
        <Route path='*' element={<PageNotFound />}></Route>
        <Route path='/ebooks' element={<Books />}></Route>
        <Route path='/categories' element={<Categories />}></Route>
        <Route path='/book_detail/:id' element={<BookDetail />}></Route>
        <Route path='/admin' element={
          <Dashboard />
        }></Route>
        <Route path='admin/edit/:id' element={
          <EditBook />
        }></Route>
      </Routes>
      {showNavbar && <Footer />}
    </>
  )
}

export default App