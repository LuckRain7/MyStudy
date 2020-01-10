const xlsx = require('xlsx')

const workbook = xlsx.readFile('./xcys.xlsx')

let sheetNames = workbook.SheetNames

// 获取第一个workSheet
let sheet = workbook.Sheets[sheetNames[0]]

// 表格信息
// let range = xlsx.utils.decode_range(sheet['!ref'])

// 表格的总行数
// let rows = range.e.r + 1

let obj = {}

for (let key in sheet) {
  if (key == '!margins' || key == '!ref') {
  } else {
    const value = sheet[key].v
    if (!obj[value]) {
      obj[value] = 1
    } else {
      obj[value]++
    }
  }
}


for(let key in obj){
    console.log(key,',',obj[key]);
    
}