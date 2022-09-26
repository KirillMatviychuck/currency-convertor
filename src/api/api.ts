import axios from 'axios';

import {GetConvertPayload, GetConvertResponse} from './api-types';

const instance = axios.create({
    baseURL: 'https://api.apilayer.com/exchangerates_data/',
    withCredentials: true,
    headers: {
        'apikey': 'EShKCixGhS7LsTLjKvpwX1NLsERJNtAI'
    }
});

export const currencyAPI = {
    getConvert(data: GetConvertPayload) {
        return instance.get<GetConvertResponse>('convert', {params: {...data}});
    },
     getSymbols() {
        return instance.get('symbols');
    },
};