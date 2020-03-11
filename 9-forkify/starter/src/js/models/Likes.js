export default class Likes {
    constructor() {
        this.likes = [];
    }

    addLike(id, title, author, image) {
        const like = {id, title, author, image};
        this.likes.push(like);

        // save data is local storage'
        this.storeData()
        return like;
    }

    deleteLike(id) {
        const index = this.likes.findIndex(element => element.id === id);
        this.likes.splice(index, 1);

        // delete data from local storage
        this.storeData();
    }

    isLiked(id) {
        return this.likes.findIndex(element => element.id === id) !== -1;
    }

    getNumberOfLikes() {

        return this.likes.length;
    }

    storeData() {
        localStorage.setItem('likes', JSON.stringify(this.likes));
    };

    getData() {
        const storage = JSON.parse(localStorage.getItem('likes'));

        // Restore likes from localStorage
        if (storage) this.likes = storage;
    }
}
