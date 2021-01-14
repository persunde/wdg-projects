import { NextApiRequest, NextApiResponse } from 'next';
import { getProject } from '../../../db/database';

export default async function getSingleJobPost(req: NextApiRequest, res: NextApiResponse) {
	const id = req.query.id ? Number(req.query.id) : null
	if (!id) {
		res.status(501).json({ error: 'No id' })
		return
	}
	const projectData = getProject(id)
	if (!projectData) {
		res.status(501).json({ error: 'Bad id' })
		return
	}
	res.json(projectData)
}