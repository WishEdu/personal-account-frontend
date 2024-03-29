import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { LOGIN_MISSED_VALUE_MESSAGE } from '../../../shared/messages/login-messages'
import { UNKNOWN_ERROR_MESSAGE } from '../../../shared/messages/main-messages'
import Paths from '../../../shared/paths'
import Status from '../../../shared/status'

import isErrorWithMessage from '../../../utils/is-error-with-message'

import { selectAuthStatus } from '../../../redux/slices/auth/selectors'
import { fetchAuthLogin } from '../../../redux/slices/auth/slice'

import useAppDispatch from '../../../hooks/useAppDispatch'
import useAppSelector from '../../../hooks/useAppSelector'

import Button from '../../Button'
import Error from '../../Error'
import AuthNavigation from '../AuthNavigation'
import AuthSaveUser from '../AuthSaveUser'
import StyledAuth, { StyledInput } from '../styles'

type LoginProps = {} & React.ComponentPropsWithoutRef<'div'>

type FormLoginValues = {
	login: string
	email: string
	password: string
}

const Login: React.FC<LoginProps> = ({ ...props }) => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const status = useAppSelector(selectAuthStatus)

	const [error, setError] = useState<null | string>(null)
	const [saveUserIsChecked, setSaveUserIsChecked] = useState(false)

	const {
		register,
		handleSubmit: handleDirtySubmit,
		formState: { errors, isValid },
	} = useForm<FormLoginValues>({
		mode: 'onChange',
		defaultValues: {
			login: '',
			password: '',
		},
	})

	const isDisabledButton = status === Status.LOADING || !isValid

	const onSubmit: SubmitHandler<FormLoginValues> = async (values) => {
		const { login, password } = values
		const loginBody = {
			login,
			password,
		}

		try {
			const data = await dispatch(fetchAuthLogin(loginBody)).unwrap()

			if ('token' in data)
				saveUserIsChecked
					? localStorage.setItem('token', data.token)
					: sessionStorage.setItem('token', data.token)

			navigate(Paths.profile.dynamic(data.id))
		} catch (_err) {
			const err = isErrorWithMessage(_err) ? _err.errorMessage : UNKNOWN_ERROR_MESSAGE

			setError(err)
		}
	}

	const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault()
		!errors && handleDirtySubmit(onSubmit)()
	}

	return (
		<StyledAuth {...props}>
			<AuthNavigation isLogin />
			<form onSubmit={handleSubmit}>
				<StyledInput
					{...register('login', {
						required: LOGIN_MISSED_VALUE_MESSAGE,
					})}
					placeholder="Логин или почта"
					autoComplete="login"
					height="45px"
				/>
				<StyledInput
					{...register('password', { required: true })}
					type="password"
					placeholder="Пароль"
					autoComplete="new-password"
					height="45px"
				/>
				{error !== null && <Error className="login--error">{error}</Error>}
				<div className="auth__parameters">
					<AuthSaveUser
						saveUserIsChecked={saveUserIsChecked}
						setSaveUserIsChecked={setSaveUserIsChecked}
						disabled={status === Status.LOADING}
					/>
				</div>
				<Button disabled={isDisabledButton} type="submit" width="100%" height="45px">
					Войти
				</Button>
			</form>
		</StyledAuth>
	)
}

export default Login
