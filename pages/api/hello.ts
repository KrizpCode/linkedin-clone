import { Timestamp } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
    name: string;
};

export default (req: NextApiRequest, res: NextApiResponse<any>) => {
    const helo = new Timestamp({ t: 0, i: 0 });
    res.status(200).json({ name: helo });
};
