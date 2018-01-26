import { shallow } from 'vue-test-utils'
import { createRenderer } from 'vue-server-renderer'

import uploadlist from '@/component/vupload/component/uploadlist.vue'

describe('uploadlist.vue', () => {
  it('renders img for each item in props.list', () => {
    const items = ['']
    const renderer = createRenderer()
    const wrapper = shallow(uploadlist, {
      list: items 
    })
    renderer.renderToString(wrapper.vm, (err, str) => {
      if (err) throw new Error(err)
      expect(str).toMatchSnapshot()
    })
  })

  it('renders img for each item in props.list null', () => {
    const items = null
    const renderer = createRenderer()
    const wrapper = shallow(uploadlist, {
      propsData: {
        list: items
      } 
    })
    renderer.renderToString(wrapper.vm, (err, str) => {
      if (err) throw new Error(err)
      expect(str).toMatchSnapshot()
    })
  })

  it('renders img for each item in props.list length > 0', () => {
    const items = ['https://cmspic-10004025.image.myqcloud.com/9ea8d89b-e5f6-4668-a2d8-754d050aa900?imageMogr2/quality/80/format/webp']
    const wrapper = shallow(uploadlist, {
      propsData: {
        list: items,
        thunb: new Array(items.length)
      } 
    })
    expect(wrapper.findAll('li')).toHaveLength(items.length)
  })


  it('renders img for each item in props.list  thumb && onDel', () => {
    const items = ['https://cmspic-10004025.image.myqcloud.com/9ea8d89b-e5f6-4668-a2d8-754d050aa900?imageMogr2/quality/80/format/webp']
    const renderer = createRenderer()
    const wrapper = shallow(uploadlist, {
      propsData: {
        list: items,
        thunb: items,
        onDel: () => {}
      } 
    })
    renderer.renderToString(wrapper.vm, (err, str) => {
      if (err) throw new Error(err)
      expect(str).toMatchSnapshot()
    })
  })


  it('renders img for each item in props.list li click', () => {
    const items = ['https://cmspic-10004025.image.myqcloud.com/9ea8d89b-e5f6-4668-a2d8-754d050aa900?imageMogr2/quality/80/format/webp']
    const wrapper = shallow(uploadlist, {
      propsData: {
        list: items,
        thunb: items,
        onDel: () => {}
      } 
    })
   const li = wrapper.find('li')
   li.trigger('click')
  })
})