import Appointment from "./models/Appointment"
import Blog from "./models/Blog"
import User from "./models/User"
import { connectToDB } from "./mongoDB"

export const getTotalUsers = async () => {
    try {
        await connectToDB();
        const users = await User.find();
        return users.length;
    } catch (error) {
        console.error("Error fetching total users:", error);
        throw error;
    }
}

export const getAllUsers = async () => {
    await connectToDB()
    const allUser = await User.find()
    return allUser
}

export const getTotalAppointments = async () => {
    await connectToDB()
    const appointments = await Appointment.find()
    const totoalAppointments = appointments.length
    return totoalAppointments
}

export const getAllAppointments = async () => {
    await connectToDB()
    const allAppointments = await Appointment.find()
    return allAppointments
}

export const getTotalBlogs = async () => {
    await connectToDB()
    const blog = await Blog.find()
    const totoalBlog = blog.length
    return totoalBlog
}

export const getAllBlogs = async () => {
    await connectToDB()
    const allBlogs = await Blog.find()
    return allBlogs
}

export const getAppointment = async () => {
    await connectToDB()
    const id = '66c2f7f6b4db3eecc697808d'
    const appointment = await Appointment.findById(id)
    return appointment
}


export const getAppointmentsPerMonth = async () => {
    await connectToDB();
    const appointments = await Appointment.find();

    const appointmentsPerMonth = appointments.reduce((acc, appointment) => {
        const monthIndex = new Date(appointment.appointmentDate).getMonth();
        acc[monthIndex] = (acc[monthIndex] || 0) + 1;
        return acc;
    }, new Array(12).fill(0));

    const graphData = Array.from({ length: 12 }, (_, i) => {
        const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(new Date(0, i));
        return { name: month, appointments: appointmentsPerMonth[i] || 0 };
    });

    return graphData;
};

export const getUserGenderData = async () => {
    await connectToDB();
    let male = 0; let female = 0; let other = 0

    const users = await User.find();

    users.forEach(user => {
        if (user.gender == 'male') {
            male++;
        } else if (user.gender == 'female') {
            female++;
        } else {
            other++;
        }
    })

    return { Male: male, Female: female, Other: other }

}

export const getAppointmentDetails = async (appointmentId: string) => {
    await connectToDB();
    const appointments = await Appointment.findById(appointmentId)
    return appointments;
}

export const getBlogDetails = async (blogId: string) => {
    await connectToDB();
    const blog = await Blog.findById(blogId)
    return blog;
}

