import React from 'react'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import deref from 'json-schema-deref-local'

import Root from './components/Root'
import rootReducer from './reducers'
import {init} from './actions'
import {importData, exportData} from './utilities/data'
import './index.css'

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const PropertyGrid = ({schema, data = {}, title = 'Properties', onChange}) => {
  store.dispatch(init(deref(schema), importData(data)))

  if (onChange != null) {
    store.subscribe(() => onChange(exportData(store.getState().data)))
  }

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return (
    <Provider store={store}>
      <Root title={title} onChange={onChange} />
    </Provider>
  )
}

export default PropertyGrid
