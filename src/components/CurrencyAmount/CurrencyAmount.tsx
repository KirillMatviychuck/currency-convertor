import React, {ChangeEvent} from 'react';
import {TextField} from '@material-ui/core';

const CurrencyAmount: React.FC<CurrencyAmountProps> = ({amount, onAmountChangeHandler}) => {

    return (
        <TextField type='number'
                   fullWidth value={amount}
                   onChange={onAmountChangeHandler}
        />
    );
};

type CurrencyAmountProps = {
    amount: string
    onAmountChangeHandler: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export default CurrencyAmount;