manager-timeout（JavaScript计时器管理）
=======================================
使用原生 setTimeout 替代 setInterval 循环

全局存储变量： ```_MEMTIMER```

安装
---------------------------------------

* [NPM](https://www.npmjs.org/): `npm install manager-timeout`

API
---------------------------------------
 * var timer = Timeout.getIns('test-namespace')
 * timer.interval(callback, time, key[, 是否开启log true开启]) // 无限循环
 * timer.timeout(callback, time, key[, 是否开启log true开启]) // 单次循环
 * timer.clear(name) 销毁name计时器
 * timer.clearScopeAll()  销毁nameSpace里所有计时器并销毁当前nameSpace对象
 * timer.clearAll() 销毁所有挂载的计时器

用法
---------------------------------------

For es6 module:

```
import Timeout from 'manager-timeout'
var timer = Timeout.getIns('test-namespace')
// some code
```

For CommonJS using NPM:

```
var Timeout = require('manager-timeout')
var timer = Timeout.getIns('test-namespace')
// some code
```

In the browser:

```
// 手动引入
<script src="timeout.min.js"></script>
<script>
    var timer = Timeout.getIns('test-namespace')
    // some code
</script>
```

---------------------------------------
```
// interval
var timer = Timeout.getIns('test-namespace')
timer.interval(function () {
    console.log('interval:', +new Date())
}, 1e3, 'loopTest')

// timeout
timer.timeout(function () {
    console.log('timeout:', +new Date())
}, 5e3, 'onceTest')

// clearScopeAll()
timer.timeout(function () {
    console.log('exec clearScopeAll:')
    // 清除 'test-namespace'模块下所有计时器
    timer.clearScopeAll()
}, 10e3, 'clearTest')

// ...
```

> 欢迎PR，谢谢！