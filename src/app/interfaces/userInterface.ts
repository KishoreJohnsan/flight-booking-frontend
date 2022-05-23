export interface Booking {
    bookingId: string,
    airline: string,
    date: string,
    time: string,
    source: string,
    destination: string,
    status: string,
    fare: number,
    mealPreference: string,
    seats: number,
    user:string
}

export interface Result {
    scheduleId: string,
    airline: string,
    departureDate: string,
    departureTime: string,
    sourceStn: string,
    destStn: string,
    fare: number,
}