import hexCode from "./ColorPallete";

const getColor = (id) =>  hexCode.find(item => item.id === id).code["hex"];


export default getColor;