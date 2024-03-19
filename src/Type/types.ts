export type Customer = {
    idNumber:String,
    firstName:String,
    lastName:String,
    phone:String,
    mobile:String,
    address:{
        city:String,
        street:String,
        houseNumber:number
    },
    picture:String,
    birthDay:Date
}


export type KoronaDetails={
    customerId:String,
    vaccinationDates: 
        [{
            date: Date,
            manufacturer: String
        }],
    positiveTestDate: Date,
    recoveryDate: Date
}