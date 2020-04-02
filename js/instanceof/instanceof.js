function _instanceof(left, right) {

    // right.prototype 在 left.__protp__ 链上

    let proto = left.__proto__;
    let rp = right.prototype;

    while(true) {
        if (proto === rp) {
            return true;
        }

        if (!proto) {
            return false;
        }

        proto = proto.__proto__;
    }

}


_instanceof([], Object);