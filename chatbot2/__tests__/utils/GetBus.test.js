import { getStops, getBusByStop, getBusByNumber, getStopID } from '../../utils/GetBus';

test('test getStops function', async () => {
    const response = await getStops()
    const stopArr = response.stops
    const responseIsValid = Array.isArray(stopArr) && stopArr.length > 0
    expect(responseIsValid).toBe(true)
})

test('test getBusByStop function', async () => {
    const stopArr = await getBusByStop("8220DB007571")
    const responseIsValid = Array.isArray(stopArr)
    expect(responseIsValid).toBe(true)
})

test('test getBusByNumber function', async () => {
    const stopArr = await getBusByNumber("101")
    const responseIsValid = Array.isArray(stopArr)
    expect(responseIsValid).toBe(true)
})

test('test getStopID function', async () => {
    const resArr = await getStopID("Whitehall")
    const responseIsValid = Array.isArray(resArr) && resArr.length === 2
    expect(responseIsValid).toBe(true)      
})