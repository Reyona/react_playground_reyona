class Store {
    state = {
        list: []
    }
    getStore = () => this.state
    setStore = (data) => {
        this.state = { ...this.state, ...data }
    }
}

export default new Store()