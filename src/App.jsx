// @ts-nocheck

import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'

import GlobalStyles from './styles/GlobalStyles'

import Dashboard from './pages/Dashboard'
import Bookings from './pages/Bookings'
import Cabins from './pages/Cabins'
import Users from './pages/Users'
import Settings from './pages/Settings'
import Account from './pages/Account'
import Login from './pages/Login'
import PageNotFound from './pages/PageNotFound'
import AppLayout from './ui/AppLayout'

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to='dashboard' />} />
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='bookings' element={<Bookings />} />
            <Route path='cabins' element={<Cabins />} />
            <Route path='users' element={<Users />} />
            <Route path='settings' element={<Settings />} />
            <Route path='account' element={<Account />} />
          </Route>

          <Route path='login' element={<Login />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

// import './App.css'

// import styled from 'styled-components'

// import GlobalStyles from './styles/GlobalStyles'
// import Heading from './ui/Heading'
// import Button from './ui/Button'
// import Input from './ui/Input'
// import Row from './ui/Row'

// const StyledApp = styled.main`
//   /* background-color: var(--color-red-800); */
//   /* background-color: red; */
//   padding: 20px;
// `
// function App() {
//   return (
//     <>
//       <GlobalStyles />
//       <StyledApp>
//         <Row type='vertical'>
//           <Row type='horizontal'>
//             {/* <Heading type='h1'>The Wild Oasis!</Heading> */}
//             {/* Useful for SEO instead of type we change it to as= meaning as prop/property part of styled-components*/}
//             <Heading as='h1'>The Wild Oasis!</Heading>
//             <div>
//               <Heading as='h2'>Check in and out!</Heading>
//               <Button onClick={() => alert('Check in')}>Check in</Button>
//               <Button
//                 variation='secondary'
//                 sizes='small'
//                 onClick={() => alert('Check out')}
//               >
//                 Check out
//               </Button>
//             </div>
//           </Row>

//           <Row type='vertical'>
//             <Heading as='h3'>Form</Heading>
//             <form>
//               <Input type='number' placeholder='Number of guests' />
//               <Input type='number' placeholder='Number of guests' />
//             </form>
//           </Row>
//         </Row>
//       </StyledApp>
//     </>
//   )
// }

export default App
