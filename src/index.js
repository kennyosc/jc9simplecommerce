import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import Logger from 'redux-logger'
import Thunk from 'redux-thunk'

import App from './components/App'
import reducers from './reducers/index'


var STORE = createStore(reducers, applyMiddleware(Logger, Thunk))

ReactDOM.render(
        <Provider store = {STORE}>
                <App/>
        </Provider>
       
     , document.getElementById('root'))