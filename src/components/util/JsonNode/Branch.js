import {checkType} from '@/base/util.js'
import {typesList} from '@/base/types.js'

export default {
  template: `<div class="branch">
    <a s-if="expand" on-click="toggle" class="fa fa-caret-down"></a>
    <a s-else on-click="toggle" class="fa fa-caret-right"></a>
    <div class="edit">
      <span class="select">
        <select value="{{item.type}}">
          <option s-for="type in types" value="{{type.value}}" on-change="setType($event)">{{type.name}}</option>
        </select>
      </span>
      <input readonly="{{isListItem}}" class="key {{isListItem ? 'readonly' : ''}}" value="{{item.key}}">
      <button on-click="append" s-if="item.type === 'Object'">添加属性</button>
      <button on-click="unshift" s-if="item.type === 'Array'">首行添加</button>
      <button on-click="push" s-if="item.type === 'Array'">末行添加</button>
      <button class="last" on-click="fire('remove', item.key)">删除</button>
    </div>
    <json-node class="value" s-if="expand" data="{{item.value}}" isListItem="{{isList}}" path="{{item.key}}" on-append="append($event)" on-push="push($event)" on-unshift="unshift($event)" on-remove="fire('remove', $event)"></json-node>
  </div>`,
  initData () {
    return {
      types: typesList,
      expand: true
    }
  },
  computed: {
    isList () {
      return this.data.get('item.type') === 'Array'
    }
  },
  toggle (bool) {
    this.data.set('expand', typeof bool === 'boolean' ? bool : !this.data.get('expand'))
  },
  push (e) {
    this.fire('push', e || String(this.data.get('item.key')))
  },
  unshift (e) {
    this.fire('unshift', e || String(this.data.get('item.key')))
  },
  append (e) {
    this.fire('append', e || String(this.data.get('item.key')))
  }
}