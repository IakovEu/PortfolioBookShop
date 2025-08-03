'use client';
import { useState, useEffect } from 'react';
import st from './styles.module.scss';
import { toast } from 'react-toastify';
import { toastSettings } from '@/store/staticData/costants';
import { RootDispatch, RootState } from '@/store/reducers/store';
import { useDispatch, useSelector } from 'react-redux';
import {
	setVisibility,
	setUserData,
} from '@/store/reducers/authorizationSlice';

export const Authorization = () => {
	const visibility = useSelector(
		(state: RootState) => state.authorization.visibility
	);
	const userToken = useSelector(
		(state: RootState) => state.authorization.token
	);
	const dispatch = useDispatch<RootDispatch>();
	const [mail, setMail] = useState<string>('');
	const [pass, setPass] = useState<string>('');

	useEffect(() => {
		dispatch(setVisibility(userToken.length === 0));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const login = async () => {
		const bodyPost = {
			email: mail,
			password: pass,
		};

		const response = await fetch('http://localhost:3000/api/auth', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(bodyPost),
		});
		const result = await response.json();

		if (!result.error) {
			dispatch(setUserData([mail, pass, result.token]));
			dispatch(setVisibility(false));
			toast('Successfully logged in', toastSettings);
		} else {
			toast(result.message, {
				...toastSettings,
				autoClose: 2500,
			});
		}
	};

	return (
		visibility && (
			<section className={st.authorization}>
				<div className={st.topPanel}>
					<h3 className={st.title}>User authorization</h3>
					<button
						className={st.btnClose}
						onClick={() => {
							dispatch(setVisibility(false));
						}}>
						&#x2715;
					</button>
				</div>
				<p className={st.subTitle}>Email:</p>
				<input
					className={st.mail}
					type="email"
					placeholder="Email:"
					onChange={(e) => {
						setMail(e.target.value);
					}}
				/>
				<p className={st.subTitle}>Password:</p>
				<input
					className={st.password}
					type="password"
					placeholder="Password:"
					onChange={(e) => {
						setPass(e.target.value);
					}}
				/>
				<div className={st.btnBlock}>
					<button
						className={st.btnLogin}
						onClick={() => {
							login();
						}}>
						Login
					</button>
				</div>
			</section>
		)
	);
};
