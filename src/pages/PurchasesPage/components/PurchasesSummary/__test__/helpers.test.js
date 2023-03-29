import {
    getAwardsPointsPerMonth,
    getAwardsPointsTotal,
    getMonthName,
    getPurchasesFilteredByMonth,
    getSumOfAwardPoints
} from '../helpers';

describe('getMonthName', () => {
    test('should return name of month when retrieve number as param', () => {
        expect(getMonthName(0)).toEqual('January')
    })
})

describe('getSumOfAwardPoints', () => {
    test('should return proper sum of awards points per purchase when array of purchases is provided', () => {
        const purchases = [{
            amount: 120
        }, {
            amount: 150
        }]
        const expected = [90, 150]

        purchases.forEach((p, i) => {
            expect(getSumOfAwardPoints([p])).toEqual(expected[i])
        })

    })
})

describe('getAwardsPointsTotal', () => {
    test('should return total sum of awards points for all months when those are provided', () => {
        const awardPointsPerMonth = {
            0: 600,
            1: 100,
            2: 200,
        }
        expect(getAwardsPointsTotal(awardPointsPerMonth)).toEqual(900)
    })
})

describe('getAwardsPointsPerMonth', () => {
    test('should return object with sum of award points per month when purchases are provided', () => {
        const purchasesPerMonth = {
            0: [{
                amount: 90
            }, {
                amount: 150
            }],
            1: [{
                amount: 10
            }, {
                amount: 170
            }],
            2: [{
                amount: 109
            }, {
                amount: 171
            }]
        }

        const expected = {
            0: 190,
            1: 190,
            2: 260
        }

        expect(getAwardsPointsPerMonth(purchasesPerMonth)).toEqual(expected)
    })
})

describe('getPurchasesFilteredByMonth', () => {
    test('should return object with filtered purchases per month when array of purchases is provided', () => {
        const purchases = [
            {
                date: new Date('2023 3 28')
            },
            {
                date: new Date('2023 3 23')
            },
            {
                date: new Date('2023 3 27')
            },
            {
                date: new Date('2023 1 28')
            },
            {
                date: new Date('2023 2 28')
            }
        ]

        expect(getPurchasesFilteredByMonth(purchases)[0].length).toEqual(1)
        expect(getPurchasesFilteredByMonth(purchases)[1].length).toEqual(1)
        expect(getPurchasesFilteredByMonth(purchases)[2].length).toEqual(3)
    })
})