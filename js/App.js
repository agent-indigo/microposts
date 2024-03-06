import BootswatchSelector from './BootswatchSelector.js'
import EasyHTTP from './EasyHTTP.js'
// classes
// UI
class UI {
    constructor() {
        this.post = document.querySelector('#posts')
        this.titleInput = document.querySelector('#title')
        this.bodyInput = document.querySelector('#body')
        this.idInput = document.querySelector('#id')
        this.postSubmit = document.querySelector('.post-submit')
    }
    // show posts
    showPosts(posts) {
        let output = ''
        posts.forEach((post) => {
            output += `
                <div class="card mb-3">
                    <div class="card-body">
                        <h4 class="card-title">${post.title}</h4>
                        <p class="card-text">${post.body}</p>
                        <a href="#" class="edit card-link" data-id="${post.id}">
                            <i class="fa fa-pencil"></i>
                        </a>
                        <a href="#" class="delete card-link" data-id="${post.id}">
                            <i class="fa fa-remove"></i>
                        </a>
                    </div>
                </div>
            `
        })
        this.post.innerHTML = output
    }
    // show alert
    showAlert(message, className) {
        // clear previous alert
        this.clearAlert()
        // create div
        const div = document.createElement('div')
        // add classes
        div.className = className
        // add text
        div.appendChild(document.createTextNode(message))
        // get parent
        const container = document.querySelector('.postsContainer')
        // get posts
        const posts = document.querySelector('#posts')
        // insert alert div
        container.insertBefore(div, posts)
        // three second timeout
        setTimeout(() => {
            this.clearAlert()
        }, 3000)
    }
    // clear alert
    clearAlert() {
        const currentAlert = document.querySelector('.alert')
        if(currentAlert) {
            currentAlert.remove
        }
    }
    // clear fields
    clearFields() {
        this.titleInput.value = ''
        this.bodyInput.value = ''
    }
    // fill form to edit
    fillForm(data) {
        this.titleInput.value = data.title
        this.bodyInput.value = data.body
        this.idInput.value = data.id
        this.changeFormState('edit')
    }
    // clear ID hidden value
    clearIDinput() {
        this.idInput.value = ''
    }
    // change form state
    changeFormState(type) {
        if(type === 'edit') {
            this.postSubmit.textContent = 'Update Post'
            this.postSubmit.className = 'post-submit btn btn-warning btn-block'
            // create cancel button
            const button = document.createElement('button')
            button.className = 'post-cancel btn btn-light btn-block'
            button.appendChild(document.createTextNode('Cancel Edit'))
            // get parent
            const cardForm = document.querySelector('.card-form')
            // get element to insert before
            const formEnd = document.querySelector('.form-end')
            // insert cancel button
            cardForm.insertBefore(button, formEnd)
        } else {
            this.postSubmit.textContent = 'Post'
            this.postSubmit.className = 'post-submit btn btn-primary btn-block'
            // remove cancel button
            if(document.querySelector('.post-cancel')) {
                document.querySelector('.post-cancel').remove()
            }
            // clear ID from hidden field
            this.clearIDinput()
            // clear test
            this.clearFields()
        }
    }
}
// App
class App {
    constructor() {
        // initialize BootswatchSelector
        BootswatchSelector('United')
        // initialize UI
        this.ui = new UI()
        // load event listeners
        this.loadEventListeners()
    }
    // methods
    // load event listeners
    loadEventListeners() {
        // get posts on DOM load
        document.addEventListener('DOMContentLoaded', this.getPosts.bind(this))
        // submit post
        document.querySelector('.post-submit').addEventListener('click', this.submitPost.bind(this))
        // delete
        document.querySelector('#posts').addEventListener('click', this.deletePost.bind(this))
        // edit state
        document.querySelector('#posts').addEventListener('click', this.enableEdit.bind(this))
        // cancel
        document.querySelector('.card-form').addEventListener('click', this.cancelEdit.bind(this))
    }
    // get posts
    getPosts() {
        EasyHTTP.get('http://localhost:3000/posts')
            .then(data => this.ui.showPosts(data))
            .catch(error => console.error(error))
    }
    // submit post
    submitPost() {
        const title = document.querySelector('#title').value
        const body = document.querySelector('#body').value
        const id = document.querySelector('#id').value
        const data = {
            title,
            body
        }
        // validate input
        if(title === '' || body === '') {
            this.ui.showAlert('Either post title or body is empty.', 'alert alert-danger')
        } else {
            // check if ID exists
            if(id === '') {
                // create post
                EasyHTTP.post('http://localhost:3000/posts', data)
                    .then(() => {
                        this.ui.showAlert('Post added', 'alert alert-success')
                        this.ui.clearFields()
                        this.getPosts()
                    })
                    .catch(error => console.error(error))
            } else {
                // update post
                EasyHTTP.put(`http://localhost:3000/posts/${id}`, data)
                .then(() => {
                    this.ui.showAlert('Post updated', 'alert alert-success')
                    this.ui.changeFormState('add')
                    this.getPosts()
                })
                .catch(error => console.error(error))
            }
            }
    }
    // delete post
    deletePost(event) {
        if(event.target.parentElement.classList.contains('delete')) {
            const id = event.target.parentElement.dataset.id
            if(confirm('Are you sure?')) {
                EasyHTTP.del(`http://localhost:3000/posts/${id}`)
                    .then(() => {
                        this.ui.showAlert('Post deleted', 'alert alert-success')
                        this.getPosts()
                    })
                    .catch(error => console.error(error))
            }
            event.preventDefault()
        }
    }
    // enable edit state
    enableEdit(event) {
        if(event.target.parentElement.classList.contains('edit')) {
            const id = event.target.parentElement.dataset.id
            const title = event.target.parentElement.previousElementSibling.previousElementSibling.textContent
            const body = event.target.parentElement.previousElementSibling.textContent
            const data = {
                id,
                title,
                body
            }
            // fill form with current post
            this.ui.fillForm(data)
        }
        event.preventDefault()
    }
    // cancel edit state
    cancelEdit(event) {
        if(event.target.classList.contains('post-cancel')) {
            this.ui.changeFormState('add')
        }
        event.preventDefault()
    }
}
export default new App()
