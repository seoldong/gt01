`use strict`

const player = ['A', 'B']
const strategy = ['plan_A', 'plan_B', 'plan_C']
const payoff = [10, 20, 61]

// 

const indexes = strategy.map((e) => strategy.indexOf(e))
console.log(`indexes : ${indexes}`);

const setNum = strategy.map((e) => indexes.at(-1))
console.log(`setNum : ${setNum}`);

// 

// number logic (core value)

function numberLogic(arr, length) {  // 0 ~ 26 n(자릿수)진수로 변환 및 배열화
    const Arr = arr.join(''); //222
    const Num = parseInt(Arr, length); //222 > 26 *10진수로 변환

    let results = [];
    for (let i = 0; i <= Num; i++) {
        const makeNum = i.toString(length).padStart(length, 0) // 0 ~ 26 만들고 빈자리 수 0으로 채우기
        const divid = Array.from(makeNum); //배열화
        let number = divid.map((e) => Number(e)); //숫자타입으로 변환
        results.push(number)
    }
    return results;
}
const numberLogic_value = numberLogic(setNum, strategy.length)
// console.log(numberLogic_value);

const coreArr = [...JSON.parse(JSON.stringify(numberLogic_value))];

//

// payoff filter

function payoffFilter(corearr, idxarr, payarr) {
    const Carr = [...JSON.parse(JSON.stringify(corearr))];
    for (let entry of Carr) {
        for (let item of entry) { //0 0 1
            for (let i of idxarr) { // 0 1 2
                if (item == idxarr[i]) { entry.splice(entry.indexOf(item), 1, payarr[i]) } {
                }
            }
        }
    }
    return Carr
}
const payoffFilter_value = payoffFilter(coreArr, indexes, payoff)
console.log(payoffFilter_value);

// 

// same value find

function sameValueFinder(arr) {
    const results = [];
    for (let entry of arr) {
        let sameValue = {}
        for (let item of entry) {
            sameValue[item] = (sameValue[item] || 0) + 1
        };
        results.push(sameValue)
    }
    return results;
}
const sameValueFinder_value = sameValueFinder(payoffFilter_value)

// 

// apply rule

function applyRule(arr, obj) {
 
    let results = []
    for (let i = 0; i < arr.length; i++) {
        const Arr = arr[i];
        const Obj = obj[i];
        const keys = Object.keys(Obj);

        let applyValue = [];
        for (let entry of Arr) {
            for (let i = 0; i < keys.length; i++) {
                if (entry == keys[i]) {
                    let rule = (entry / Obj[keys[i]])
                    applyValue.push(Math.floor(rule));
                }
            }
        }
        results.push(applyValue)
    }
    return results;
}

const applyRule_value = applyRule(payoffFilter_value, sameValueFinder_value)
console.log(applyRule_value);

//

// strategy filter

function strfFilter(corearr, idxarr, strarr) {
    const Carr = [...JSON.parse(JSON.stringify(corearr))];
    for (let entry of Carr) {
        for (let item of entry) { //0 0 1
            for (let i of idxarr) { // 0 1 2
                if (item == idxarr[i]) { entry.splice(entry.indexOf(item), 1, strarr[i]) } {
                }
            }
        }
    }
    return Carr
}
const strfFilter_value = strfFilter(coreArr, indexes, strategy)

// 

// results print 구조분해할당 써볼 것

function resultsPrint(str, arr) {
    let results = [];
    for (let i = 0; i < arr.length; i++) {
        const Str = str[i];
        const Arr = arr[i];

        let text = []
        for (let j = 0; j < Str.length; j++) {
            const printText = [Str[j], Arr[j]]
            text.push(printText)
        }
        results.push(text)
    }
    return results
}

const resultsPrint_value = resultsPrint(strfFilter_value, applyRule_value)
console.log(resultsPrint_value);

//

// sort

function alignValue() {
    resultsPrint_value.sort((a, b) => {
        const t1 = a[0][1];
        const t2 = b[0][1];
        return t2 - t1
    });

    for (let entry of resultsPrint_value) {
        console.log(entry[0], entry[1], entry[2]);
    }
}
alignValue();