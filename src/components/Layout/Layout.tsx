import { Loader } from '@mantine/core'
import { Suspense } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { RootState } from '../../store/store'
import PublicLayout from './LayoutTypes/PublicLayout'

const Layout = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const user = useSelector((state: RootState) => state.auth.user);
  const { pathname } = useLocation();

  let layout = <PublicLayout isAuthenticated={isAuthenticated} user={user} />


  return (
    <Suspense fallback={
      <Loader />
    }>
      {layout}
    </Suspense>
  )
}

export default Layout