import { Entry } from '../../models';
import { db, seedData } from '../../database';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    name: string
}

export default async function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
    if (process.env.NODE_ENV === 'production') {
        return res.status(400).json({ name: 'No tiene acceso a este servicio' });
    }

    await db.connect();

    await Entry.deleteMany(); // Solo en development
    await Entry.insertMany(seedData.seedData.entries);

    await db.disconnect();

    res.status(200).json({ name: 'Proceso realizado correctamente' });
}