import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthLayout } from './components/index.js'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Account from './pages/Account.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import Category from './pages/Category.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Homecategory from './pages/Homecategory.jsx'
import Lang from './pages/Lang.jsx'
import HomeLang from './pages/HomeLang.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: (
                <AuthLayout authentication={false}>
                    <Login />
                </AuthLayout>
            ),
        },
        {
            path: "/signup",
            element: (
                <AuthLayout authentication={false}>
                    <Signup />
                </AuthLayout>
            ),
        },
        {
            path: "/category",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <Category />
                </AuthLayout>
            ),
        },
        {
            path: "/lang",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <Lang/>
                </AuthLayout>
            ),
        },
        {
            path: "/HomeLang",
            element: (
                <AuthLayout authentication={false}>
                    {" "}
                    <HomeLang/>
                </AuthLayout>
            ),
        },
        {
            path: "/Homecategory",
            element: (
                <AuthLayout authentication={false}>
                    {" "}
                    <Homecategory/>
                </AuthLayout>
            ),
        },
        {
            path: "/account",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <Account />
                </AuthLayout>
            ),
        },
    ],
},
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
