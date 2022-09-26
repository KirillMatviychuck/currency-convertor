import './App.scss';
import React from 'react';
import {AppBar, Toolbar, Typography} from '@material-ui/core';

import CurrencyConvertor from '../CurrencyConvertor/CurrencyConvertor';

const App = () => {
    return (
        <div className='app-wrapper'>
            <AppBar position='absolute'
                    style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Toolbar>
                    <Typography variant='h6'>
                        Currency convertor
                    </Typography>
                </Toolbar>
            </AppBar>
            <CurrencyConvertor />
        </div>
    );
};

export default App;
