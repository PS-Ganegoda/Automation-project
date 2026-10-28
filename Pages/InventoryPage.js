class Inventory {
  constructor(page) {
    this.page = page;
    this.inventoryitem = page.locator(".inventory_item");
    this.price = page.locator(".inventory_item_price");
    this.addtocart = page.locator(".btn btn_primary btn_small btn_inventory");
    this.itemname = page.locator(".inventory_item_name");
    this.carticon = page.locator(".shopping_cart_badge");
  }

  async AddItemsintoCart(n) {
    const pricearray = [];
    const namearray = [];
    for (let i = 0; i < n; i++) {
      const items = this.inventoryitem.nth(i);
      await items.getByRole("button", { name: "Add to cart" }).click();
      const price1 = await this.price.nth(i).textContent();
      const priceinnumber = Number(price1.replace("$", ""));
      pricearray.push(priceinnumber);

      const name = await this.itemname.nth(i).textContent();
      namearray.push(name);
    }
    console.log("price array:", pricearray);
    console.log("Names in array :", namearray);
    let total = 0;
    let m = pricearray.length;
    for (let i = 0; i < m; i++) {
      total += pricearray[i];
    }
    console.log("total price ", total);
    return {
      total,
      pricearray,
      namearray
    }
  }

  async removeItems(k) {
    const pricearray = [];
    const namearray = [];
    for (let i = 0; i < k; i++) {
      const items = this.inventoryitem.nth(i);
      await items.getByRole("button", { name: "Remove" }).click();

      const price1 = await this.price.nth(i).textContent();
      const priceinnumber = Number(price1.replace("$", ""));
      pricearray.push(priceinnumber);
      const name = await this.itemname.nth(i).textContent();
      namearray.push(name);

      console.log("final price list ", pricearray);
      console.log("final names", namearray);
    }
    let total = 0;
    let m = pricearray.length;
    for (let i = 0; i < m; i++) {
      total += pricearray[i];
    }
    console.log("total price ", total);
    return total;
  }
  async sortinventoryPriceList(n){
    let inventoryprice = []
    for(let i=0;i< n; i++){
    
   const itemsprice = await this.price.nth(i).textContent();
      const pricenum = Number(itemsprice.replace("$",""))

      inventoryprice.push(pricenum)
    }

    console.log("price Array ", inventoryprice);
    const sortedarray = inventoryprice.sort((a,b)=>(a-b))

    console.log("sorted price List",sortedarray)
  }
}

module.exports = { Inventory };
