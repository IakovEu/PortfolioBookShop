'use client';
import st from './styles.module.scss';
import { PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/reducers/store';
import Image from 'next/image';
import Link from 'next/link';
import userSvg from '@/public/user.svg';
import searchSvg from '@/public/search.svg';
import cartSvg from '@/public/cart.svg';
import { Montserrat } from 'next/font/google';
import { Open_Sans } from 'next/font/google';

const openSans = Open_Sans({
	weight: ['400'],
	subsets: ['latin', 'cyrillic'],
});
const montserrat = Montserrat({
	weight: ['400', '600', '700', '800'],
	subsets: ['latin', 'cyrillic'],
});

export const Layout = ({ children }: PropsWithChildren) => {
	const favorites = useSelector(
		(state: RootState) => state.bookStore.favorites
	);
	const values = Object.values(favorites);
	const amount = values.reduce((acc, el) => (acc += el.amount), 0);

	return (
		<>
			<header className={`${montserrat.className} ${st.header}`}>
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
						<button className={st.search}>
							<Image src={searchSvg} alt="search" />
						</button>
						<Link className={st.navigation__icons_btn_cart} href="/cart">
							<Image src={cartSvg} alt="cart" />
							{!!amount && <div className={st.badge}>{amount}</div>}
						</Link>
					</div>
				</nav>
			</header>
			<main className={`${montserrat.className} ${openSans.className}`}>
				{children}
			</main>
			<footer></footer>
		</>
	);
};
