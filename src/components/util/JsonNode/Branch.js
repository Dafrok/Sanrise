import {checkType, isEmpty} from '@/base/util.js'
import {typesList} from '@/base/types.js'

export default {
  template: `<div class="branch {{root ? 'root' : ''}}">
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
      <input readonly="{{isListItem}}" class="key {{isListItem ? 'readonly' : ''}}" value="{{isListItem ? index : item.key}}" on-blur="setKey($event)" on-focus="selectAll($event)">
    </div>
    <div s-else class="label">
      <span class="fa fa-database"></span>
      <span>数据源</span>
    </div>
    <div s-if="!root" class="operator">
      <button on-click="add" s-if="item.type === 'Object'">添加属性</button>
      <button on-click="unshift" s-if="item.type === 'Array'">首行添加</button>
      <button on-click="push" s-if="item.type === 'Array'">末行添加</button>
      <button class="last" on-click="remove">删除</button>
    </div>
    <div s-else class="operator">
      <button on-click="add">添加数据</button>
      <button on-click="fire('save')">保存</button>
    </div>
    <json-node
      s-if="item.isExpand || root"
      s-for="children, index in item.children"
      class="value"
      data="{{children}}"
      index="{{index}}"
      isListItem="{{item.type === 'Array'}}"
      on-update="update($event, index)"
      on-add="add($event, index)"
      on-push="push($event, index)"
      on-unshift="unshift($event, index)"
      on-changetype="changeType($event, index)"
      on-changekey="changeKey($event, index)"
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
  selectAll (e) {
    e.target.select()
  },
  setType (e) {
    this.fire('changetype', [e.target.value])
  },
  setKey (e) {
    this.fire('changekey', [e.target.value])
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
  update (e = [], i) {
    !isEmpty(i) && e.unshift(i) && e.unshift('children')
    this.fire('update', e)
  },
  changeType (e = [], i) {
    !isEmpty(i) && e.unshift(i) && e.unshift('children')
    this.fire('changetype', e)
  },
  changeKey (e = [], i) {
    !isEmpty(i) && e.unshift(i) && e.unshift('children')
    this.fire('changekey', e)
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
  },
  unshift (e = [], i) {
    !isEmpty(i) && e.unshift(i)
    e.unshift('children')
    this.fire('unshift', e)
  }
}