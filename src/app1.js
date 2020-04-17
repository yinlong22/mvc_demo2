import "./app1.css";
import $ from "jquery";

const eventBus = $(window)
// 数据相关放到 m
const m = {
    data: {
        //初始化数据
        n: parseInt(localStorage.getItem('n'))
    },
    create() {
    },
    delete() {
    },
    update(data) {
        Object.assign(m.data, data)//将data的值复制给m.data
        eventBus.trigger('m:updated')
        localStorage.setItem('n', m.data.n)
    },
    get() {
    }
}
//视图相关 v
const v = {
    el: null,
    html: `
<div>
      <div class="output">
        <span id="number">{{n}}</span>
      </div>
      <div class="actions">
        <button id="add1">+1</button>
        <button id="minus1">-1</button>
        <button id="mul2">*2</button>
        <button id="divide2">÷2</button>
      </div>
</div>
`,
    init(container) {
        v.el = $(container)
        v.render()
    },
    render(n) {
        if (v.el.children.length !== 0) {
            v.el.empty()
            $(v.html.replace('{{n}}', n)).appendTo(v.el)
        }
    }
}

//其他都c
const c = {
    init(container) {
        v.init(container)
        v.render(m.data.n)//view = render (data)
        c.autoBindEvents()
        eventBus.on('m:updated', () => {
            v.render(m.data.n)
        })
    },
    events: {
        'click #add1': 'add',
        'click #minus': 'minus',
        'click #mul2': 'mul',
        'click #divide2': 'div',
    },
    add() {
        m.update({n: m.data.n + 1})
    },
    minus() {
        m.update({n: m.data.n - 1})
    },
    mul() {
        m.update({n: m.data.n * 2})
    },
    div() {
        m.update({n: m.data.n / 2})
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

