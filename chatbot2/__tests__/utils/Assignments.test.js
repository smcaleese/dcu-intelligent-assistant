import { getAssignments, addAssignment, deleteAssignment } from '../../utils/Assignments';

test('test getAssignments function', async () => {
    const assignments = await getAssignments("darragh.mcgonigle3@mail.dcu.ie")
    expect(Array.isArray(assignments)).toBe(true)
})

test('test addAssignment function', async () => {
    const result = await addAssignment("darragh.mcgonigle3@mail.dcu.ie", "3rd Year Project", "12 March")
    expect(result).toBe("assignment successfully added")
})

test('test deleteAssignment function', async () => {
    const result = await deleteAssignment("3rd Year Project")
    expect(result).toBe("assignment successfully deleted")
})