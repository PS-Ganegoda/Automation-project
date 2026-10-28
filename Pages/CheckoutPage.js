const { expect } = require('@playwright/test')


class Checkout {
  constructor(page) {
    this.page = page;
    this.firstname = page.getByPlaceholder("First Name");
    this.lastname = page.getByPlaceholder("Last Name");
    this.postalcode = page.getByPlaceholder("Zip/Postal Code");
    this.continue = page.getByRole("button", { name: "Continue" });
    this.pricebar = page.locator('[data-test="inventory-item-price"]');
    this.itemName = page.locator(".inventory_item_name");
    this.subtotal = page.locator(".summary_subtotal_label");
    this.tax = page.locator(".summary_tax_label");
    this.total = page.locator(".summary_total_label");
    this.finish= page.getByRole('button',{name:"Finish"})
    this.completetext = page.locator(".complete-text")
    this.generatepdf = page.getByRole('button',{name:'Generate PDF order'})
  }
  async fillcontactdetails(fname, lname, pcode) {
    await this.firstname.fill(fname);
    await this.lastname.fill(lname);
    await this.postalcode.fill(pcode);
    await this.continue.click();
  }

  async checkoutflow(n) {
    let checkoutprice = [];
    let checkoutname = [];

    for (let i = 0; i < n; i++) {
      const pricetext = await this.pricebar.nth(i).textContent();
      const price = Number(pricetext.replace("$", ""));
      checkoutprice.push(price);

      const names = await this.itemName.nth(i).textContent();
      checkoutname.push(names);
    }
    const subtotalintext = await this.subtotal.textContent();

    const subtotalincheckout = Number(subtotalintext.replace("$", ""));

    const taxintext = await this.tax.textContent();
    const taxincheckout = Number(taxintext.replace("$", ""));

    const totalintext = await this.total.textContent();
    const totalincheckout = Number(totalintext.replace("$", ""));



    return {
      checkoutname,
      checkoutprice,
      subtotalincheckout,
      taxincheckout,
      totalincheckout,
    };
  }

  async finishcheckout(){
    await this.finish.click()
         await expect(this.completetext).toHaveText("Your order has been dispatched, and will arrive just as fast as the pony can get there!")

 
  }
}

module.exports = { Checkout };
