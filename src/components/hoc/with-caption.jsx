import React from 'react'
import {connect} from 'react-redux-custom-store'

import NAMESPACE from '../../constants/namespace'
import {level} from '../../utilities/path'
import TextEditor from './../fields/Text'
import {setKey, addItem, removeItem} from '../../actions'
import {row, ellipsis, cell, buttonGroup, button} from './../styles'

const EXPANDER_WIDTH = 10
const EXPANDED_ENTITY = '&dtri;'
const COLLAPSED_ENTITY = '&rtri;'

const headerRow = {
  ...row,
  background: '#FAFAFA'
}

const expander = {
  float: 'left',
  cursor: 'pointer'
}

const redStar = {
  color: 'red'
}

const label = {
  // fontWeight: 'bold'
}

const fieldCell = {
  ...cell,
  padding: 0
}

const paddedButtonGroup = {
  ...buttonGroup,
  padding: 3
}

const getDisplayName = WrappedComponent => WrappedComponent.displayName || WrappedComponent.name || 'Component'

const withCaption = ({field}) => WrappedComponent => {
  const Row = ({schema, data, title, path, required, expanded, toggleExpanded, canEditKey, setKey, canAdd, addItem, canRemove, removeItem}) => {
    const caption = {
      ...(canEditKey ? fieldCell : cell),
      paddingLeft: cell.padding + EXPANDER_WIDTH * (level(path) + (expanded != null ? 0 : 1))
    }

    const buttons = canAdd || canRemove ?
      <div style={field ? paddedButtonGroup : buttonGroup}>
        {canRemove ? <div style={button} onClick={() => removeItem(path)}>-</div> : null}
        {canAdd ? <div style={button} onClick={() => addItem(path, schema)}>+</div> : null}
      </div>
    : null

    return (
      <div style={field ? row : headerRow}>
        <div style={caption}>
          {expanded != null ? <div style={expander}>
            <span dangerouslySetInnerHTML={{__html: expanded ? EXPANDED_ENTITY : COLLAPSED_ENTITY}} onClick={toggleExpanded} />
          </div> : null}
          {canEditKey ? <div style={ellipsis}>
            <TextEditor schema={schema} data={title} path={path} setValue={setKey} /></div>
            : <span style={label}>{title}</span>}
          {required ? <span style={redStar}>*</span> : null}
        </div>
        <div style={field ? fieldCell : cell}>
          {buttons}
          <div style={ellipsis}>
            <WrappedComponent schema={schema} data={data} title={title} path={path} canAdd={canAdd} canRemove={canRemove} />
          </div>
        </div>
      </div>
    )
  }

  Row.displayName = `Row(${getDisplayName(WrappedComponent)})`

  return connect(null, {setKey, addItem, removeItem})(Row, NAMESPACE)
}

export default withCaption
