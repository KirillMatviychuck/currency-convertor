import React, {ChangeEvent, useEffect, useState} from 'react';
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';

import CurrencyField from '../CurrencyField/CurrencyField';
import CurrencyAmount from '../CurrencyAmount/CurrencyAmount';
import useDebounce from '../../hooks/useDebounce/useDebounce';
import {currencyAPI} from '../../api/api';

import classes from './CurrencyConvertor.module.scss';

const CurrencyConvertor = () => {
    //selects
    const [currencyState, setCurrencyState] = useState<CurrencyValues[]>([]);
    const [currencyFromState, setCurrencyFromState] = useState<string>('');
    const [currencyToState, setCurrencyToState] = useState<string>('');

    //inputs
    const [amount, setAmount] = useState<string>('');
    const [rate, setRate] = useState<string>('');

    //debounce
    const debouncedAmount = useDebounce<string>(amount);
    const debouncedRate = useDebounce<string>(rate);
    const debouncedFrom = useDebounce<string>(currencyFromState);
    const debouncedTo = useDebounce<string>(currencyToState);

    //toggle
    const [toggleChangeInput, setToggleChangeInput] = useState(true);

    //handlers
    const onAmountChangeHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setToggleChangeInput(true);
        setAmount(event.target.value);
    };
    const onRateChangeHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setToggleChangeInput(false);
        setRate(event.target.value);
    };
    const onFromButtonClickHandler = (symbol: string) => {
        setToggleChangeInput(true);
        const elementToShow = currencyState.find(el => el.symbol === symbol);
        if (elementToShow) setCurrencyFromState(`${elementToShow.symbol} | ${elementToShow.title}`);
    };
    const onToButtonClickHandler = (symbol: string) => {
        setToggleChangeInput(false);
        const elementToShow = currencyState.find(el => el.symbol === symbol);
        if (elementToShow) setCurrencyToState(`${elementToShow.symbol} | ${elementToShow.title}`);
    };

    useEffect(() => {
        if (currencyFromState && currencyToState) {
            const firstValue = currencyFromState.slice(0, 3);
            const secondValue = currencyToState.slice(0, 3);
            const payload = {
                amount: toggleChangeInput ? amount : rate,
                from: toggleChangeInput ? firstValue : secondValue,
                to: toggleChangeInput ? secondValue : firstValue
            };
            currencyAPI.getConvert(payload)
                .then(res => {
                    if (toggleChangeInput) {
                        setRate(String(res.data.result));
                    } else {
                        setAmount(String(res.data.result));
                    }
                })
                .catch(error => console.warn(error));
        }
    }, [debouncedAmount, debouncedRate, debouncedFrom, debouncedTo]);

    useEffect(() => {
        currencyAPI.getSymbols()
            .then(res => {
                    const symbolValue: string[] = Object.keys(res.data.symbols);
                    const titleValue: string[] = Object.values(res.data.symbols);
                    const correctState: CurrencyValues[] = [];
                    for (let i = 0; i < symbolValue.length; i++) {
                        correctState.push({
                            title: titleValue[i],
                            symbol: symbolValue[i]
                        });
                    }
                    setCurrencyState(correctState);
                }
            )
            .catch(error => console.warn(error));
    }, []);

    return (
        <div className={classes.header}>
            <div className={classes.fromBlock}>
                <CurrencyField currencySymbols={currencyState}
                               selectedCurrency={currencyFromState}
                               changeInputValue={setCurrencyFromState}
                               onButtonClickHandler={onFromButtonClickHandler}
                />
                <CurrencyAmount amount={amount}
                                onAmountChangeHandler={onAmountChangeHandler}
                />
            </div>

            {toggleChangeInput
                ? <ArrowForwardIosOutlinedIcon color='primary'/>
                : <ArrowBackIosOutlinedIcon color='primary'/>}

            <div className={classes.toBlock}>
                <CurrencyField currencySymbols={currencyState}
                               selectedCurrency={currencyToState}
                               changeInputValue={setCurrencyToState}
                               onButtonClickHandler={onToButtonClickHandler}
                />
                <CurrencyAmount amount={rate}
                                onAmountChangeHandler={onRateChangeHandler}
                />
            </div>
        </div>
    );
};

export type CurrencyValues = {
    title: string
    symbol: string
}

export default CurrencyConvertor;