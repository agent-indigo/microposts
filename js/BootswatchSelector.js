import EasyHTTP from './EasyHTTP.js'
const BootswatchSelector = async (selectedDefaultTheme = 'Simplex') => {
	const applyTheme = theme => {
		const existingStylesheet = document.querySelector('link#bootswatch-stylesheet')
		if (existingStylesheet) existingStylesheet.remove()
		const newStylesheet = document.createElement('link')
		newStylesheet.rel = 'stylesheet'
		newStylesheet.href = theme.dataset.cssUrl
		newStylesheet.id = 'bootswatch-stylesheet'
		newStylesheet.crossOrigin = 'anonymous'
		document.head.appendChild(newStylesheet)
	}
	try {
		const selectElement = document.querySelector('select#bootswatch-selector')
		selectElement.addEventListener('change', event => applyTheme(event.target.selectedOptions[0]))
		selectedDefaultTheme.replace(/\w\S*/g, filteredString => {
			return filteredString.charAt(0).toUpperCase() + filteredString.substr(1).toLowerCase()
		})
		try {
			const themesData = await EasyHTTP.get('https://bootswatch.com/api/5.json')
			const themes = themesData.themes
			themes.forEach(theme => {
				const option = document.createElement('option')
				option.value = theme.name
				option.text = theme.name
				option.dataset.cssUrl = theme.cssCdn
				selectElement.appendChild(option)
			})
			const defaultTheme = selectElement.querySelector(`option[value="${selectedDefaultTheme}"]`)
			if (!defaultTheme) {
				console.error('Selected default theme not found. This might be caused by a typo.')
				defaultTheme = 'Simplex'
			}
			defaultTheme.selected = true
			applyTheme(defaultTheme)
		} catch (error) {
			console.error(`Error fetching themes:\n${error}`)
			return
		}
	} catch (error) {
		console.error(`HTML <select> element with id of "bootswatch-selector" not found:\n${error}`)
		return
	}
}
export default BootswatchSelector