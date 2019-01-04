var Timeout = require('./lib/timeout.js')

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