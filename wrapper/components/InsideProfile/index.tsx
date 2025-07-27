import st from './styles.module.scss';
import Image from 'next/image';
import avatar from '@/public/images/avatar.png';

export const InsideProfile = () => {
	return (
		<section className={st.info}>
			<div className={st.profile}>
				<h2 className={st.titleProfile}>PROFILE</h2>
				<div className={st.profileBlock}>
					<Image src={avatar} alt="*" priority={false} />
					<div className={st.profileData}>
						<p className={st.nameAndEmail}>
							YOUR NAME <br />
							John Smith
						</p>
						<p className={st.nameAndEmail}>
							YOUR EMAIL <br />
							example@mail.com
						</p>
						<button className={st.editBtn}>EDIT PROFILE</button>
					</div>
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
