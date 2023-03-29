import styled from "styled-components";

export const PurchasesPage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const PurchasesPageUsersSelect = styled.select.attrs({ 'data-testid': 'select-user'})``

export const PurchasesPageUsersOption = styled.option.attrs({'data-test-id': 'select-user-option'})``