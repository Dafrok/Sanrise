import {checkType} from '@/base/util.js'
import {typesList} from '@/base/types.js'

export default {
  template: `<div class="leaf">
    <span class="fa fa-tag"></span>
    <div class="edit">
      <span class="select is-leaf {{isNull ? 'is-null' : ''}}">
        <select value="{{item.type}}" on-change="setType($event)">
          <option s-for="type in types" value="{{type.value}}">{{type.name}}</option>
        </select>
      </span>
      <input readonly="{{isListItem}}" class="key is-leaf {{isListItem ? 'readonly' : ''}} {{isNull ? 'is-null' : ''}}" value="{{isListItem ? index : item.key}}" on-blur="setKey($event)" on-focus="selectAll($event)">
      <input s-if="isString" class="value" value="{{item.value}}" on-blur="update($event)">
      <input s-if="isNumber" class="value" type="number" value="{{item.value}}" on-blur="update($event)">
      <button s-if="isBoolean" class="boolean" on-click="update($event)">
        <span>{{item.value ? '是' : '否'}}</span>
        <span s-if="item.value" class="fa fa-check-square-o"></span>
        <span s-else class="fa fa-square-o"></span>
      </button>
    </div>
    <div class="operator">
      <button on-click="fire('remove')">删除</button>
    </div>
  </div>`,
  initData () {
    return {
      types: typesList
    }
  },
  selectAll (e) {
    e.target.select()
  },
  update (e) {
    const value = this.data.get('item.value')
    this.fire('update', [typeof value === 'boolean' ? !value : e.target.value])
  },
  setKey (e) {
    this.fire('changekey', [e.target.value])
  },
  setType (e) {
    this.fire('changetype', [e.target.value])
  },
  computed: {
    isNull () {
      return this.data.get('item.type') === 'Null'
    },
    isBoolean () {
      return this.data.get('item.type') === 'Boolean'
    },
    isNumber () {
      return this.data.get('item.type') === 'Number'
    },
    isString () {
      return this.data.get('item.type') === 'String'
    }
  }
}
