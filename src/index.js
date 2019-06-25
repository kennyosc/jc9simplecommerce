import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Provider} from 'react-redux'
import {createStore} from 'redux'

import App from './components/App'
import reducers from './reducers/index'


var STORE = createStore(reducers)

ReactDOM.render(
        <Provider store = {STORE}>
                <App/>
        </Provider>
       
     , document.getElementById('root'))