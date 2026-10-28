class Cart{
    constructor(page){
        this.page = page;
           this.carticon = page.locator(".shopping_cart_badge");
           this.cartItems= page.locator(".cart_item")
           this.priceofitem = page.locator(".inventory_item_price")
           this.itemName = page.locator(".inventory_item_name")
           this.removeButton = page.getByRole('button',{name:"Remove"})
           this.continueShoppingButton = page.getByRole('button',{name:"Continue Shopping"})
           this.checkout = page.getByRole('button',{name:'Checkout'})
    }
    async getcartitems(){
    await this.carticon.click();
    await this.page.waitForURL('https://www.saucedemo.com/cart.html',{timeout:6000})

        const count = await this.carticon.textContent();
        let cartpagepriceArray =[]
        let cartpagenamearray = []
        let cartpageTotal = 0;

    for (let i =0;i< count ; i++){
      const price = await this.priceofitem.nth(i).textContent()
      const pricenum = Number(price.replace("$",""));
      const name = await this.itemName.nth(i).textContent()
      
      cartpagepriceArray.push(pricenum);
      cartpagenamearray.push(name)
      
      cartpageTotal+= cartpagepriceArray[i]

      
        
    }
    console.log("cartpage price",cartpagepriceArray)
     console.log("cartpage names",cartpagenamearray)
      console.log("cartpage  total",cartpageTotal)
     return {
      cartpagepriceArray,
      cartpagenamearray,
      cartpageTotal
    };
}

async removecartItems(m,n){
    let cartpriceafterremove=[]
    let cartnameaafterremove=[]
    let carttotalafterremove = 0 
    this.getcartitems();
    for(let i=0;i< n;i++){
        await this.removeButton.nth(i).click();
       
    }
    for(let i=0;i<m-n;i++){
        const pricetext = await  this.priceofitem.nth(i).textContent();
        const priceinnum = Number(pricetext.replace("$",""));
        cartpriceafterremove.push(priceinnum)


        const name = await this.itemName.nth(i).textContent()
        cartnameaafterremove.push(name)

        carttotalafterremove += cartpriceafterremove[i]

    }
    console.log("cart price after remove ",cartpriceafterremove)
    console.log("cart names after remove ",cartnameaafterremove)
    console.log("cart total after remove ",carttotalafterremove)
return {
    cartpriceafterremove,cartnameaafterremove,carttotalafterremove
}
}
}

module.exports = {Cart}
