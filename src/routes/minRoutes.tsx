import { Route, Routes } from 'react-router-dom'
import { Database } from '../pages/database/indexes/index'
import { DatabaseDetail } from '../pages/database/detail/index'
import { Particulars } from '../pages/particulars/index'
import { IncomeDetails } from '../pages/income/details/index'
import { IncomeIndex } from '../pages/income/indexes/index'
import { NotFound } from '../pages/notfound/index'
// import { Container } from '../container/index'


const Router = () => {
  return (
    <Routes>
      {/* <Route path='/' element={<Container />} /> */}
      <Route path='/database/index' element={<Database />} />
      <Route path='/database/detail' element={<DatabaseDetail/>} />
      <Route path='/income/detail' element={<IncomeDetails/>} />
      <Route path='/income/index' element={<IncomeIndex/>} />
      <Route path='/particulars' element={<Particulars />} />
      <Route element={<NotFound />} />
    </Routes>
  )
}

export { Router }
