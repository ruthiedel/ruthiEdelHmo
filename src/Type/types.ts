export type Customer = {
    idNumber:string,
    firstName:String,
    lastName:string,
    phone:string,
    mobile:string,
    address:{
        city:string,
        street:string,
        houseNumber:number
    },
    picture:string,
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

export type User ={
    email:string,
    pin:string,
    role:string

}
export type AuthUser={
    user:User,
    token:string,
}