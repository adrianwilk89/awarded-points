import React from 'react';
import PropTypes from 'prop-types';
import * as P from './parts'


import { getPurchasesFilteredByMonth, getAwardsPointsPerMonth, getAwardsPointsTotal, getMonthName } from './helpers';

const PurchasesSummary = ({ purchases }) => {

    const purchasesFilteredByMonth = getPurchasesFilteredByMonth(purchases);
    const awardsPointsPerMonth = getAwardsPointsPerMonth(purchasesFilteredByMonth);
    const awardsPointsTotal = getAwardsPointsTotal(awardsPointsPerMonth)

    return (
        <P.PurchasesSummary>
            <P.PurchaseTotalAwardPoints><P.PurchaseTitle>Total points:</P.PurchaseTitle>{awardsPointsTotal}</P.PurchaseTotalAwardPoints>
            <P.PurchaseTitle>Award points per month: </P.PurchaseTitle>
            <P.PurchasesAwardPointsList>
                {Object.entries(awardsPointsPerMonth).map(([month, points]) => (
                    <P.PurchaseAwardPointsRow key={month}>
                        <P.PurchaseMonth>{getMonthName(month)}</P.PurchaseMonth>
                        <P.PurchaseAwardPoints>{points}</P.PurchaseAwardPoints>
                    </P.PurchaseAwardPointsRow>
                ))}
            </P.PurchasesAwardPointsList>
        </P.PurchasesSummary>
    )
};

PurchasesSummary.propTypes = {
    purchases: PropTypes.arrayOf(
        PropTypes.shape({
            date: PropTypes.string.isRequired,
            id: PropTypes.number.isRequired,
            amount: PropTypes.number.isRequired,
        })
    )
}

export default PurchasesSummary