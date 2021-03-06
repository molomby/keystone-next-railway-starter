# Keystone Next on Railway

A Keystone Next example/starter project for [Railway](https://railway.app) deployments.

[Railway](https://railway.app) is an interesting new hosting provide.
They offer Heroku-style deployments (Docker-based with "addons" for various data stores)
with deep dev workflow integration, preview deploys, GitHub and Vercel integration.
This project uses the [Postgres](https://docs.railway.app/plugins/postgresql) addon for data persistence
and the [Redis](https://docs.railway.app/plugins/redis) addon for session storage.

To use this app, first deploy it to Railway with the button below, then follow the [local dev](#local-dev) instructions.

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https%3A%2F%2Fgithub.com%2Fmolomby%2Fkeystone-next-railway-starter&plugins=postgresql%2Credis&envs=SESSION_SECRET&optionalEnvs=SESSION_SECRET&SESSION_SECRETDesc=A+securely+random+value%2C+32+chars+or+longer)

## App Features

The app Keystone schema is a mix of the Keystone Next
[todo](https://github.com/keystonejs/keystone/tree/master/examples/todo) and
[auth](https://github.com/keystonejs/keystone/tree/master/examples/auth) example projects.
It demos a number of Keystone features, including:

- Some lists to play around with
- Password based authentication
- Stateful sessions (Redis)
- Initial user creation workflow
- Admin UI
- GraphQL endpoint (`/api/graphql`), inc. GraphiQL (when `NODE_ENV !== 'production'`)
- Access control
- Automatic migrations (via. [Prisma Migrate](https://www.prisma.io/docs/concepts/components/prisma-migrate))

## Local Dev

The suggested Railway dev workflow assumes you have a Railway deployment to which you can link your local codebase.
The easiest way to achieve this is with the using the "Deploy" button above.
An alternative is to fork the repo first then use `railway init`.
These instructions assume the former approach.

When you click the "Deploy" button, Railway will prompt you for GitHub auth to fork the repo to your own org/account.
From there you can clone the repo to your local dev machine and attach it to the Railway project.
You do not need to wait for the initial build/deployment to complete.

Note, you do not need Postgres or Redis installed locally for this to work ??? Railway will create remote Docker containers for these services.
However, you will need to install the [Railway CLI](https://docs.railway.app/cli/quick-start).

```sh
# Get the repo
git clone https://github.com/molomby/keystone-next-railway-starter
cd keystone-next-railway-starter

# Install node packages
yarn

# Link the app to the new Railway Project
railway link keystone-next-railway-starter

# Instruct railway to run the app using yarn dev
railway run yarn dev
```

Then point your browser to [localhost:3000](http://localhost:3000) to access the app.

## Deployments

If you followed the instructions above ("Deploy" button then clone and link local repo), you'll already have a deployment trigger configured on your Railway project.
To deploy changes, simply commit them and push to the `main` branch on GitHub.
This will trigger a build (to your default environment) which can be tracked in the [Railway dashboard](https://railway.app/dashboard).

### Migrations

The first time you run `yarn dev` locally Keystone will create a local development database with the initial schema.

To extend this database schema, simply make your changes to the Keystone lists in `schema.ts` and re-run `yarn dev`.
Keystone will detect these changes, prompt you to create a migration and apply the changes to your local database.
Eg:

```
??? There has been a change to your Keystone schema that requires a migration

??? Name of migration ??? Adding person.country field
??? A migration has been created at migrations/20210514023215_adding_person_country_field
??? Would you like to apply this migration? ??? yes
??? The migration has been applied
```

Your changes will then be reflected in the Admin UI and GraphQL API.

Behind the scenes, this magic is being performed by
[Prisma](https://www.prisma.io) and [Prisma Migrate](https://www.prisma.io/docs/concepts/components/prisma-migrate)
which generates SQL migration scripts based on your code changes.
You can find these files in the `/migrations` directory.

Committing these migration scripts to GitHub will cause the migration to be run when your app is next deployed.
Adding your own SQL scripts to the directory will also work, just follow the directory naming convention ???
migrations are applied based on their order on disk.
This can be useful for importing data or DB operations beyond the scope of Keystone.

### Seed Data

The ability to add arbitrary SQL migrations lets you seed data into your database somewhat easily.
Create a SQL file with some insert commands and place it in an appropriately named directory within `/migrations`.

Data added in this way will be applied to any databases created when a new collaborator clones the repo and first runs `yarn dev`.
Having a fake but realistic set of data, automatically inserted when a DB is created, can also be very useful for automated testing.

## KeystoneJS

Keystone is a powerful GraphQL based headless CMS.
Written in TypeScript, it has some terrific features out of the box, is easy to extend and a joy to use.

This app is build on an early preview build of Keystone Next.
We have some exciting plans for the project, with lots of features and docs rolling out over the next few months, as we move toward production readiness.
If you want to know more
checkout the (preview) [Keystone Next docs](https://next.keystonejs.com),
fork us on [GitHub](https://github.com/keystonejs/keystone)
or join the [KeystoneJS Slack](https://keystonejs.slack.com).
