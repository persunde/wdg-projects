import { NextApiRequest, NextApiResponse } from 'next';
import { getAllProjectIDs } from '../../../db/database';

export default async function getSingleJobPost(req: NextApiRequest, res: NextApiResponse) {
	const idList = getAllProjectIDs()
	console.log(idList)
	res.json(idList)
}