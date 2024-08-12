class Post {
    static #list = []
    static #count = 1

    constructor(username, text) {
        this.id = Post.#count++
        this.username = username
        this.text = text
        this.date = new Date().getTime()
        this.reply = []
    }

    static create(username, text, post) {
        console.log('<class creating>')
        const newPost = new Post(username, text)

        // if !post --> new post, else --> new reply
        if (post) {
            post.reply.push(newPost)

            console.log(post)
        } else {
            this.#list.push(newPost)
        }

        console.log(this.#list)

        return newPost
    }

    static getById(id) {
        return Post.#list.find(post => post.id === id)
    }

    static getList = () => this.#list 
}

module.exports = {
    Post,
}