import redis from 'redis';
import { config } from '@keystone-next/keystone/schema';
import { redisSessionStore } from '@keystone-next/session-store-redis';
import { storedSessions, withItemData } from '@keystone-next/keystone/session';
import { createAuth } from '@keystone-next/auth';
import { lists } from './schema';
import { PORT, DATABASE_URL, REDIS_URL, SESSION_MAX_AGE, SESSION_SECRET } from './config';

// createAuth configures signin functionality
const { withAuth } = createAuth({
  listKey: 'Person',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
    itemData: { isAdmin: true },
  },
});

// Configure the Keystone app
export default withAuth(
  config({
    db: {
      provider: 'postgresql',
      useMigrations: true,
      url: DATABASE_URL,
    },
    server: { port: PORT },
    lists,
    ui: {},
    session: withItemData(
      storedSessions({
        maxAge: SESSION_MAX_AGE,
        secret: SESSION_SECRET,
        store: redisSessionStore({ client: redis.createClient(REDIS_URL) }),
      }),
      { Person: 'name isAdmin' }
    )
  })
);
