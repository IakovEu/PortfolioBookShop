import { Catalog } from '@/components/Catalog';
import { Layout } from '@/components/Layout';
import { Slider } from '@/components/Slider';

export default function Home() {
	return (
		<Layout>
			<Slider />
			<Catalog />
		</Layout>
	);
}
