import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../utils/mongodb';
import { ObjectId } from 'mongodb';

export default async (req: NextApiRequest, res: NextApiResponse<any>) => {
    const {
        method,
        query: { id },
    } = req;

    const { db } = await connectToDatabase();

    if (method === 'DELETE') {
        try {
            await db.collection('posts').deleteOne({ _id: new ObjectId(id as string) });
            res.status(200).json({ message: 'The post has been deleted!' });
        } catch (error) {
            res.status(500).json(error);
        }
    }
};
