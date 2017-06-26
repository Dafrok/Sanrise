import {checkType} from '@/base/util.js'

export default {
  template: `<div class="leaf">
    <span class="fa fa-tag"></span>
    <div class="edit" s-if="!editing">
      <span class="select">
        <select value="{=formData.type=}">
          <option s-for="type in types" value="{{type.value}}" on-change="setType($event)">{{type.name}}</option>
        </select>
      </span>
      <input class="key" value="{=formData.key=}">
      <input class="value" value="{=formData.value=}">
      <button on-click="submit">确定</button>
      <button on-click="edit(false)">取消</button>
      <button class="last" on-click="fire('remove', item.key)">删除</button>
    </div>
    <div class="label" s-else>
      <a class="key">
        <span class="type">{{typeName}}:</span>
        <span>{{item.key}}</span>
      </a>
      <a class="fa fa-pencil-square-o" on-click="edit(true)"></a>
      <a class="value">{{item.value}}</a>
    </div>
  </div>`,
  initData () {
    return {
      types: [
        {name: '字符串', value: 'String'},
        {name: '数字', value: 'Number'},
        {name: '布尔', value: 'Boolean'},
        {name: '空', value: 'Null'}
      ],
      editing: false,
      formData: {
        type: '',
        value: '',
        key: ''
      }
    }
  },
  computed: {},
  setType (e) {
    this.data.set('type', e.target.value)
  },
  edit (bool) {
    this.data.set('editing', bool)
  },
  submit (e) {
    this.fire('update', this.data.get('formData'))
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