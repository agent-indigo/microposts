class EasyHTTP {
    // Make an HTTP GET Request
    async get(url) {
        try {
            const response = await fetch(url)
            const data = await response.json()
            return data
        } catch (error) {
            return console.error('Error encountered while retrieving:', error)
        }
    }
    // Make an HTTP POST Request
    async post(url, data) {
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
            return console.error('Error encountered while posting:', error)
        }
    }
    // Make an HTTP PUT Request
    async put(url, data) {
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
            return console.error('Error encountered while updating:', error)
        }
    }
    // Make an HTTP DELETE Request
    async delete(url) {
        try {
            await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json'
                }
            })
            return 'Deleted!'
        } catch (error) {
            return console.error('Error encountered while deleting:', error)
        }
    }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new EasyHTTP()