import { createConnection, getConnectionManager, getConnectionOptions } from 'typeorm';

export const connectDb = async (retries = 5) => {
    const defaultOptions = await getConnectionOptions();
    const connectionManager = getConnectionManager();
    while (retries) {
        try {
            if (!connectionManager.has(defaultOptions.name)) {
                const connection = await createConnection(
                    Object.assign(defaultOptions, {
                        database: process.env.NODE_ENV === 'test' ? "./src/database/database.test.sqlite" : defaultOptions.database
                    })
                );
                return connection;
            }
            else { return connectionManager.get(defaultOptions.name) }
        }
        catch (err) {
            retries -= 1;
            console.log(err);
            console.log(`Retries left: ${retries}`);
            await new Promise(res => setTimeout(res, 5000));
        }
    }
}