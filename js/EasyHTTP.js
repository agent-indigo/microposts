const EasyHTTP = (() => {
    // Make an HTTP GET Request
    const get = async url => {
        try {
            const response = await fetch(url)
            const data = await response.json()
            return data
        } catch (error) {
            return console.error(`Error encountered while retrieving:\n${error}`)
        }
    }
    // Make an HTTP POST Request
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
    // Make an HTTP PUT Request
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
    // Make an HTTP DELETE Request
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
        del
    }
})()
export default EasyHTTP