import {checkType, isEmpty} from '@/base/util.js'
import {typesList} from '@/base/types.js'

export default {
  template: `<div class="branch">
    <a on-click="toggle" s-if="!root">
      <span s-if="item.isExpand" class="fa fa-caret-down"></span>
      <span s-else class="fa fa-caret-right"></span>
    </a>
    <div class="edit" s-if="!root">
      <span class="select">
        <select value="{{item.type}}" on-change="setType($event)">
          <option s-for="type in types" value="{{type.value}}">{{type.name}}</option>
        </select>
      </span>
      <input readonly="{{isListItem}}" class="key {{isListItem ? 'readonly' : ''}}" value="{{item.key}}">
      <button on-click="add" s-if="item.type === 'Object'">添加属性</button>
      <button on-click="unshift" s-if="item.type === 'Array'">首行添加</button>
      <button on-click="push" s-if="item.type === 'Array'">末行添加</button>
      <button class="last" on-click="remove">删除</button>
    </div>
    <div s-else class="root toolbar">
      <span class="fa fa-database"></span><span>数据源</span>
      <a on-click="add(null, index)" class="fa fa-plus"></a>
    </div>
    <json-node
      s-if="item.isExpand || root"
      s-for="children, index in item.children"
      class="value"
      data="{{children}}"
      index="{{index}}"
      isListItem="{{item.type === 'Array'}}"
      on-add="add($event, index)"
      on-push="push($event, index)"
      on-unshift="unshift($event)"
      on-changetype="changeType($event, index)"
      on-remove="remove($event, index)"
      on-expand="expand($event, index)">
    </json-node>
  </div>`,
  initData () {
    return {
      types: typesList
    }
  },
  computed: {},
  setType (e) {
    this.fire('changetype', [e.target.value])
  },
  toggle () {
    const state = !this.data.get('item.isExpand')
    this.fire('expand', [state])
  },
  expand (e, i) {
    e.unshift(i)
    e.unshift('children')
    this.fire('expand', e)
  },
  changeType (e = [], i) {
    !isEmpty(i) && e.unshift(i) && e.unshift('children')
    this.fire('changetype', e)
  },
  remove (e = [], i) {
    !isEmpty(i) && e.unshift(i) && e.unshift('children')
    this.fire('remove', e)
  },
  add (e = [], i) {
    !isEmpty(i) && e.unshift(i)
    e.unshift('children')
    this.fire('add', e)
  },
  push (e = [], i) {
    !isEmpty(i) && e.unshift(i)
    e.unshift('children')
    this.fire('push', e)
  }
  // push (e) {
  //   this.fire('push', e || String(this.data.get('item.key')))
  // },
  // unshift (e) {
  //   this.fire('unshift', e || String(this.data.get('item.key')))
  // },
  // append (e) {
  //   this.fire('append', e || String(this.data.get('item.key')))
  // }
}