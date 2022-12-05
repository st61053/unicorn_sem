let Calls = {
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },

  async call(method, url, dtoIn, headers) {
    let body;
    if(dtoIn){
      body = JSON.stringify(dtoIn);
    }

    let response = await fetch(url, {
      method: method,
      body: body,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
    });
    let resp = await response.json();
    await this.sleep(300)
    return resp;
  },

  getUri: function(useCase) {
    return (
        "http://localhost:3004/" + useCase
    );
  },

  async getShoppingListAll(dtoIn) {
    let commandUri = this.getUri("shoppingList");
    return await Calls.call("get", commandUri, dtoIn);
  },

  async getShoppingListOnlyActive(dtoIn) {
    let commandUri = this.getUri("shoppingList?state=active");
    return await Calls.call("get", commandUri, dtoIn);
  },

  async getShoppingListOnlyCompleted(dtoIn) {
    let commandUri = this.getUri("shoppingList?state=completed");
    return await Calls.call("get", commandUri, dtoIn);
  },

  async createShoppingItem(dtoIn) {
    let commandUri = this.getUri("shoppingItem");
    return await Calls.call("post", commandUri, dtoIn);
  },

  async getShoppingItem(id) {
    let commandUri = this.getUri(`shoppingItem/${id}`);
    return await Calls.call("get", commandUri);
  },

  async deleteShoppingItem(id) {
    let commandUri = this.getUri(`shoppingItem/${id}`);
    return await Calls.call("delete", commandUri);
  },

  async updateShoppingItem(id, dtoIn) {
    const loadedItem = await this.getShoppingItem(id);
    const newItem = {...loadedItem, ...dtoIn}
    let commandUri = this.getUri(`shoppingItem/${id}`);
    return await Calls.call("put", commandUri, newItem);
  }
};

export default Calls;
