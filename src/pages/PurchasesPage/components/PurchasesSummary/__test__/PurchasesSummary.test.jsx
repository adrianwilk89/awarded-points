import React from 'react';
import { render } from '@testing-library/react';
import PurchasesSummary from '../PurchasesSummary';


describe('PurchasesSummary', () => {
    test('should display 3 rows when purchases for 3 months are provided', () => {
      
        const props =  {
            purchases: [{
                "id": 0,
                "userId": 8,
                "amount": 36,
                "date": "2023-01-07T14:46:06.841Z"
            },
            {
                "id": 1,
                "userId": 8,
                "amount": 8,
                "date": "2023-03-30T08:38:32.833Z"
            },
            {
                "id": 2,
                "userId": 10,
                "amount": 37,
                "date": "2023-02-04T22:53:11.179Z"
            }]
        }

        const { getAllByTestId } = render(<PurchasesSummary {...props} />);

        expect(getAllByTestId('purchase-award-points-row').length).toBe(3)
    })
})