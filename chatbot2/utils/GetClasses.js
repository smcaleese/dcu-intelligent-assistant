import axios from 'axios';
import { apiURL } from '../config'

export const getClasses = async (rawCourseCode, date, err='') => {
    return new Promise((resolve, reject) => {
        const courseCode = rawCourseCode.toUpperCase()

        if (err) {
            reject("Lex error")
        }
        else{
            console.log("dataToPost: courseCode:", courseCode, "date:", date, "post URL:", apiURL)

            axios.post(apiURL + 'timetable', {
                courseCode: courseCode,
                date: date
            })
            .then(res => {
                const dataToSend = {
                    ...res.data,
                    courseCode: courseCode
                }
                resolve(dataToSend)
            })
            .catch(err => {
                console.log("Issue with axios POST request to server:", err)
            })
        }
    })
}