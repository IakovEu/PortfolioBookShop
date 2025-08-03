'use client';
import st from './styles.module.scss';
import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Image from 'next/image';
import avatar from '@/public/avatar.png';
import { RootDispatch, RootState } from '@/store/reducers/store';
import { Authorization } from '../Authorization';
import { toastSettings } from '@/store/staticData/costants';
import { setIsEditOpen } from '@/store/reducers/editProfileSlice';
import {
	editUserData,
	setVisibility,
} from '@/store/reducers/authorizationSlice';

export const InsideProfile = () => {
	const dispatch = useDispatch<RootDispatch>();
	const name = useSelector((state: RootState) => state.authorization.name);
	const mail = useSelector((state: RootState) => state.authorization.email);
	const pass = useSelector((state: RootState) => state.authorization.password);
	const isEditOpen = useSelector(
		(state: RootState) => state.editProfile.isEditOpen
	);
	const userToken = useSelector(
		(state: RootState) => state.authorization.token
	);
	const nameRef = useRef('');
	const mailRef = useRef('');
	const passRef = useRef('');
	const capName = name[0].toUpperCase() + name.slice(1);
	const inputsMap = [
		['Change your name', 'New name:', nameRef],
		['Change your email', 'New email:', mailRef],
		['Change your password', 'New password:', passRef],
	];

	const handleSave = () => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (
			(emailRegex.test(mailRef.current) || mailRef.current.length === 0) &&
			(passRef.current.length >= 6 || passRef.current.length === 0)
		) {
			dispatch(
				editUserData({
					mail: mailRef.current || mail,
					name: nameRef.current || name,
					pass: passRef.current || pass,
				})
			);
			dispatch(setIsEditOpen());
		} else {
			toast('Invalid email address or password', {
				...toastSettings,
				autoClose: 2500,
			});
		}
	};

	return (
		<section className={st.info}>
			<div className={st.profile}>
				<h2 className={st.titleProfile}>PROFILE</h2>
				<div className={st.profileBlock}>
					<Image src={avatar} alt="*" priority={false} />
					{isEditOpen ? (
						<div className={st.changeBlock}>
							{inputsMap.map(([title, placeholder, ref], ind) => (
								<div key={ind}>
									<p className={st.changeTitle}>{title as string}</p>
									<input
										type="text"
										onChange={(e) => {
											(ref as React.RefObject<string>).current = e.target.value;
										}}
										placeholder={placeholder as string}
										className={st.input}
									/>
								</div>
							))}
							<div className={st.editBtnBlock}>
								<button className={st.editBtn} onClick={handleSave}>
									SAVE
								</button>
							</div>
						</div>
					) : (
						<div className={st.profileData}>
							<p className={st.nameAndEmail}>
								YOUR NAME <br />
								{name ? capName : 'Edit profile to add your name'}
							</p>
							<p className={st.nameAndEmail}>
								YOUR EMAIL <br />
								{mail || 'You need to log in!'}
							</p>
							<button
								className={st.editBtn}
								onClick={() => {
									if (userToken.length === 0) {
										dispatch(setVisibility(true));
									} else {
										dispatch(setIsEditOpen());
									}
								}}>
								EDIT PROFILE
							</button>
						</div>
					)}
				</div>
			</div>
			<div className={st.about}>
				<h3 className={st.titleAbout}>ABOUT ME</h3>
				<p className={st.txtAbout}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in ante
					consequat, ornare nisi et, ultrices libero. Nunc nibh dolor, maximus
					quis auctor nec, tempor quis ipsum. Proin mollis pellentesque nulla ac
					varius.
				</p>
			</div>
			<Authorization />
		</section>
	);
};
