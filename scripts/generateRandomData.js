const {
    faker
} = require('@faker-js/faker');
const {exists, writeFile} = require('fs')
const purchasesPath = '/data/randomPurchases.json';
const usersPath = '/data/randomUsers.json'

const fakePurchase = (id) =>  ({
    id,
    userId: faker.datatype.number({min: 1, max: 10}),
    amount: faker.datatype.number({
        min: 0,
        max: 200
    }),
    date: faker.date.between('2023-01-01T00:00:00.000Z', '2023-04-01T00:00:00.000Z'),
})

const fakePurchases = Array(1000).fill(null).map((_, index) => fakePurchase(index))

exists(process.cwd() + purchasesPath, (exist) => {
    if(exist) {
        console.log('File exist')
    } else {
        writeFile(process.cwd() + purchasesPath, JSON.stringify(fakePurchases), null, () => {
            console.log('Successfully writen')
        })
    }
});

const fakeUser = (id) => ({
    name: faker.name.firstName(),
    id,
})


const fakeUsers = Array(10).fill(null).map((_, index) => fakeUser(index + 1))


exists(process.cwd() + usersPath, (exist) => {
    if (exist) {
        console.log('File exist')
    } else {
        writeFile(process.cwd() + usersPath, JSON.stringify(fakeUsers), null, () => {
            console.log('Successfully writen')
        })
    }
});



