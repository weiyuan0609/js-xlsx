const XLSX = require('xlsx');

const engine = function (obj) {
  const _headers = Object.keys(obj);
  const _data = [obj];

  // 结构
  // { A1: { v: 'name' }, B1: { v: 'gender' }, C1: { v: 'age' } } 
  // { A2: { v: 'zhangsan' }, B2: { v: 'men' }, C2: { v: '20' } }
  const headers = _headers
    .map((v, i) => Object.assign({}, { v: v, position: String.fromCharCode(65 + i) + 1 }))
    .reduce((prev, next) => Object.assign({}, prev, { [next.position]: { v: next.v } }), {});

  const data = _data
    .map((v, i) => _headers.map((k, j) => Object.assign({}, { v: v[k], position: String.fromCharCode(65 + j) + (i + 2) })))
    .reduce((prev, next) => prev.concat(next))
    .reduce((prev, next) => Object.assign({}, prev, { [next.position]: { v: next.v } }), {});

  // console.log(headers, data);

  // 合并 headers 和 data
  const output = Object.assign({}, headers, data);
  // 获取所有单元格的位置
  const outputPos = Object.keys(output);
  // 计算出范围
  const ref = outputPos[0] + ':' + outputPos[outputPos.length - 1];
  // console.log(ref);

  // 构建 workbook 对象
  const wb = {
    SheetNames: ['mySheet'],
    Sheets: {
      'mySheet': Object.assign({}, output, { '!ref': ref })
    }
  };
  // 导出 Excel
  XLSX.writeFile(wb, 'output.xlsx');
}

module.exports = engine;
