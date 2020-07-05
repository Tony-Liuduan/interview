/**
 * @fileoverview 
 * @author liuduan
 * @description 
 * @Date 2020-05-07 16:18:20
 * @LastEditTime 2020-07-05 12:29:55
 * 引用:
 *      http://www.ruanyifeng.com/blog/2019/08/web_components.html
 *      https://zhuanlan.zhihu.com/p/42370005
 *      https://github.com/XboxYan/xy-ui
 * 
 */




class UserCard extends HTMLElement {
    static get observedAttributes() {
        // 监听组件name属性变化
        return ['name'];
    }

    constructor() {
        super();
        // 自定义元素的this.attachShadow()方法开启 Shadow DOM，Web Component 允许内部代码隐藏起来，这叫做 Shadow DOM，即这部分 DOM 默认与外部 DOM 隔离，内部任何代码都无法影响外部。
        const shadowRoot = this.attachShadow({ mode: 'open' }); // closed：表示 Shadow DOM 是封闭的，不允许外部访问， test: document.querySelectorAll('.email')
        
        var templateElem = document.getElementById('userCardTemplate');
        console.log(templateElem);
        var content = templateElem.content.cloneNode(true); // 克隆了它的所有子元素，这是因为可能有多个自定义元素的实例，这个模板还要留给其他实例使用，所以不能直接移动它的子元素。
        content.querySelector('img').setAttribute('src', this.getAttribute('image'));
        content.querySelector('.container>.name').innerText = this.getAttribute('name');
        content.querySelector('.container>.email').innerText = this.getAttribute('email');
        shadowRoot.appendChild(content);
        
        // event
        this.$button = this.shadowRoot.querySelector('button');
        this.$button.addEventListener('click', () => {
            // do something
            alert('follow success');
        });

        setTimeout(() => {
            // 模拟组件属性变化
            this.setAttribute('name', 'TonyJ');
        }, 2000);
    }

    /**
     * @description 每次将节点连接到 DOM 时都会被调用, 一种常见错误是将 connectedCallback 用做一次性的初始化事件，然而实际上你每次将节点连接到 DOM 时都会被调用。取而代之的，在 constructor 这个 API 接口调用时做一次性初始化工作会更加合适。
     * @param {type} 
     * @return 
     */
    connectedCallback() {
        console.log('connectedCallback');
    }

    /**
     * @description 从 DOM 上脱离
     * @param {type} 
     * @return 
     */
    disconnectedCallback() {
        console.log('disconnectedCallback');
    }

    /**
     * @description 跨文档移动
     * @param {type} 
     * @return 
     */
    adoptedCallback() {
        console.log('adoptedCallback');
    }

    /**
     * @description 可以用来监听节点属性的变化，然后通过这个变化来更新内部状态
     * @param {type} 
     * @return 
     */
    attributeChangedCallback(attributeName, oldValue, newValue) {
        console.log('attributeChangedCallback', attributeName, oldValue, newValue)
        if (attributeName === "name") {
            // 根据属性变化做一些事情
            this.shadowRoot.querySelector('.container>.name').innerHTML = newValue;
        }
    }
}

window.customElements.define('user-card', UserCard);
