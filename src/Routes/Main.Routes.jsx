import { lazy } from 'react';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

import GeneralLayout from "../Layouts/General.Layout"
import UseSuspense from "../Utilities/UseSuspense"

const Homepage = lazy(() => import("../Views/General/Home"))
const DocumentationPage = lazy(() => import("../Views/General/Documentation"))
const FAQPage = lazy(() => import("../Views/General/FAQ"))
const PricingPage = lazy(() => import("../Views/General/Pricing"))
const FeedbackPage = lazy(() => import("../Views/General/Feedback"))

const ErrorPage = lazy(() => import("../Views/General/ErrorPage"))
const PageNotFoundPage = lazy(() => import("../Views/General/PageNotFound"))

function MainRoutes() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' errorElement={UseSuspense(ErrorPage)()} element={<GeneralLayout />}>
                <Route index element={UseSuspense(Homepage)()} />
                <Route path="/Documentation" element={UseSuspense(DocumentationPage)()} />
                <Route path="/FAQ" element={UseSuspense(FAQPage)()} />
                <Route path="/Pricing" element={UseSuspense(PricingPage)()} />
                <Route path="/Feedback" element={UseSuspense(FeedbackPage)()} />
                <Route path="*" element={UseSuspense(PageNotFoundPage)()} />
            </Route>
        )
    )
    return <RouterProvider router={router} />;
}

export default MainRoutes;