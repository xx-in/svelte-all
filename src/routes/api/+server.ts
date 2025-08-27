import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ request }) => {
	return json(
		{
			userAgent: request.headers.get('user-agent')
		},
		{
			headers: { 'x-custom-header': 'potato' }
		}
	);
};
