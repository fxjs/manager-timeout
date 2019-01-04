(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(function () {
            return factory(global);
        });
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory(global);
    } else {
        global.Timeout = factory(global);
    }
}(typeof window !== 'undefined' ? window : this, function (w) {

    'use strict';

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
    } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    // 全局计时器内存地址
    var MEMTIMER = {};
    w._MEMTIMER = MEMTIMER;

    var _Timeout = function () {
        _createClass(Timeout, null, [{
            key: 'getIns',

            /**
             * Object<instance>
             * @param name
             * @returns {Timeout}
             */
            value: function getIns(name) {
                if (MEMTIMER.hasOwnProperty(name)) {
                    this.ins = MEMTIMER[name];
                } else {
                    MEMTIMER[name] = new Timeout(name);
                    this.ins = MEMTIMER[name];
                }
                return this.ins;
            }
        }]);

        function Timeout(namespace) {
            _classCallCheck(this, Timeout);

            this.timeObj = {};

            this.namespace = namespace;
        }

        /**
         * 检查是否有命名空间
         * @param name
         * @returns {boolean}
         */


        _createClass(Timeout, [{
            key: 'hasNameSpace',
            value: function hasNameSpace(name) {
                return MEMTIMER.hasOwnProperty(name);
            }

            /**
             * 无限循环
             * @param fn
             * @param timeout
             * @param key
             * @param showLog 是否显示log
             * @returns {*}
             */

        }, {
            key: 'interval',
            value: function interval(fn, timeout, key) {
                var _this = this,
                    _arguments = arguments;

                var showLog = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

                if (!this.hasNameSpace(this.namespace)) {
                    console.warn('do::interval', 'no scope nameSpace');
                    return false;
                }
                if (typeof this.timeObj[key] !== 'undefined') clearTimeout(this.timeObj[key]);
                this.timeObj[key] = setTimeout(function () {
                    fn();
                    if (typeof _this.timeObj[key] !== 'undefined') {
                        _this.interval.apply(_this, _arguments);
                    }
                }, timeout);
                showLog && console.log('do::interval, k:' + key + ', v:' + this.timeObj[key]);
                return this.timeObj[key];
            }

            /**
             * 单次循环
             * @param fn
             * @param timeout
             * @param key
             * @param showLog 是否显示log
             * @returns {*}
             */

        }, {
            key: 'timeout',
            value: function timeout(fn, _timeout, key) {
                var showLog = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

                if (!this.hasNameSpace(this.namespace)) {
                    console.warn('do::interval', 'no scope nameSpace');
                    return false;
                }
                if (typeof this.timeObj[key] !== 'undefined') clearTimeout(this.timeObj[key]);
                this.timeObj[key] = setTimeout(fn, _timeout);
                showLog && console.log('do::timeout, k:' + key + ', v:' + this.timeObj[key]);
                return this.timeObj[key];
            }

            /**
             * 清单个
             * @param key
             * @param obj
             * @returns {boolean}
             */

        }, {
            key: 'clear',
            value: function clear(key) {
                var obj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.timeObj;

                if (!obj.hasOwnProperty(key)) return false;
                var v = obj[key];
                clearTimeout(v);
                console.log('do::clear, \u8BA1\u65F6\u5668k:' + key + ', \u8BA1\u65F6\u5668v: ' + v);
                return delete obj[key];
            }

            /**
             * 清当前模块全部
             * @returns {boolean}
             */

        }, {
            key: 'clearScopeAll',
            value: function clearScopeAll() {
                var _this2 = this;

                var _timeObj = this.timeObj;
                if (!_timeObj) return false; // 屏蔽重复删除
                var keys = Object.keys(_timeObj);
                keys.forEach(function (k) {
                    _this2.clear(k);
                });
                console.log('do::clearScopeAll, namespace:' + this.namespace + ', keys:' + keys.length);
                return delete MEMTIMER[this.namespace];
            }

            /**
             * 清全局所有
             * @param obj
             */

        }, {
            key: 'clearAll',
            value: function clearAll() {
                var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : MEMTIMER;

                var keys = Object.keys(obj);
                for (var i = 0; i < keys.length; i++) {
                    var k = keys[i];
                    var v = obj[k];
                    if ((typeof v === 'undefined' ? 'undefined' : _typeof(v)) === 'object') {
                        this.clearAll(v);
                    } else {
                        typeof v === 'number' && this.clear(k, obj);
                    }
                    delete obj[k];
                }
                // 过滤空对象和父级log
                if (keys.length && !keys.includes('timeObj')) {
                    console.log('do::clearAll, keys:' + keys);
                }
            }
        }]);

        return Timeout;
    }();

    return _Timeout
}));