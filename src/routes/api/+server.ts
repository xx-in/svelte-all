import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import _ from "lodash"

export const GET: RequestHandler = ({ request }) => {
	// create a JSON Response using a header we received
	return json({
		// retrieve a specific header
		userAgent: request.headers.get('user-agent'),
		test: _.clone("test lodash")
	}, {
		// set a header on the response
		headers: { 'x-custom-header': 'potato' }
	});
};