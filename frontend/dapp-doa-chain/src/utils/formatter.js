export function dateFormatter(timestamp) {
    const date = new Date(Number(timestamp) * 1000);
    return date.toDateString();
}

export function ethFormatter(value){
    return (Number(value) / 10 ** 18).toFixed(18);
}