import { lazy } from 'react';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

import GeneralLayout from "../Layouts/General.Layout"
import UseSuspense from "../Utilities/UseSuspense"

const Homepage = lazy(() => import("../Views/General/Home"))

const CreateAccountPage = lazy(() => import("../Views/Auth/CreateAccount"))
const SignInPage = lazy(() => import("../Views/Auth/SignIn"))

const ErrorPage = lazy(() => import("../Views/General/ErrorPage"))
const PageNotFoundPage = lazy(() => import("../Views/General/PageNotFound"))

function MainRoutes() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' errorElement={UseSuspense(ErrorPage)()} element={<GeneralLayout />}>
                <Route index element={UseSuspense(Homepage)()} />
                <Route path='/CreateAccount' element={UseSuspense(CreateAccountPage)()} />
                <Route path="/SignIn" element={UseSuspense(SignInPage)()} />
                <Route path="*" element={UseSuspense(PageNotFoundPage)()} />
            </Route>
        )
    )
    return <RouterProvider router={router} />;
}

export default MainRoutes;