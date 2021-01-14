import { NextApiRequest, NextApiResponse } from 'next';
import { getAllProjects } from '../../../db/database';

export default async function getSingleJobPost(req: NextApiRequest, res: NextApiResponse) {
	const idList = getAllProjects()
	res.json(idList)
}