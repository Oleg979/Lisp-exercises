// 1. Дан список целых чисел. Получить из него множество (устранить повторение элементов)
const list1 = [1, 2, 2, 3, 4, 1, 5, 3];
const res1 = list1.reduce((acc, val) => acc.includes(val) ? acc : [...acc, val], []);
console.log(res1);

// 2. Дан список целых чисел. Получить наибольший общий делитель всех элементов списка
const list2 = [100, 150, 30, 250];
const nod = list => {
  let x = list[0];
  for (let i = 1; i < list.length; i++) {
    let y = list[i];
    while (x && y) {
      x > y ? x %= y : y %= x;
    }
    x += y;
  }
  return x;
}
console.log(nod(list2));

// 3. Дан многоуровневый список целых чисел. Линеаризовать этот список – получить одноуровневый список, содержащий все элементы исходного
const list3 = [1, [2, 3], 4, 5, [6, 7, [8, 9]]];
const flatten = lst => {
  let res = [];
  lst.forEach(el => {
    if(el instanceof Array) {
      res = [...res, ...flatten(el)];
    } else {
      res = [...res, el];
    }
  })
  return res;
}
console.log(flatten(list3));

// 4. Код: целочисленная матрица задана списком строк. Транспонировать матрицу (отразить относительно главной диагонали; заменить строки столбцами)
const matrix = ["123", "456", "789", "666"];
const transpose = m => {
  const res = [];
  for(let i = 0; i < m[0].length; i++) {
    res[i] = "";
    m.forEach(el => {
      res[i] += el[i];
    })
  }
  return res;
}
console.log(transpose(matrix));

// 5. Самодельная реализация map, filter, fold (reduce). Универсальность свертки – выражение map и filter через reduce.
const list5 = [1, 2, 2, 3, 4, 1, 5, 3];
Array.prototype._reduce = function(op, acc) {
  this.forEach(el => {
    acc = op(acc, el);
  })
  return acc;
}
Array.prototype._map = function(mapper) {
  return this._reduce((acc, val) => [...acc, mapper(val)], [])
}
Array.prototype._filter = function(pred) {
  return this._reduce((acc, val) => pred(val) ? [...acc, val] : acc, [])
}
console.log(list5._reduce((acc, val) => acc + val, 0));
console.log(list5._filter(val => val > 3)); 
console.log(list5._map(val => val + 1));

//6. Код: для заданного целого числа получить список всех его делителей.
const num = 450;
const dividers = [];
for(let i = 1; i <= num; i++) {
  if(num % i === 0) {
    dividers.push(i);
  }
}
console.log(dividers);

// 7. Код: реализовать функцию zip, которая строит из двух заданных списков список пар.
const first = [1, 2, 3, 4];
const second = [5, 6, 7, 8];
const zip = (list1, list2) => {
  const res = [];
  list1.forEach((el, idx) => {
    res.push([list1[idx], list2[idx]]);
  });
  return res;
}
console.log(zip(first, second));

// 8. Код: дан многоуровневый список целых. Реверсировать его на всех уровнях.
const list8 = [1, [2, 3, 4], 4, 5, [6, 7, [8, 9]]];
const deepReverse = list => {
  let res = [];
  list.forEach(el => {
    if(el instanceof Array) {
      res = [deepReverse(el), ...res];
    } else {
      res = [el, ...res];
    }
  })
  return res;
}
console.log(deepReverse(list8));

// 9. Код: дан числовой список. Построить список пар (x,с), где x – уникальный элемент списка, а с – количество вхождений x в исходный список.
const list9 = [1, 2, 2, 3, 4, 1, 5, 3];
const freqList = Object.entries(list9.reduce((acc, val) => {
  return acc[val] ? {...acc, [val]: acc[val] + 1} : {...acc, [val]: 1}
}, {}));
console.log(freqList);
