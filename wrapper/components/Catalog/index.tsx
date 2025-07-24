import st from './styles.module.scss';
import clsx from 'clsx';

export const Catalog = () => {
	return (
		<section className={st.catalog}>
			<div className={st.catalog__list}>
				<ul>
					<li className={clsx(st.list__li, st.li__active)}>Architecture </li>
					<li className={st.list__li}>Art & Fashion</li>
					<li className={st.list__li}>Biography</li>
					<li className={st.list__li}>Business</li>
					<li className={st.list__li}>Crafts & Hobbies</li>
					<li className={st.list__li}>Drama</li>
					<li className={st.list__li}>Fiction</li>
					<li className={st.list__li}>Food & Drink</li>
					<li className={st.list__li}>Health & Wellbeing</li>
					<li className={st.list__li}>History & Politics</li>
					<li className={st.list__li}>Humor</li>
					<li className={st.list__li}>Poetry</li>
					<li className={st.list__li}>Psychology</li>
					<li className={st.list__li}>Science</li>
					<li className={st.list__li}>Technology</li>
					<li className={st.list__li}>Travel & Maps</li>
				</ul>
			</div>
			<div className={st.catalog__cards}>
				<div className={st.description__load}>
					<button>LOAD MORE</button>
				</div>
			</div>
		</section>
	);
};
