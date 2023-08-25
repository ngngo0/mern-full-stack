//root component
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';

//pages and componenets
import Home from './pages/Home'
import Navbar from './components/Nabar';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  const {user} = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <div className='pages'>
          <Routes>
            <Route 
              path= "/"
              //redirect them based on authentication status
              element={user ? <Home/> : <Navigate to='/login' />}
            />
            <Route 
              path= "/login"
              element={!user ? <Login/> : <Navigate to="/" />}
            />
            <Route 
              path= "/signup"
              element={!user ? <Signup/> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
