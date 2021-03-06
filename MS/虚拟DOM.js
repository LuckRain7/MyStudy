/**
     * Element Virdual-dom 对象定义
     * @param {String} tagName - dom 元素名称
     * @param {Object} props - dom 属性
     * @param {Array<Element|String>} - 子节点
 */
function Element(tagName, props, children) {
    this.tagName = tagName
    this.props = props
    this.children = children

    if (props.key) {
        this.key = props.key
    }

    let count = 0

    children.forEach(function (child, i) {
        if (child instanceof Element) {
            count += child.count
        } else {
            children[i] = '' + child
        }
        count++
    })

    this.count = count //子元素个数
}

Element.prototype.render = function () {
    let el = document.createElement(this.tagName)

    const props = this.props
    for (let propName in props) {
        let propValue = props[propName]
        el.setAttribute(propName, propValue)
    }

    let children = this.children || []
    children.forEach(function (child) {
        let childEl = (child instanceof Element)
            ? child.render()
            : document.createTextNode(child)

        el.appendChild(childEl)
    })

    return el
}

function createElement(tagName, props, children) {
    return new Element(tagName, props, children)
}




const el = createElement

let ul = el('div', { id: 'virtual-dom' }, [
    el('p', {}, ['Virtual DOM']),
    el('ul', { id: 'list' }, [
        el('li', { class: 'item' }, ['Item 1']),
        el('li', { class: 'item' }, ['Item 2']),
        el('li', { class: 'item' }, ['Item 3'])
    ]),
    el('div', {}, ['Hello World'])
])

console.log(ul);

const ulRoot = ul.render();
document.body.appendChild(ulRoot);