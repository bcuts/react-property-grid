import {getType, matchSchema, defaults} from '../src/utilities/schema'
import schema from './sample-schema.json'

describe('schema', () => {
  describe('getType', () => {
    it('should return the type given by the schema', () => {
      expect(getType(schema.properties.obj)).toEqual('object')
      expect(getType(schema.properties.obj.additionalProperties)).toEqual('string')
      expect(getType(schema.properties.arr)).toEqual('array')
      expect(getType(schema.properties.arr.items.anyOf[0].properties.item1)).toEqual('string')
    })

    it('should expect no type to be an object', () => {
      expect(getType(schema)).toEqual('object')
      expect(getType(schema.properties.arr.items)).toEqual('object')
      expect(getType(schema.properties.arr.items.anyOf[1])).toEqual('object')
    })
  })

  describe('matchSchema', () => {
    it('should choose the right schema based on a custom \'type\' property', () => {
      /* this is a custom behaviour that allows us to choose the right schema
         without the need for validation */
      const {anyOf} = schema.properties.arr.items

      expect(matchSchema(anyOf, {
        item1: 'value1',
        type: 'type1'
      }, schema)).toBe(anyOf[0])

      expect(matchSchema(anyOf, {
        item2: 42,
        type: 'type2'
      }, schema)).toBe(anyOf[1])
    })
  })

  describe('defaults', () => {})
})
