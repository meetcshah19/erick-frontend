
function serialise(data){
    return Array.from(data.keys()).map((key)=>{

        const value = data.get(key); 
        let id = key;
        let lat = value.lat
        let lng = value.lng
        let driver_name = value.driver_name
        let driver_contact = value.driver_contact

        return {
            id, 
            lat,
            lng,
            driver_contact,
            driver_name
        }
    });
}

export default serialise