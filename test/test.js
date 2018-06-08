const engine = require('../src/read/engine.js');

const userForm = require('../src/read/userForm.js');
const data = new engine.engine(new userForm(), '../src/read/test.xlsx');

const assert = require("assert");

const value1 = { name: '张三', sex: '男', age: 18 };
assert.deepEqual(data[0], value1, '失败1');

const value2 = { name: '李四', sex: '男', age: 19 };
assert.deepEqual(data[1], value2, '失败2');

const value3 = { name: '王五', sex: '男', age: 20 };
assert.deepEqual(data[2], value3, '失败3');

console.log('成功');
