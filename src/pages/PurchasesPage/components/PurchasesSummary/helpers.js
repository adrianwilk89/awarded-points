import {
    AWARD_POINTS_FOR_PURCHASE_ABOVE_100,
    AWARD_POINTS_FOR_PURCHASE_BETWEEN_50_AND_100,
    UPPER_LIMIT_TRESHOLD,
    LOWER_LIMIT_TRESHOLD,
} from './constants';

export const getAwardsPointsPerMonth = (filteredData) => {

    const awardPointsPerMonth = {}

    Object.entries(filteredData).forEach(([month, purchases]) => {
        awardPointsPerMonth[month] = getSumOfAwardPoints(purchases)
    })
    return awardPointsPerMonth;
}

export const getSumOfAwardPoints = (purchases) => {
    return purchases.reduce((points, currentPurchase) => {
        if (currentPurchase.amount > 100) {
            return points + (currentPurchase.amount - UPPER_LIMIT_TRESHOLD) * AWARD_POINTS_FOR_PURCHASE_ABOVE_100 + (LOWER_LIMIT_TRESHOLD * AWARD_POINTS_FOR_PURCHASE_BETWEEN_50_AND_100)
        }
        if (currentPurchase.amount < UPPER_LIMIT_TRESHOLD && currentPurchase.amount > LOWER_LIMIT_TRESHOLD) {
            return points + (currentPurchase.amount - LOWER_LIMIT_TRESHOLD) * AWARD_POINTS_FOR_PURCHASE_BETWEEN_50_AND_100;
        }
        return points;
    }, 0)
}

export const getPurchasesFilteredByMonth = (purchases) => {

    const purchasesFilteredByMonth = {}

    purchases.forEach(p => {
        const purchaseMonth = new Date(p.date).getMonth()

        if (purchasesFilteredByMonth[purchaseMonth] === undefined) {
            purchasesFilteredByMonth[purchaseMonth] = [p]
        } else {
            purchasesFilteredByMonth[purchaseMonth].push(p)
        }
    });

    return purchasesFilteredByMonth

}

export const getAwardsPointsTotal = (purchases) => {
    return Object.keys(purchases).reduce((accumulator, currentValue) => {
        return accumulator + purchases[currentValue]
    }, 0)
}

export const getMonthName = (monthNumber) => {
  const date = new Date();
  date.setMonth(monthNumber);
  return date.toLocaleString('en', {
      month: 'long'
  });
}