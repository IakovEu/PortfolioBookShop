'use client';
import { Provider } from 'react-redux';
import { store } from '@/store/reducers/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from '@/store/reducers/store';

// В лейауте есть метадата, она не стакается с 'use client', а 'use client' нужен для Provider
export default function ClientProviderWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				{children}
			</PersistGate>
		</Provider>
	);
}
