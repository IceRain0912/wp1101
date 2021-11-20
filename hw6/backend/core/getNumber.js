var num = 0;

const genNumber = () => {
    num = Math.floor(Math.random() * 100);
}

const getNumber = () => {
    return num;
}

export {genNumber, getNumber};