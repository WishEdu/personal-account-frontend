import React from 'react'

import Paths from '../../shared/paths'

import CustomNavLink from '../CustomLink'

type AuthServiceAgreeProps = {
	agreeIsChecked: boolean
	setAgreeIsChecked: React.Dispatch<React.SetStateAction<boolean>>
}

const AuthServiceAgree: React.FC<AuthServiceAgreeProps> = ({ agreeIsChecked, setAgreeIsChecked }) => {
	return (
		<span className="auth--is-agree">
			<input type="checkbox" checked={agreeIsChecked} onChange={() => setAgreeIsChecked((p) => !p)} />
			Согласны с
			<CustomNavLink to={Paths.termsAndConditions} target="_blank" className="auth--is-agree__navlink">
				правилами и условиями
			</CustomNavLink>
		</span>
	)
}

export default AuthServiceAgree
