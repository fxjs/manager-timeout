/**
 * 计时器 setTimeout 模拟 setInterval
 * @API 如下:
 * var timer = Timeout.getIns('nameSpace')
 * timer.interval(callback, time, key[, 是否开启log true开启]) // 无限循环
 * timer.timeout(callback, time, key[, 是否开启log true开启]) // 单次循环
 * timer.clear(name) 销毁name计时器
 * timer.clearScopeAll()  销毁nameSpace里所有计时器并销毁当前nameSpace对象
 * timer.clearAll() 销毁所有挂载的计时器
 */

// 全局计时器内存地址
const MEMTIMER = {}
window._MEMTIMER = MEMTIMER

class Timeout {
    namespace
    timeObj = {}

    /**
     * Object<instance>
     * @param name
     * @returns {Timeout}
     */
    static getIns(name) {
        if (MEMTIMER.hasOwnProperty(name)) {
            this.ins = MEMTIMER[name]
        } else {
            MEMTIMER[name] = new Timeout(name)
            this.ins = MEMTIMER[name]
        }
        return this.ins
    }

    constructor(namespace) {
        this.namespace = namespace
    }

    /**
     * 检查是否有命名空间
     * @param name
     * @returns {boolean}
     */
    hasNameSpace(name) {
        return MEMTIMER.hasOwnProperty(name)
    }

    /**
     * 无限循环
     * @param fn
     * @param timeout
     * @param key
     * @param showLog 是否显示log
     * @returns {*}
     */
    interval(fn, timeout, key, showLog = false) {
        if (!this.hasNameSpace(this.namespace)) {
            console.warn('do::interval', 'no scope nameSpace')
            return false
        }
        if (typeof this.timeObj[key] !== 'undefined') clearTimeout(this.timeObj[key])
        this.timeObj[key] = setTimeout(() => {
            fn()
            if (typeof this.timeObj[key] !== 'undefined') {
                this.interval.apply(this, arguments)
            }
        }, timeout)
        showLog && console.log(`do::interval, k:${key}, v:${this.timeObj[key]}`)
        return this.timeObj[key]
    }

    /**
     * 单次循环
     * @param fn
     * @param timeout
     * @param key
     * @param showLog 是否显示log
     * @returns {*}
     */
    timeout(fn, timeout, key, showLog = false) {
        if (!this.hasNameSpace(this.namespace)) {
            console.warn('do::interval', 'no scope nameSpace')
            return false
        }
        if (typeof this.timeObj[key] !== 'undefined') clearTimeout(this.timeObj[key])
        this.timeObj[key] = setTimeout(fn, timeout)
        showLog && console.log(`do::timeout, k:${key}, v:${this.timeObj[key]}`)
        return this.timeObj[key]
    }

    /**
     * 清单个
     * @param key
     * @param obj
     * @returns {boolean}
     */
    clear(key, obj = this.timeObj) {
        if (!obj.hasOwnProperty(key)) return false
        const v = obj[key]
        clearTimeout(v)
        console.log(`do::clear, 计时器k:${key}, 计时器v: ${v}`)
        return delete obj[key]
    }

    /**
     * 清当前模块全部
     * @returns {boolean}
     */
    clearScopeAll() {
        const _timeObj = this.timeObj
        if (!_timeObj) return false // 屏蔽重复删除
        const keys = Object.keys(_timeObj)
        keys.forEach(k => {
            this.clear(k)
        })
        console.log(`do::clearScopeAll, namespace:${this.namespace}, keys:${keys.length}`)
        return delete MEMTIMER[this.namespace]
    }

    /**
     * 清全局所有
     * @param obj
     */
    clearAll(obj = MEMTIMER) {
        const keys = Object.keys(obj)
        for (let i = 0; i < keys.length; i++) {
            const k = keys[i]
            const v = obj[k]
            if (typeof v === 'object') {
                this.clearAll(v)
            } else {
                typeof v === 'number' && this.clear(k, obj)
            }
            delete obj[k]
        }
        // 过滤空对象和父级log
        if (keys.length && !keys.includes('timeObj')) {
            console.log(`do::clearAll, keys:${keys}`)
        }
    }
}

export {Timeout}
