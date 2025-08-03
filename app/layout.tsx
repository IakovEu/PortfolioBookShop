import './globals.css';
import 'normalize.css';
import { Metadata } from 'next';
import { ToastContainer } from 'react-toastify';
import ClientProviderWrapper from '@/components/ClientProviderWrapper';

export const metadata: Metadata = {
	title: 'Book shop',
	description: 'Book shop Next.js project',
	authors: [{ name: 'Iakov' }],
	icons: {
		icon: '/favicon.ico', // путь к фавиконке
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<ClientProviderWrapper>
					{children}
					<ToastContainer
						position="bottom-right"
						autoClose={5000}
						hideProgressBar
						newestOnTop={false}
						closeOnClick={false}
						rtl={false}
						pauseOnFocusLoss={false}
						draggable={false}
						pauseOnHover={false}
						theme="light"
					/>
				</ClientProviderWrapper>
			</body>
		</html>
	);
}
