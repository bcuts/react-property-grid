import React from 'react'
import {connect} from 'react-redux'

import {level} from '../../utilities/path'
import TextEditor from './../fields/Text'
import {setKey, addItem, removeItem} from '../../actions'
import {row, ellipsis, cell, label, buttonGroup, button} from './../styles'

const EXPANDER_WIDTH = 10
const EXPANDED_ICON = '&dtri;'
const COLLAPSED_ICON = '&rtri;'
const REQUIRED_ICON = '*'
const ADD_ICON = '+'
const REMOVE_ICON = '-'

const headerRow = {
  ...row,
  background: '#FAFAFA'
}

const expander = {
  float: 'left',
  cursor: 'pointer',
  marginTop: 3,
  marginBottom: 3
}

const redStar = {
  color: 'red'
}

const getExpandHTML = expanded => ({
  __html: expanded ? EXPANDED_ICON : COLLAPSED_ICON
})

const getDisplayName = Enhanced => Enhanced.displayName || Enhanced.name || 'Component'

const withCaption = ({field}) => Enhanced => {
  const Row = ({
    schema, data, title, description, path, required,
    expanded, toggleExpanded,
    canEditKey, setKey,
    canAdd, addItem,
    canRemove, removeItem
  }) => {
    const caption = {
      ...cell,
      paddingLeft: cell.padding + EXPANDER_WIDTH * (level(path) + (expanded != null ? 0 : 1))
    }

    return (
      <div style={field ? row : headerRow}>
        <div style={caption} title={description}>
          {expanded != null
            ? <div style={expander}>
                <span dangerouslySetInnerHTML={getExpandHTML(expanded)} onClick={toggleExpanded} />
              </div>
            : null}
          {canEditKey
            ? <div style={ellipsis}>
                <TextEditor schema={schema} data={title} path={path} setValue={setKey} />
              </div>
            : <div style={label}>
                {title}
                {required ? <span style={redStar}>{REQUIRED_ICON}</span> : null}
              </div>}
        </div>
        <div style={cell}>
          {canAdd || canRemove
            ? <div style={buttonGroup}>
                {canRemove ? <div style={button} onClick={() => removeItem(path)}>{REMOVE_ICON}</div> : null}
                {canAdd ? <div style={button} onClick={() => addItem(path, schema)}>{ADD_ICON}</div> : null}
              </div>
            : null}
          <div style={ellipsis}>
            <Enhanced schema={schema} data={data} title={title} description={description} path={path} />
          </div>
        </div>
      </div>
    )
  }

  Row.displayName = `Row(${getDisplayName(Enhanced)})`

  return connect(null, {setKey, addItem, removeItem})(Row)
}

export default withCaption
