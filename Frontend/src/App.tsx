import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Home, SignUp, Login, CreatePost } from './pages'
import { Footer } from './components';

type Props = {}

function App({}: Props) {
  const location = useLocation()

  const navbarPaths = ['/', '/create-post']

  const showNavbar = navbarPaths.includes(location.pathname)

  return (
    <>
      {showNavbar && (
        <header>
          <Navbar />
        </header>
      )}

      <main>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/create-post' element={<CreatePost />}/>
          <Route path='/signUp' element={<SignUp />}/>
          <Route path='/login' element={<Login />}/>
        </Routes>
      </main>

      {showNavbar && (
        <footer>
          <Footer />
        </footer>
      )}
    </>
  )
}

export default App