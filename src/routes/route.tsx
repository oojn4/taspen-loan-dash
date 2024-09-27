import { Route, Routes } from 'react-router-dom'
import { User } from '../@types/user'
import { PUBLICROUTES } from '../constants/routeConstants'

const RouteApp = ({  } : { isAuthenticated?: boolean, user?: User | null }) => {
  return (
    <Routes>
      {PUBLICROUTES.map((ur, urIdx) => 
        <Route key={urIdx} path={ur.path} element={<ur.element />} />
      )}
    </Routes>
  )
}

export default RouteApp