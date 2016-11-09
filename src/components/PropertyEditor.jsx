import React from 'react'
import {connect} from 'react-redux'

import {getType, getDefaultForType, dereference, isRequired} from '../utilities'
import ObjectEditor from './ObjectEditor'
import ArrayEditor from './ArrayEditor'
import PrimitiveEditor from './PrimitiveEditor'

const PropertyEditor = ({schema, data, title, path, rootSchema, requireds, canRemove}) => {
  if (schema['!editor-visible'] === false) {
    return null
  }

  schema = dereference(schema, rootSchema)

  const type = getType(schema)
  data = data || getDefaultForType(type)
  const required = isRequired(path, requireds)

  let Component
  switch (type) {
    case 'object':
      Component = ObjectEditor
      break
    case 'array':
      Component = ArrayEditor
      break
    default:
      Component = PrimitiveEditor
  }

  return <Component schema={schema} data={data} title={title} path={path} required={required} canRemove={canRemove} />
}

export default connect(({rootSchema}) => ({rootSchema}))(PropertyEditor)