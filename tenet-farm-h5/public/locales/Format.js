// const dataSource = require('./zh-CN.json');
// const dataSource = require('./en-US.json');
// const dataSource = require('./ko-KR.json');
const dataSource = require('./vi-VN.json');

let result = {};
function run() {
  for (const key in dataSource) {
    if (dataSource.hasOwnProperty(key)) {
      const element = dataSource[key];
      if (key.indexOf('.') !== -1) {
        let tempKey = key.split('.').reverse();
        let temp = {};
        function getObj(key, value) {
          return { [key]: value };
        }
        for (let index = 0; index < tempKey.length; index++) {
          const k = tempKey[index];
          if (index === 0) {
            temp = getObj(k, element);
          } else {
            temp = getObj(k, temp);
          }
        }
        mergeJSON(temp, result);
      } else {
        let m = {};
        m[key] = element;
        mergeJSON(m, result);
      }
    }
  }
  console.log(JSON.stringify(result));
}

function mergeJSON(minor, main) {
  for (var key in minor) {
    if (main[key] === undefined) {
      // 不冲突的，直接赋值
      main[key] = minor[key];
      continue;
    }
    // 冲突了，如果是Object，看看有么有不冲突的属性
    // 不是Object 则以（minor）为准为主，
    if (isJSON(minor[key]) || isArray(minor[key])) {
      // arguments.callee 递归调用，并且与函数名解耦
      //arguments.callee(minor[key], main[key]);
      mergeJSON(minor[key], main[key]);
    } else {
      main[key] = minor[key];
    }
  }
}

function isJSON(target) {
  return typeof target == 'object' && target.constructor == Object;
}

function isArray(o) {
  return Object.prototype.toString.call(o) == '[object Array]';
}
run();
