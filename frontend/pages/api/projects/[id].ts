import { NextApiRequest, NextApiResponse } from 'next';

export default async function getSingleJobPost(req: NextApiRequest, res: NextApiResponse) {
	const id = req.query.id
	res.json({id: id})
}