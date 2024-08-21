export const convertCurrencyToInt = (currency) => {
    let arr = currency.split(".");
    let num = "";
    arr.forEach(e => {
        num = num + e;
    });
    return parseInt(num);
}

export const convertIntToCurrency = (number) => {
    let str = number.toString().split("").reverse().join("");
    
    let formattedStr = str.replace(/\d{3}(?=\d)/g, '$&,');
    
    return formattedStr.split("").reverse().join("").replace(/,/g, '.');
};