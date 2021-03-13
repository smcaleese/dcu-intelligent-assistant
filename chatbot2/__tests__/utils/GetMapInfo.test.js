import { getMapData, searchMap } from '../../utils/GetMapInfo';

test('test searchMap function', async () => {
    const result = await searchMap("Library")
    expect(result).toEqual({
        title: "DCU O'Reilly Library (Y)",
        coords: [-6.254601, 53.384209]
    })
})

test('test getMapData function', async () => {
    const result = await getMapData()
    expect(result.locations.length > 0).toBe(true)
})