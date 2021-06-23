const debug = require('debug')('app:seed:keys');
const chalk = require('chalk');
const { randomBytes } = require('crypto');
const SeedService = require('./seedService');

function generateRandomToken() {
  const buffer = randomBytes(32);
  return buffer.toString('hex');
}

const adminScopes = [
    "create:user"
]

const keys = [
    {
        token: generateRandomToken(),
        scopes: adminScopes
    }
];

const seedKeys = async () => {
    const seedService = new SeedService();

  try {
    const Promises = keys.map(async (key) => {
        await seedService.insert('ApiKeys', key);
    });

    await Promise.all(Promises);
    debug(chalk.green(`${Promises.length} api keys have been created succesfully`))
    return process.exit(0);
  } catch (error) {
    debug(chalk.red(`Error to seed keys ${error}`))
    return process.exit(0);
  }
};

seedKeys();

