import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

import { Router } from '@remix-run/router'

import Paths from '@shared/paths'

// Lazy pages

const NotFoundPage = React.lazy(
	() => import(/* webpackChunkName: "NotFoundPage" */ '../../pages/NotFoundPage'),
)
const MaintenanceServicePage = React.lazy(
	() => import(/* webpackChunkName: "MaintenanceServicePage" */ '../../pages/MaintenanceServicePage'),
)

const HomePage = React.lazy(() => import(/* webpackChunkName: "HomePage" */ '../../pages/HomePage'))

const ProfilePage = React.lazy(() => import(/* webpackChunkName: "ProfilePage" */ '../../pages/ProfilePage'))

const AuthPage = React.lazy(() => import(/* webpackChunkName: "AuthPage" */ '../../pages/AuthPage'))

const TermsAndConditionsPage = React.lazy(
	() => import(/* webpackChunkName: "TermsAndConditionsPage" */ '../../pages/TermsAndConditionsPage'),
)

const router: Router = createBrowserRouter([
	// Main
	{
		path: Paths.home,
		element: <HomePage />,
		errorElement: <NotFoundPage />,
	},
	{
		path: Paths.about,
		element: <NotFoundPage />,
		errorElement: <NotFoundPage />,
	},
	{
		path: Paths.contacts,
		element: <NotFoundPage />,
		errorElement: <NotFoundPage />,
	},
	{
		path: Paths.termsAndConditions,
		element: <TermsAndConditionsPage />,
		errorElement: <NotFoundPage />,
	},
	{
		path: Paths.any,
		element: <NotFoundPage />,
		errorElement: <NotFoundPage />,
	},
	{
		path: Paths.maintenanceService,
		element: <MaintenanceServicePage />,
		errorElement: <NotFoundPage />,
	},
	// Auth
	{
		path: Paths.registration,
		element: <AuthPage />,
		errorElement: <NotFoundPage />,
	},
	{
		path: Paths.login,
		element: <AuthPage />,
		errorElement: <NotFoundPage />,
	},
	{
		path: Paths.forgotPassword,
		element: <AuthPage />,
		errorElement: <NotFoundPage />,
	},
	// Profile
	{
		path: Paths.profile.static,
		element: <ProfilePage />,
		errorElement: <NotFoundPage />,
		children: [
			{
				path: Paths.profile.children.aboutMe,
				element: <h1> Обо мне</h1>,
			},
			{
				path: Paths.profile.children.wall,
				element: <h1> Стена </h1>,
			},
			{
				path: Paths.profile.children.portfolio,
				element: <h1> Портфолио </h1>,
			},
		],
	},
	{
		path: Paths.settings,
		element: <ProfilePage />,
		errorElement: <NotFoundPage />,
	},
])

export default router
