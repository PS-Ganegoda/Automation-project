const { expect } = require('@playwright/test');

class Login {
    constructor(page) {
        this.page = page;
        this.loginpage = page.locator('#login_container');
        this.username = page.getByPlaceholder('Username');
        this.password = page.getByPlaceholder('Password');
        this.loginbutton = page.getByRole('button', { name: 'Login' });
        this.openmenu = page.getByRole('button',{name:'Open Menu'})
        this.logout = page.getByRole('button',{name:'Logout'})
    
    }

    async login(username, password) {
        await this.page.goto('https://www.saucedemo.com/',{timeout:6000});
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginbutton.click();
    }

    async logoutfrompage(){
        await this.openmenu.click();
        await this.logout.click()
    }
}

module.exports = { Login };