import { lazy } from 'react'
import { Routes } from '../@types/route'


export const PUBLICROUTES: Routes = [
  {
    key: 'home',
    name: 'Home',
    path: '/',
    element: lazy(() => import('../pages/Home/Home')),
  },  {
    key: 'loan',
    name: 'Loan',
    path: '/loan',
    element: lazy(() => import('../pages/Loan/Loan')),
  },
]

