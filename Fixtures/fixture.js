const { test: baseTest, expect, request } = require('@playwright/test');
const {Login} = require("../Pages/LoginPage")
const {Inventory} = require ('../Pages/InventoryPage')
const {Cart} = require ("../Pages/CartPage")
const {Checkout} = require("../Pages/CheckoutPage")



const test = baseTest.extend({
    login: async ({page},use)=>{
      const login = new Login(page)
      await use(login);
    },
     inventory : async({page},use)=>{
    const inventory = new Inventory(page);
    await use(inventory);
  }
  ,
  cart:async({page},use)=>{
    const cart = new Cart(page);
    await use(cart);
  },
  
  checkout:async({page},use)=>{
    const checkout = new Checkout(page)
    await use(checkout)
  },

 apicontext: async ({}, use) => {
    const apicontext = await request.newContext({
        baseURL: 'https://www.saucedemo.com/',
        extraHTTPHeaders: {
            // Add Authorization here only if the API requires it.
            // Authorization: `Bearer ${token}`,
        }
    });

   
        await use(apicontext);
   
}


})




module.exports = {test,expect}