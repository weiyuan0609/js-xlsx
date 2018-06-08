const XLSX = require('xlsx');

const engine = function(obj, filePath) {
  // 获取excel文档对象
  const workbook = XLSX.readFile(filePath);
  // 获取 Excel 中所有表名
  const sheetNames = workbook.SheetNames;
  // 根据表名获取对应某张表
  const worksheet = workbook.Sheets[sheetNames[0]];
  
  const data = [];
  const keys = Object.keys(worksheet);
  
  keys.filter(k => k[0]!== '!')
      .forEach(k => {
        let col = k.substring(0, 1);
        let row = parseInt(k.substring(1));
        let value = worksheet[k].v;
        if (row === 1) {
          return;
        }

        if (!data[row -2]) {
          data[row -2] = {};
        }
        data[row -2][obj[col]] = value;
      });
    
  // console.log(data);
  return data;
}

module.exports.engine = engine;