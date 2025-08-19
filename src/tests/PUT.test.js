import { expect, test } from "@playwright/test";


test('update user posts', async ({ request }) => {
    const response = await request.put('/posts/1', {
        data: {
            id: 1,
            title: 'Existing post',
            body: 'This is a post',
            userId: 1
        }
    })
    expect(response.ok()).toBeTruthy()
    expect(response.status()).toBe(200)
    expect(await response.json()).toEqual(expect.objectContaining({
        "body": "This is a post",
        "id": 1,
        "title": "Existing post",
        "userId": 1
    }))
})

test('update user that does not exist', async ({ request }) => {
    const response = await request.put('/posts/205', {
        data: {
            id: 1,
            title: 'Existing post',
            body: 'This is a post',
            userId: 1
        }
    })
    expect(response.ok()).toBeFalsy()
    expect(response.status()).toBe(500)
    expect(response.statusText()).toEqual('Internal Server Error')
    // expect(await response.text()).toContain("Cannot read properties of undifined (reading 'id') ")
})