import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('drizzle-orm/node-postgres', () => ({
    drizzle: vi.fn(() => 'MOCK_DB_INSTANCE'),
}));

describe('Database URL', () => {

    beforeEach(() => {
        vi.resetModules();
        vi.clearAllMocks();
        process.env.POSTGRES_URL = 'postgres://user:pass@localhost:5432/mydb';
    });

    it('should call drizzle with POSTGRES_URL', async () => {
        // Re-import after setting env and mocks to ensure fresh state
        const { database } = await import('../../src/config/database');
        const { drizzle } = await import('drizzle-orm/node-postgres');

        expect(process.env.POSTGRES_URL).toMatch(/^postgres:\/\/\w+:\w+@[\w.-]+:\d+\/\w+$/);
        expect(drizzle).toHaveBeenCalledTimes(1);
        expect(drizzle).toHaveBeenCalledWith(process.env.POSTGRES_URL);
        expect(database).toBe('MOCK_DB_INSTANCE');
    });

});
