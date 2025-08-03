export async function POST(request: Request) {
	try {
		const { email, password } = await request.json();
		const validatedInfo = validate(email, password);

		if (validatedInfo.error) {
			return new Response(
				JSON.stringify({ error: true, message: validatedInfo.message }),
				{
					status: 400,
					headers: { 'Content-Type': 'application/json' },
				}
			);
		}
		return new Response(JSON.stringify({ error: false, token: 'fakeToken' }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (error) {
		return new Response(
			JSON.stringify({ error: true, message: 'Invalid request' }),
			{
				status: 400,
				headers: { 'Content-Type': 'application/json' },
			}
		);
	}
}
// Валидация 
function validate(email: string, password: string) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	if (!email || !password) {
		return { error: true, message: 'Email and password are required' };
	} else if (!emailRegex.test(email)) {
		return { error: true, message: 'Invalid email format' };
	} else if (password.length < 6) {
		return { error: true, message: 'Password is too short' };
	}
	return { error: false };
}
