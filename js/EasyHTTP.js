const EasyHTTP = (() => {
    const get = async url => {
        try {
            const response = await fetch(url)
            const data = await response.json()
            return data
        } catch (error) {
            return console.error(`Error encountered while retrieving:\n${error}`)
        }
    }
    const post = async (url, data) => {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            const responseData = await response.json()
            return responseData
        } catch (error) {
            return console.error(`Error encountered while posting:\n${error}`)
        }
    }
    const put = async (url, data) => {
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            const responseData = await response.json()
            return responseData
        } catch (error) {
            return console.error(`Error encountered while updating:\n${error}`)
        }
    }
    const patch = async (url, data) => {
        try {
            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            const responseData = await response.json()
            return responseData
        } catch (error) {
            return console.error(`Error encountered while updating:\n${error}`)
        }
    }
    const head = async url => {
        try {
            const response = await fetch(url, {
                method: 'HEAD',
                headers: {
                    'Content-type': 'application/json'
                }
            })
            const responseData = await response.json()
            return responseData
        } catch (error) {
            return console.error(`Error encountered while retrieving:\n${error}`)
        }
    }
    const options = async url => {
        try {
            await fetch(url, {
                method: 'OPTIONS',
                headers: {
                    'Content-type': 'application/json'
                }
            })
            const responseData = await response.json()
            return responseData
        } catch (error) {
            return console.error(`Error encountered while retrieving:\n${error}`)
        }
    }
    const del = async url => {
        try {
            await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json'
                }
            })
            return 'Deleted!'
        } catch (error) {
            return console.error(`Error encountered while deleting:\n${error}`)
        }
    }
    return {
        get,
        post,
        put,
        patch,
        head,
        options,
        del
    }
})()
export default EasyHTTP