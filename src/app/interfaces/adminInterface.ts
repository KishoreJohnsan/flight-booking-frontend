export interface Airline{
    airlineId:string,
    airlineName:string,
    address:string,
    contact:string,
    isActive:string
}

export interface FlightSchedule{
    scheduleId:string,
    flightNumber:string,
    airline:string,
    source:string,
    destination:string,
    flightType:string,
    date:string,    
    time:string,
    fare:string
}