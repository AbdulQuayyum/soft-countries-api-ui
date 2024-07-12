import { lazy } from 'react';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import GeneralLayout from '../Layouts/General.Layout';
import UseSuspense from '../Utilities/UseSuspense';
import ProtectedLayout from '../Layouts/Protected.Layout';

const Homepage = lazy(() => import('../Views/General/Home'));
const ResourcesPage = lazy(() => import('../Views/General/Resources'));
const FAQPage = lazy(() => import('../Views/General/FAQ'));
const PricingPage = lazy(() => import('../Views/General/Pricing'));
const ContactUsPage = lazy(() => import('../Views/General/ContactUs'));

const DashboardPage = lazy(() => import('../Views/Dashboard/Home'));
const SettingsPage = lazy(() => import('../Views/Dashboard/Settings'));
const StatisticsPage = lazy(() => import('../Views/Dashboard/Statistics'));

const ErrorPage = lazy(() => import('../Views/General/ErrorPage'));
const PageNotFoundPage = lazy(() => import('../Views/General/PageNotFound'));

function MainRoutes() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path="/" element={<GeneralLayout />} errorElement={UseSuspense(ErrorPage)()}>
                    <Route index element={UseSuspense(Homepage)()} />
                    <Route path="Resources" element={UseSuspense(ResourcesPage)()} />
                    <Route path="FAQ" element={UseSuspense(FAQPage)()} />
                    <Route path="Pricing" element={UseSuspense(PricingPage)()} />
                    <Route path="ContactUs" element={UseSuspense(ContactUsPage)()} />
                    <Route path="*" element={UseSuspense(PageNotFoundPage)()} />
                </Route>
                <Route element={<ProtectedLayout />} errorElement={UseSuspense(ErrorPage)()}>
                    <Route path="/Dashboard" element={UseSuspense(DashboardPage)()} />
                    <Route path="/Settings" element={UseSuspense(SettingsPage)()} />
                    <Route path="/Statistics" element={UseSuspense(StatisticsPage)()} />
                </Route>
            </>
        )
    );
    return <RouterProvider router={router} />;
}

export default MainRoutes;
