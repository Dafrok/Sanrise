import {checkType} from '@/base/util.js'
import {typesList} from '@/base/types.js'

export default {
  template: `<div class="leaf">
    <span class="fa fa-tag"></span>
    <div class="edit">
      <span class="select is-leaf {{isNull ? 'is-null' : ''}}">
        <select value="{{item.type}}">
          <option s-for="type in types" value="{{type.value}}" on-change="setType($event)">{{type.name}}</option>
        </select>
      </span>
      <input readonly="{{isListItem}}" class="key is-leaf {{isListItem ? 'readonly' : ''}} {{isNull ? 'is-null' : ''}}" value="{{item.key}}">
      <input class="value" value="{{item.value}}">
      <button class="last" on-click="fire('remove', item.key)">删除</button>
    </div>
  </div>`,
  initData () {
    return {
      types: typesList
    }
  },
  computed: {
    isNull () {
      console.log(this.data.get('item.type'))
      return this.data.get('item.type') === 'Null'
    }
  },
  attached () {
    console.log(this.data.get('item.type'))
  }
}