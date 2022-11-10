/* eslint-disable */
function serialise(data){
    console.log("unserialised: ",{data})
    if(data instanceof Map){
        
        return Array.from(data.keys()).map((key)=>{
            
        const value = data.get(key); 
        const id = key;
        const lat = value.lat
        const lng = value.lng
        const driver_name = value.driver_name
        const driver_contact = value.driver_contact
        let received_at = value.received_at
        const date = new Date(received_at)
        const year = date.getFullYear()
        const month = date.getMonth()+1
        const dt = date.getDate()
     
        let result = new Date(received_at).toLocaleTimeString();
        received_at = result + ', ' + dt + '/' + month + '/'+ year

        return {
            id, 
            lat,
            lng,
            driver_contact,
            driver_name,
            received_at
    }
    });
}
else{
    let received_at = data
    const date = new Date(received_at)
    const year = date.getFullYear()
    const month = date.getMonth()+1
    const dt = date.getDate()
    let result = new Date(received_at).toLocaleTimeString();
    received_at = result + ', ' + dt + '/' + month + '/'+ year
    return (
        received_at
    )
}
}

export default serialise