type UserType = {
    _id: string;
    name: string;
    email: string;
    gender: string;
}

// type AppointmentType = {
//     _id: string;
//     userId: string;
//     name: string;
//     email: string;
//     phoneNo: number;
//     appointmentDate: date;
//     service: string;
//     status: string;
//     message: string;
//     notes: string;
// }

type AppointmentType = {
    _id: string;
    name: string;
    email: string;
    appointmentDate: Date | string; 
    service: string;
    status: string;
    notes: string;
    userId: string;
    phoneNo?: string;  
    message?: string; 
};

type BlogType = {
    _id: string;
    title: string;
    excerpt: string,
    image: string,
    paragraph: string,
}

type FormData = {
    firstName: string;
    lastName: string;
    email: string;
    age: number;
    gender: string;
    address: Address;
    hobbies: Hobby[];
    startDate: Date;
    subscribe: boolean;
    referral: string;
}
