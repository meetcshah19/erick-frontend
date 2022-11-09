function serialise(data){
    if(data instanceof Map){
        return Array.from(data.keys()).map((key)=>{
            
        const value = data.get(key); 
        let id = key;
        let lat = value.lat
        let lng = value.lng
        let driver_name = value.driver_name
        let driver_contact = value.driver_contact
        let received_at = value.received_at
        let date = new Date(received_at)
        let year = date.getFullYear()
        let month = date.getMonth()+1
        let dt = date.getDate()
        console.log("meet:"+received_at)
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
    let date = new Date(received_at)
    let year = date.getFullYear()
    let month = date.getMonth()+1
    let dt = date.getDate()
    let result = new Date(received_at).toLocaleTimeString();
    received_at = result + ', ' + dt + '/' + month + '/'+ year
    return (
        received_at
    )
}
}

export default serialise