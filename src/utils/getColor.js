import hexCode from "./ColorPallete";

const getColor = (id) =>  hexCode.find(item => item.id === id);


export default getColor;