import React, {ChangeEvent, Dispatch, SetStateAction} from 'react';
import TextField from '@material-ui/core/TextField';
import {Autocomplete} from '@material-ui/lab';
import {Button} from '@material-ui/core';

import {CurrencyValues} from '../CurrencyConvertor/CurrencyConvertor';

import classes from './CurrencyField.module.scss';

const CurrencyField: React.FC<CurrencyProps> = (
    {currencySymbols, selectedCurrency, changeInputValue, onButtonClickHandler}
) => {
    const buttonsState = ['USD', 'EUR', 'UAH', 'BTC'];
    const onChangeHandler = (e: ChangeEvent<{}>, value: string) => changeInputValue(value);

    return (
        <>
            <Autocomplete
                style={{width: 300}}
                inputValue={selectedCurrency}
                onInputChange={onChangeHandler}
                options={currencySymbols}
                autoHighlight
                getOptionLabel={(option) => `${option.symbol} | ${option.title}`}
                renderOption={(option) => (
                    <React.Fragment>
                        {option.symbol} | ({option.title})
                    </React.Fragment>
                )}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label='Choose a currency'
                        variant='outlined'
                        inputProps={{
                            ...params.inputProps,
                            autoComplete: 'new-password',
                        }}
                    />
                )}
            />
            <div className={classes.btnGroup}>
                {buttonsState.map(symbol => (
                    <Button key={symbol}
                            onClick={() => onButtonClickHandler(symbol)}>{ symbol }</Button>
                ))}
            </div>
        </>
    );
};

type CurrencyProps = {
    currencySymbols: CurrencyValues[]
    selectedCurrency: string
    changeInputValue: Dispatch<SetStateAction<string>>
    onButtonClickHandler: (symbol: string) => void
}

export default CurrencyField;
