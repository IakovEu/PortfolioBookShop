'use client';
import st from './styles.module.scss';
import { toast } from 'react-toastify';
import { toastSettings } from '@/store/staticData/costants';
import Image from 'next/image';
import avatar from '@/public/images/avatar.png';
import { useSelector, useDispatch } from 'react-redux';
import { RootDispatch, RootState } from '@/store/reducers/store';
import { editUserData } from '@/store/reducers/authorizationSlice';
import { useState } from 'react';
import { Authorization } from '../Authorization';
import {
	setIsEditOpen,
	setIsAuthorizationOpen,
} from '@/store/reducers/editProfileSlice';

export const InsideProfile = () => {
	const [newName, setNewName] = useState(''); // можно через юз стейт и ончендж реализовать а можно через реф, как лучше?
	const [newMail, setNewMail] = useState('');
	const [newPass, setNewPass] = useState('');
	const inputsMap = [
		['Change your name', 'New name:', setNewName],
		['Change your email', 'New email:', setNewMail],
		['Change your password', 'New password:', setNewPass],
	];
	const dispatch = useDispatch<RootDispatch>();
	const name = useSelector((state: RootState) => state.authorization.name);
	const mail = useSelector((state: RootState) => state.authorization.email);
	const pass = useSelector((state: RootState) => state.authorization.password);

	const isEditOpen = useSelector(
		(state: RootState) => state.editProfile.isEditOpen
	);
	const isAuthorizationOpen = useSelector(
		(state: RootState) => state.editProfile.isAuthorizationOpen
	);
	const userToken = useSelector(
		(state: RootState) => state.authorization.token
	);

	return (
		<section className={st.info}>
			<div className={st.profile}>
				<h2 className={st.titleProfile}>PROFILE</h2>
				<div className={st.profileBlock}>
					<Image src={avatar} alt="*" priority={false} />
					{isEditOpen ? (
						<div className={st.changeBlock}>
							{inputsMap.map((el, ind) => (
								<div key={ind}>
									<p className={st.changeTitle}>{el[0] as string}</p>
									<input
										type="text"
										placeholder={el[1] as string}
										className={st.input}
										onChange={(e) => {
											if (typeof el[2] === 'function') {
												el[2](e.target.value);
											}
										}}
									/>
								</div>
							))}
							<div className={st.editBtnBlock}>
								<button
									className={st.editBtn}
									onClick={() => {
										const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
										if (
											(emailRegex.test(newMail) || newMail.length === 0) &&
											(newPass.length >= 6 || newPass.length === 0)
										) {
											dispatch(
												editUserData({
													mail: newMail.length === 0 ? mail : newMail,
													name: newName.length === 0 ? name : newName,
													pass: newPass.length === 0 ? pass : newPass,
												})
											);
											dispatch(setIsEditOpen());
										} else {
											toast('Check your password and email', {
												...toastSettings,
												autoClose: 2500,
											});
										}
									}}>
									SAVE
								</button>
							</div>
						</div>
					) : (
						<div className={st.profileData}>
							<p className={st.nameAndEmail}>
								YOUR NAME <br />
								{name || newName || 'Edit profile to add your name'}
							</p>
							<p className={st.nameAndEmail}>
								YOUR EMAIL <br />
								{mail || newMail || 'You need to log in!'}
							</p>
							<button
								className={st.editBtn}
								onClick={() => {
									if (userToken.length === 0) {
										dispatch(setIsAuthorizationOpen());
									} else if (userToken.length !== 0) {
										dispatch(setIsEditOpen());
									}
								}}>
								EDIT PROFILE
							</button>
							{isAuthorizationOpen && <Authorization />}
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
		</section>
	);
};
