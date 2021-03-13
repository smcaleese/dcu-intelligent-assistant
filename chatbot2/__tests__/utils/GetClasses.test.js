import { getClasses } from '../../utils/GetClasses';

test('test getClasses function', async () => {
    const result = await getClasses('CASE3', '2021-03-10')
    expect(result).toEqual({
        classesData: [],
        jsDate: "2021-03-10T00:00:00.000Z",
        dayOfTheWeek: "Wednesday",
        courseCode: "CASE3"
    })
})