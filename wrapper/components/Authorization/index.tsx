'use client';
import { useState } from 'react';
import st from './styles.module.scss';
import { toast } from 'react-toastify';
import { toastSettings } from '@/staticData/costants';

export const Authorization = () => {
	const [visible, setVisibility] = useState(true);
	const [mail, setMail] = useState<string>('');
	const [pass, setPass] = useState<string>('');

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
			setVisibility(false);
			toast('Successfully logged in', toastSettings);
		} else {
			toast(result.message, {
				...toastSettings,
				autoClose: 2500,
			});
		}
	};

	return (
		visible && (
			<section className={st.authorization}>
				<div className={st.topPanel}>
					<h3 className={st.title}>User authorization</h3>
					<button
						className={st.btnClose}
						onClick={() => {
							setVisibility(false);
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
