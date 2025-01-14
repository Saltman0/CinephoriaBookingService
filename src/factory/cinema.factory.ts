export function createCinema(id: number, name: string, address: string, postalCode: number, city: string, phoneNumber: string, openHour: string, closeHour: string) {
    return {
        id: id,
        name: name,
        address: address,
        postalCode: postalCode,
        city: city,
        phoneNumber: phoneNumber,
        openHour: openHour,
        closeHour: closeHour
    };
}