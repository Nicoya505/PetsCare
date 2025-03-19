
import databaseConfig from './database.config';

export default () => ({
    ...databaseConfig(),
    jwt: {
        secret: process.env.JWT_SECRET,
    },
    server: {
        port: parseInt(process.env.PORT, 10) || 3000,
    },
});
