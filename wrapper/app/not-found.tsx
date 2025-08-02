import Link from 'next/link';

export default function NotFound() {
	return (
		<div style={{ fontSize: '20px', maxWidth: '550px', margin: '100px auto' }}>
			Такой страницы нет, но есть главная, профиль и корзина!{' '}
			<Link href="/">BOOKS</Link> <Link href="/profile">PROFILE</Link>{' '}
			<Link href="/cart">CART</Link>
		</div>
	);
}
