const { test, expect } = require('../../Fixtures/fixture');


test(
    'Verify button changes from Add to Cart to Remove',
    async ({ page, inventory }) => {

await page.goto('https://www.saucedemo.com/inventory.html');

        await expect(page).toHaveURL(
            'https://www.saucedemo.com/inventory.html'
        );

        await inventory.AddItemsintoCart(2);

        for (let i = 0; i < 2; i++) {
            const item = inventory.inventoryitem.nth(i);

            await expect(
                item.getByRole('button', { name: 'Remove' })
            ).toBeVisible();
        }
    }
);


test("Verify that cart Button Shows Correct aadd to cart Quantity",async({page,inventory,login})=>{
await page.goto('https://www.saucedemo.com/inventory.html');
await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')

 await inventory.AddItemsintoCart(2);
  await expect(inventory.carticon).toHaveText('2')

})

test("remove the items form the cart and behavior of cart badge quantity",async({page,inventory,login})=>{
    await page.goto('https://www.saucedemo.com/inventory.html');
await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')

 await inventory.AddItemsintoCart(4);

await inventory.removeItems(2);
 
await expect(inventory.carticon).toHaveText('2')
})

test ("verify the add to cart all items are included cart page ",async({page,login,inventory,cart})=>{
   await page.goto('https://www.saucedemo.com/inventory.html');
await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')

 const inventoryresults = await inventory.AddItemsintoCart(2);
 
 const results = await cart.getcartitems()
await expect(results.cartpagepriceArray).toEqual(
  inventoryresults.pricearray
);

await expect(results.cartpageTotal).toBe(inventoryresults.total)

await expect(results.cartpagenamearray).toEqual(
   inventoryresults.namearray 
)
  
  page.close();

})

test("verify the cart page tota amount after remove items  ",async({page,login,inventory,cart})=>{
await page.goto('https://www.saucedemo.com/inventory.html');
await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')

 const inventoryresults = await inventory.AddItemsintoCart(5);
 
 const results = await cart.getcartitems()
await expect(results.cartpagepriceArray).toEqual(
  inventoryresults.pricearray
);

const remove = await cart.removecartItems(5,2);
await expect(remove.cartpriceafterremove.length).toBe(3)

})

test("verify the Continue shopping button functionality ",async({login,inventory,cart,page})=>{
await page.goto('https://www.saucedemo.com/inventory.html');
await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')

 const inventoryresults = await inventory.AddItemsintoCart(5);
 
 const results1 = await cart.getcartitems()
await expect(results1.cartpagepriceArray).toEqual(
  inventoryresults.pricearray
);
await cart.continueShoppingButton.click();

await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")

 const results2 = await cart.getcartitems()

await expect(results1.cartpagepriceArray).toEqual(
  results2.cartpagepriceArray
);
})

test("Verify the checkout page button behavior",async({page,login,inventory,cart})=>{
await page.goto('https://www.saucedemo.com/inventory.html');
await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')

 await inventory.AddItemsintoCart(5);

 await cart.getcartitems()
 
 await cart.checkout.click();
 await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-one.html")
})

test("Verify the Checkout page contact information correctly filled behavior",async({page,login,inventory,cart,checkout})=>{
await page.goto('https://www.saucedemo.com/inventory.html');
await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')

 await inventory.AddItemsintoCart(5);

 await cart.getcartitems()
 
 await cart.checkout.click();
 await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-one.html")

 await checkout.fillcontactdetails("piumi","saranga","89000");

 await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-two.html")
})

test("verify the first name omit behavior",async({page,login,inventory,cart,checkout})=>{
await page.goto('https://www.saucedemo.com/inventory.html');
await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')

 await inventory.AddItemsintoCart(5);

 await cart.getcartitems()
 
 await cart.checkout.click();
 await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-one.html")

    await checkout.fillcontactdetails('', 'saranga', '89000');


const error = page.locator('[data-test="error"]');

await expect(error).toBeVisible();
await expect(error).toContainText('First Name is required');

  
})
test("verify the Last  name omit behavior",async({page,login,inventory,cart,checkout})=>{
await page.goto('https://www.saucedemo.com/inventory.html');
await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')

 await inventory.AddItemsintoCart(5);

 await cart.getcartitems()
 
 await cart.checkout.click();
 await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-one.html")

    await checkout.fillcontactdetails('piumi', '', '89000');


const error = page.locator('[data-test="error"]');

await expect(error).toBeVisible();
await expect(error).toContainText('Last Name is required');

  
})

test("verify the postal code  omit behavior",async({page,login,inventory,cart,checkout})=>{
await page.goto('https://www.saucedemo.com/inventory.html');
await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')

 await inventory.AddItemsintoCart(5);

 await cart.getcartitems()
 
 await cart.checkout.click();
 await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-one.html")

    await checkout.fillcontactdetails('piumi', 'saranga', '');


const error = page.locator('[data-test="error"]');

await expect(error).toBeVisible();
await expect(error).toContainText(' Postal Code is required');

  
})


test("veryfy the entire flow ",async({page,login,inventory,cart,checkout})=>{

await page.goto('https://www.saucedemo.com/inventory.html');
await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')

 const inventoryRes= await inventory.AddItemsintoCart(5);

 const cartRes= await cart.getcartitems()

 await expect(inventoryRes.pricearray).toEqual(cartRes.cartpagepriceArray);
 
 await cart.checkout.click();
 await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-one.html")

 await checkout.fillcontactdetails("piumi","saranga","89000");

 await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-two.html")

 const checkoutRes = await checkout.checkoutflow(5)

 await expect(checkoutRes.checkoutprice).toEqual(cartRes.cartpagepriceArray)

 await checkout.finishcheckout();

})



test("verify the inventory level page and sort the price order",async({page,login,inventory})=>{
await page.goto('https://www.saucedemo.com/inventory.html');
await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')

 const inventoryRes= await inventory.sortinventoryPriceList(6) 
})