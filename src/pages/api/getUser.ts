// nextjs api route

import { type NextApiRequest, type NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // read the body of the request
    const body = req.body;
    console.log(body);
    // send the response
    res.status(200).json({ name: 'Done' });

}
