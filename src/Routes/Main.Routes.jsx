import { lazy } from 'react';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

import GeneralLayout from "../Layouts/General.Layout"
import UseSuspense from "../Utilities/UseSuspense"

const Homepage = lazy(() => import("../Views/General/Home"))
const ResourcesPage = lazy(() => import("../Views/General/Resources"))
const FAQPage = lazy(() => import("../Views/General/FAQ"))
const PricingPage = lazy(() => import("../Views/General/Pricing"))
const ContactUsPage = lazy(() => import("../Views/General/ContactUs"))

const ErrorPage = lazy(() => import("../Views/General/ErrorPage"))
const PageNotFoundPage = lazy(() => import("../Views/General/PageNotFound"))

function MainRoutes() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' errorElement={UseSuspense(ErrorPage)()} element={<GeneralLayout />}>
                <Route index element={UseSuspense(Homepage)()} />
                <Route path="/Resources" element={UseSuspense(ResourcesPage)()} />
                <Route path="/FAQ" element={UseSuspense(FAQPage)()} />
                <Route path="/Pricing" element={UseSuspense(PricingPage)()} />
                <Route path="/ContactUs" element={UseSuspense(ContactUsPage)()} />
                <Route path="*" element={UseSuspense(PageNotFoundPage)()} />
            </Route>
        )
    )
    return <RouterProvider router={router} />;
}

export default MainRoutes;