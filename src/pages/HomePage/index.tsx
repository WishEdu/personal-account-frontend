import React from 'react'
import { useNavigate } from 'react-router-dom'

import Colors from '../../shared/colors'
import { CDN_STATIC_IMG } from '../../shared/constants'
import Paths from '../../shared/paths'

import { selectAuthData } from '../../redux/slices/auth/selectors'

import useAppSelector from '../../hooks/useAppSelector'

import MainLayout from '../../layouts/MainLayout'

import { StyledButton, StyledHomePageNoAuth } from './styles'

const HomePage: React.FC = () => {
	const navigate = useNavigate()

	// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
	const authData = useAppSelector(selectAuthData)

	const isAuth = false // !!authData

	// TODO: Create navigation to other services

	const handleClickNavigate = () => navigate(Paths.registration)

	return (
		<MainLayout title="Главная" description="Добро пожаловать на главную страницу!">
			{/* TODO: Create bottom side with sections, which navigate to WISH EDU services */}
			{/* TODO: Create auth home page, split to sub components */}
			{/* TODO: Create slider for right section with images */}
			{/* TODO: Added animations for images */}
			{isAuth ? null : (
				<StyledHomePageNoAuth>
					<section>
						<h4> Платформа </h4>
						<h3> Экосистема </h3>
						<h2> WISH EDU </h2>
						<p>
							Инновационное решение для академии ВИШ, собственная платформа обучения для студентов. Это не просто
							СДО, это — WISH EDU!
						</p>
						<StyledButton
							onClick={handleClickNavigate}
							width="250px"
							textColor={Colors.WHITE}
							color={Colors.BLUE_WISH}
						>
							Получить доступ
						</StyledButton>
					</section>
					<section>
						<img src={`${CDN_STATIC_IMG}/greetings-pic.webp`} alt="🔗" />
					</section>
				</StyledHomePageNoAuth>
			)}
		</MainLayout>
	)
}

export default HomePage
