import styled from "styled-components";

export const PurchasesSummary = styled.div.attrs({'data-testid': 'purchase-summary'})`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    width: 300px;
`

export const PurchaseTotalAwardPoints = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const PurchaseAwardPointsRow = styled.div.attrs({'data-testid': 'purchase-award-points-row'})`
    display: flex;
    justify-content: space-between;
    row-gap: 8px;
`;

export const PurchaseAwardPoints = styled.div``;

export const PurchaseMonth = styled.div`
    text-transform: capitalize;
`;

export const PurchaseTitle = styled.h3`
    text-decoration: underline;
`;

export const PurchasesAwardPointsList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`