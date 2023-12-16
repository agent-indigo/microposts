import EasyHTTP from './EasyHTTP.js'
const BootswatchSelector = (() => {
	let selectElement
	let defaultTheme
	let themes
	function toTitleCase(string) {
		return string.replace(/\w\S*/g, filteredString => {
			return filteredString.charAt(0).toUpperCase() + filteredString.substr(1).toLowerCase()
		})
	}
	function createOptionElement(theme) {
		const option = document.createElement('option')
		option.value = theme.name
		option.text = theme.name
		option.dataset.cssUrl = theme.cssCdn
		selectElement.appendChild(option)
	}
	function applyDefaultTheme() {
		const defaultOption = selectElement.querySelector(`option[value="${defaultTheme}"]`)
		if (defaultOption) {
			defaultOption.selected = true
			applyTheme(defaultOption)
		}
	}
	function applyTheme(selectedOption) {
		const cssUrl = selectedOption.dataset.cssUrl
		const existingStylesheet = document.querySelector('link#bootswatch-stylesheet')
		if (existingStylesheet) {
			existingStylesheet.remove()
		}
		const newStylesheet = document.createElement('link')
		newStylesheet.rel = 'stylesheet'
		newStylesheet.href = cssUrl
		newStylesheet.id = 'bootswatch-stylesheet'
		newStylesheet.crossOrigin = 'anonymous'
		document.head.appendChild(newStylesheet)
	}
	function setupEventListeners() {
		selectElement.addEventListener('change', event => {
			const selectedOption = event.target.selectedOptions[0]
			applyTheme(selectedOption)
		})
	}
	async function fetchThemes() {
		try {
			const themesData = await EasyHTTP.get('https://bootswatch.com/api/5.json')
			themes = themesData.themes
		} catch (error) {
			console.error('Error fetching themes:', error)
		}
	}
	function renderThemes() {
		themes.forEach(theme => {
			createOptionElement(theme)
		})
	}
	async function init(defaultThemeName) {
		if (!defaultThemeName) {
			throw new Error('No default Bootswatch theme provided.')
		} else {
			try {
				selectElement = document.querySelector('select#bootswatch-selector')
			} catch (error) {
				console.error('HTML <select> element with id of "bootswatch-selector" not found:', error)
			}
			defaultTheme = toTitleCase(defaultThemeName)
			await fetchThemes()
			renderThemes()
			applyDefaultTheme()
			setupEventListeners()
		}
	}
	// Public API
	return {
		init: init
	}
})()
export default BootswatchSelector