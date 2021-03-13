import { signup, login, checkToken, deleteAccount } from '../../utils/Users';

test('test signup function', async () => {
    const result = await signup("darragh.mcgonigle3@mail.dcu.ie", "APITESTPASSWORD")
    const isResultValid = result === "sign up successful" || result === "user already exists"
    expect(isResultValid).toBe(true)
})

test('test login function', async () => {
    const result = await login("darragh.mcgonigle3@mail.dcu.ie", "APITESTPASSWORD")
    expect(result[0]).toBe("login successful")
})

test('test checkToken function', async () => {
    const result = await checkToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhcnJhZ2gubWNnb25pZ2xlM0BtYWlsLmRjdS5pZSIsImlhdCI6MTYxNTMwNDAwMSwiZXhwIjoxNjE1MzkwNDAxfQ.2K-870nMFrk1cWn2zthjI-ahl2Tlu_cvXC6wUPSprLI")
    const isResultValid = result[0] === true || result[0] === false
    expect(isResultValid).toBe(true)
})

test('test deleteAccount function', async () => {
    const result = await deleteAccount("darragh.mcgonigle3@mail.dcu.ie")
    const isResultValid = result === "account successfully deleted" || result === "account does not exist"
    expect(isResultValid).toBe(true)
})