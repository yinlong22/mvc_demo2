import "./app2.css";
import $ from "jquery";

const eventBus = $(window)

// 数据相关放到 m
const localKey = 'app2.index'
const m = {
    data: {
        //初始化数据
        index: parseInt(localStorage.getItem('localKey')) || 0
    },
    create() {
    },
    delete() {
    },
    update(data) {
        Object.assign(m.data, data)//将data的值复制给m.data
        eventBus.trigger('m:updated')
        localStorage.setItem('index', m.data.index)
    },
    get() {
    }
}
//视图相关 v
const v = {
    el: null,
    html: (index) => {
        return `
<div>
      <ol class="tab-bar">
        <li class="${index === 0 ? 'selected' : ''}" data-index="0"><span>1111</span></li>
        <li class="${index === 1 ? 'selected' : ''}"  data-index="1"><span>2222</span></li>
      </ol>
      <ol class="tab-content">
        <li class="${index === 0 ? 'active' : ''}">内容1</li>
        <li class="${index === 1 ? 'active' : ''}">内容2</li>
      </ol>
</div>
`
    },
    init(container) {
        v.el = $(container)
        v.render()
    },
    render(index) {
        if (v.el.children.length !== 0) {
            v.el.empty()
            $(v.html(index)).appendTo(v.el)
        }
    }
}
//其他都c
const c = {
    init(container) {
        v.init(container)
        v.render(m.data.index)//view = render (data)
        c.autoBindEvents()
        eventBus.on('m:updated', () => {
            v.render(m.data.index)
        })
    },
    events: {
        'click .tab-bar li': 'x',
    },
    x(e) {
        const index = parseInt(e.currentTarget.dataset.index)
        m.update({index:index})
        console.log('x')
    },
    autoBindEvents() {
        for (let key in c.events) {
            const value = c[c.events[key]]//函数
            //用空格将它切成两个字符串当做点击事件和先择器
            const spaceIndex = key.indexOf(' ')
            const part1 = key.slice(0, spaceIndex)//从0到空格
            const part2 = key.slice(spaceIndex)//从空格切到最后
            v.el.on(part1, part2, value)
        }
    }
}

export default c