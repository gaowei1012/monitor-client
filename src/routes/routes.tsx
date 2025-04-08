import { Route, Routes,  } from 'react-router-dom'
import { InputLogin } from '../pages/inputLogin/index'

export const Router = () => {
  return (
    <Routes>
      <Route path='/login' element={<InputLogin />} />
    </Routes>
  )
}
