import { localKey, secretKey } from '@/store/staticData/costants';
import { ApiResponse } from '@/types/response';

export async function GET(request: Request) {
	const url = new URL(request.url);
	const subject = url.searchParams.get('subject');
	const startIndex = url.searchParams.get('startIndex');
	const key = localKey || secretKey;
	const apiUrl = `https://www.googleapis.com/books/v1/volumes?q="subject:${subject}"&key=${key}&printType=books&startIndex=${startIndex}&maxResults=6&langRestrict=en`;

	try {
		const response = await fetch(apiUrl);
		const data = (await response.json()) as ApiResponse;

		// Чтобы не было ошибки
		const filtered = data.items.filter(
			({ saleInfo, volumeInfo }) => saleInfo != null && volumeInfo != null
		);
		// Деструктуризирую ответ с гуглБукса под то что мне нужно
		return new Response(
			JSON.stringify(
				filtered.map(({ saleInfo, volumeInfo }) => ({ saleInfo, volumeInfo }))
			)
		);
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (error) {
		return new Response(JSON.stringify({ error: 'Invalid request' }));
	}
}
