function EventEmitter() {
    this._events = Object.create(null);
}

// 默认最多的绑定次数
EventEmitter.defaultMaxListeners = 10;

EventEmitter.prototype.addListener = EventEmitter.prototype.on;

// 返回监听事件名
EventEmitter.prototype.eventNames = function () {
    return Object.keys(this._events);
}

// 设置最大监听数
EventEmitter.prototype.setMaxListeners = function (n) {
    this._count = n;
}

// 返回监听数
EventEmitter.prototype.getMaxListeners = function () {
    return this._count ? this._count : this.defaultMaxListeners;
};

// 监听
EventEmitter.prototype.on = function (type, cb, flag) {
    // 判断 进行新建
    if (!this._events) {
        this._events = Object.create(null);
    }

    // 不是newListener 就应该让newListener执行以下
    if (type !== 'newListener') {
        this._events['newListener'] && this._events['newListener'].forEach(listener => {
            listener(type);
        })
    }

    if (this._events[type]) {
        // 根据传入的flag来决定是向前还是向后添加
        if (flag) {
            this._events[type].unshift(cb);
        } else {
            this._events[type].push(cb);
        }
    }

    if (this._events[type].length === this.getMaxListeners()) {
        console.warn('警告--监听的事件不能超过了设置的最大监听数')
    }

    // 监听的
}

// 向前添加
EventEmitter.prototype.prependListener = function (type, cb) {
    this.on(type, cb, true);
}

EventEmitter.prototype.prependOnceListener = function (type, cb) {
    this.once(type, cb, true);
}

//监听一次
EventEmitter.prototype.once = function (type, cb, flag) {
    //先绑定，调用后删除
    function wrap() {
        cb(...arguments);
        this.removeListener(type, wrap);
    }
}

// 删除监听类型
EventEmitter.prototype.removeListener = function (type, cb) {
    if (this._events[type]) {
        this._events[type] = this._events[type].filter(listener => {
            return cb !== listener && cb !== listener.listen;
        })
    }
};

EventEmitter.prototype.removeAllListener = function () {
    this._events = Object.create(null);
};

// 返回所有的监听类型
EventEmitter.prototype.listeners = function () {
    return this._events[type];
}

// 发布
EventEmitter.prototype.emit = function (type, ...arguments) {
    if (this._events[type]) {
        this._events[type].forEach(listener => {
            listener.call(this, ...arguments);
        })
    }
}

module.exports = EventEmitter;

