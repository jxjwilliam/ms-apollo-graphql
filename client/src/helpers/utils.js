import React from 'react'
import faker from 'faker'
import dayjs from 'dayjs'

const isEmpty = (prop) =>
  prop === null ||
  prop === undefined ||
  // eslint-disable-next-line no-prototype-builtins
  (prop.hasOwnProperty('length') && prop.length === 0) ||
  (prop.constructor === Object && Object.keys(prop).length === 0)

function DataPrint({ data }) {
  return (
    <pre style={{ textAlign: 'initial' }}>
      <code>
        {JSON.stringify(data, null, 4)}
      </code>
    </pre>
  );
}

function generatorBlogData() {
  return {
    title: faker.name.jobTitle(),
    description: faker.lorem.words(),
    createDate: dayjs().format('YYYY-MM-DD'),
    author: faker.internet.userName(),
  }
}

function getToday() {
  return dayjs().format('YYYY-MM-DD')
}

export {
  isEmpty,
  DataPrint,
  generatorBlogData,
  getToday
}