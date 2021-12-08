function singleton(foo) {
    let instance = null;
    return function createInstance() {
        return instance || (instance = foo.apply(this, arguments));
    }
}

// 创建遮罩层
function createMask() {
    // 创建div元素
    const mask = document.createElement('div');
    // 设置样式
    mask.style.position = 'fixed';
    mask.style.top = '0';
    mask.style.right = '0';
    mask.style.bottom = '0';
    mask.style.left = '0';
    mask.style.opacity = 'o.75';
    mask.style.backgroundColor = '#000';
    mask.style.zIndex = '98';
    mask.style.display = 'none';
    document.body.appendChild(mask);
    // 单击隐藏遮罩层
    mask.onclick = function () {
        this.style.display = 'none';
    }
    return mask;
};

// 创建弹窗
function createModal() {
    // 创建div元素
    const modal = document.createElement('div');
    // 设置样式
    modal.style.position = 'fixed';
    modal.style.top = '50%';
    modal.style.left = '50%';
    modal.style.padding = '50px 80px';
    modal.style.backgroundColor = '#fff';
    modal.style.border = '1px solid #ccc';
    modal.style.borderRadius = '6px';
    modal.innerHTML = 'modal content';
    modal.style.zIndex = '100';
    modal.style.display = 'none';
    document.body.appendChild(modal);
    return modal;
};


document.getElementById('btn').onclick = function() {
    const mask = singleton(createMask)();
    mask.style.display = 'block';
    const modal = singleton(createModal)();
    modal.style.display = 'block';
}
