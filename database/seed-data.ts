interface SeedData {
    entries: SeedEntry[];
}

interface SeedEntry {
    description: string;
    status: string;
    createdAt: number;
}

export const seedData: SeedData = {
    entries: [
        {
            description: 'Pending: Test 1',
            createdAt: Date.now(),
            status: 'pending',
        },
        {
            description: 'In Progress: Test 2',
            createdAt: Date.now() - 1000000,
            status: 'in-progress',
        },
        {
            description: 'Finished: Test 3',
            createdAt: Date.now() - 100000,
            status: 'finished',
        },
    ]
}