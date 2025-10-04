import {describe, it, expect, vi, beforeEach} from 'vitest';
import {Config} from "drizzle-kit";

const defineConfigMock = vi.fn((config: Config): Config => config);
vi.mock('drizzle-kit', () => ({
    defineConfig: defineConfigMock
}));

describe('Drizzle config', () => {

    beforeEach(() => {
        vi.resetModules();
    });

    it('should call defineConfig with the correct config', async () => {
        process.env.POSTGRES_HOST = 'localhost';
        process.env.POSTGRES_PORT = '5432';
        process.env.POSTGRES_USER = 'testuser';
        process.env.POSTGRES_PASSWORD = 'testpass';
        process.env.POSTGRES_DB = 'testdb';
        process.env.IS_VERBOSE_ENABLED = 'true';
        process.env.IS_SSL_ENABLED = 'false';

        await import('../../src/config/drizzle.config');

        expect(defineConfigMock).toHaveBeenCalledTimes(1);
        expect(defineConfigMock).toHaveBeenCalledWith({
            out: './migrations',
            schema: './src/schema',
            dialect: 'postgresql',
            verbose: true,
            dbCredentials: {
                host: 'localhost',
                port: 5432,
                user: 'testuser',
                password: 'testpass',
                database: 'testdb',
                ssl: false,
            },
            migrations: {
                table: 'migrations',
                schema: 'public',
            },
            strict: true,
        });
    });

});
