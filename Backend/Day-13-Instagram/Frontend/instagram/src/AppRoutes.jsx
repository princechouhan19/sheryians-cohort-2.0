import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'

function AppRoutes(){
    return(
        <BrowserRouter>
        <Routes>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/register' element={<Register/>}></Route>
        </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes