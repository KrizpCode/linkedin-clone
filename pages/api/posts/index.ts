import { Timestamp } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

import { connectToDatabase } from '../../../utils/mongodb';

interface PostType {
    input: string;
    photoUrl: string;
    username: string | null | undefined;
    email: string | null | undefined;
    userImg: string | null | undefined;
    createdAt: string;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, body } = req;

    const { db } = await connectToDatabase();

    if (method === 'GET') {
        try {
            const posts = await db.collection('posts').find().sort({ timestamp: -1 }).toArray();
            res.status(200).json(posts);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    if (method === 'POST') {
        try {
            const post = await db.collection('posts').insertOne({ ...body, timestamp: new Timestamp({ t: 0, i: 0 }) });
            res.status(201).json(post);
        } catch (error) {
            res.status(500).json(error);
        }
    }
};
