#! /usr/bin/env node

const faker = require('faker')
const dayjs = require('dayjs')

  (async function () {
    for await (let num of asyncIterable) {
      console.log(num);
    }
  })();


// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of
const generateRandomUser = async () => {
  const ary = new Array(4).fill(0)
  for await (const loop of ary) {
    const user = Promise.resolve({
      name: faker.name.jobTitle(),
      desc: faker.lorem.words(),
      createDate: dayjs().format('YYYY-MM-DD'),
    })
    await ary.push(user)
  }
  return ary
}

console.log(generateRandomUser())

// .authenticate() can be used with the created instance to check whether the connection is working.
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });