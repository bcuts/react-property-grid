import React, {Component} from 'react'
import {connect} from 'react-redux'

import {getType} from '../../utilities/schema'
import {getDefaultForType} from '../../utilities/data'
import {setValue} from '../../actions'

const getDisplayName = WrappedComponent => WrappedComponent.displayName || WrappedComponent.name || 'Component'

const autoPopulating = WrappedComponent => {
  class AutoPopulating extends Component {
    componentWillMount() {
      const {schema, data, path, setValue} = this.props
      if (data == null) {
        setValue(path, getDefaultForType(getType(schema)))
      }
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  AutoPopulating.displayName = `AutoPopulating${getDisplayName(WrappedComponent)}`

  return connect(null, {setValue})(AutoPopulating)
}

export default autoPopulating