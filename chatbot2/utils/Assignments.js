import axios from 'axios';
import { apiURL } from '../config'

export const getAssignments = async (email) => {
    let assignments = []
    try {
        var myAssignmentsData = await axios.post(apiURL + 'getAssignments', {email: email})
        assignments = myAssignmentsData.data
    } catch(err) {
        console.log("error:", err)
    }
    return assignments
}

export const addAssignment = async (emailValue, inputValue, dateValue) => {
    try {
        const postResponse = await axios.post(apiURL + "addAssignment", {
            email: emailValue,
            name: inputValue,
            date: dateValue
        })
        const message = postResponse.data
        return message
    } catch(err) {
        console.log("error:", err)
    }
}


export const deleteAssignment = async (assignment) => {
    const name = assignment["name"]
    try {
        const deleteAssignmentResponse = await axios.post(apiURL + 'deleteAssignment', {name: name})
        const message = deleteAssignmentResponse.data
        return message
    } catch(err) {
        console.log("error:", err)
    }
}

