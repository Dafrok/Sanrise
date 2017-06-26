import {checkType} from '@/base/util.js'

export default {
  template: `<div class="branch">
    <a s-if="expand" on-click="toggle" class="fa fa-caret-down"></a>
    <a s-else on-click="toggle" class="fa fa-caret-right"></a>
    <div class="edit" s-if="!editing">
      <span class="select">
        <select value="{=formData.type=}">
          <option s-for="type in types" value="{{type.value}}" on-change="setType($event)">{{type.name}}</option>
        </select>
      </span>
      <input s-if="formData.type === 'Object'" class="key" value="{{item.key}}">
      <button on-click="insert" s-if="formData.type === 'Object'">添加属性</button>
      <button on-click="unshift" s-if="formData.type === 'Array'">首行添加</button>
      <button on-click="push" s-if="formData.type === 'Array'">末行添加</button>
      <button on-click="submit">确定</button>
      <button on-click="edit(false)">取消</button>
      <button class="last" on-click="fire('remove', item.key)">删除</button>
    </div>
    <div class="label" s-else>
      <a class="key" on-click="toggle">
        <span class="type">{{typeName}}:</span>
        <span>{{item.key}}</span>
      </a>
      <a class="fa fa-pencil-square-o" on-click="edit(true)"></a>
    </div>
    <json-node class="value" s-if="expand" data="{{item.value}}" path="{{item.key}}" on-append="append($event)" on-remove="fire('remove', $event)"></json-node>
  </div>`,
  initData () {
    return {
      types: [
        {name: '无序列表', value: 'Object'},
        {name: '有序列表', value: 'Array'}
      ],
      expand: true,
      editing: false
    }
  },
  computed: {},
  edit (bool) {
    this.data.set('editing', bool)
  },
  toggle (bool) {
    this.data.set('expand', typeof bool === 'boolean' ? bool : !this.data.get('expand'))
  },
  attached () {
    this.data.set('formData', {
      type: this.data.get('item.type'),
      value: this.data.get('item.value'),
      key: this.data.get('item.key')
    })
    this.data.set('type', this.data.get('item.type'))
  }
}