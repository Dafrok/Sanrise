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
      <input readonly="{{isListItem}}" class="key is-leaf {{isListItem ? 'readonly' : ''}} {{isNull ? 'is-null' : ''}}" value="{{item.key}}">
      <input class="value" value="{{item.value}}">
      <button class="last" on-click="fire('remove')">删除</button>
    </div>
  </div>`,
  initData () {
    return {
      types: typesList
    }
  },
  setType (e) {
    this.fire('changetype', [e.target.value])
  },
  computed: {
    isNull () {
      return this.data.get('item.type') === 'Null'
    }
  }
}