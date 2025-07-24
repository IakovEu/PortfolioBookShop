import './globals.css';
import 'normalize.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Book shop',
	description: 'Book shop Next.js project',
	icons: {
		icon: '/images/favicon.ico', // путь к фавиконке
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
