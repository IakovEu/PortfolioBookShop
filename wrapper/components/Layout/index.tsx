import st from './styles.module.scss';
import { PropsWithChildren } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import userSvg from '@/public/images/user.svg';
import searchSvg from '@/public/images/search.svg';
import cartSvg from '@/public/images/cart.svg';

export const Layout = ({ children }: PropsWithChildren) => {
	return (
		<>
			<header className={st.header}>
				<nav className={st.navigation}>
					<h1 className={st.navigation__bookshop}>BookShop</h1>
					<div className={st.navigation__links}>
						<Link href="/" className={st.navigation__links_active_link}>
							BOOKS
						</Link>
						<Link href="/audiobooks">AUDIOBOOKS</Link>
						<Link href="/gifts">STATIONARY & GIFTS</Link>
						<Link href="/blog">BLOG</Link>
					</div>
					<div className={st.navigation__icons}>
						<Link href="/profile">
							<Image src={userSvg} alt="profile" />
						</Link>
						<button>
							<Image src={searchSvg} alt="search" />
						</button>
						<Link className={st.navigation__icons_btn_cart} href="/cart">
							<Image src={cartSvg} alt="cart" />
						</Link>
					</div>
				</nav>
			</header>
			<main>{children}</main>
			<footer></footer>
		</>
	);
};
