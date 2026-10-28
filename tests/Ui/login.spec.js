const { test, expect } = require('../../Fixtures/fixture');

test('Verify the correct credentials', async ({ page, login }) => {
 
 await login.login('standard_user', 'secret_sauce',{timeout:600});
 await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
 await page.close();

});

test ('Verify the The locked-out error',async({page,login})=>{
     
await login.login('locked_out_user', 'secret_sauce',{timeout:60000});
 const errorPage = page.locator('[data-test="error"]')
  await expect(errorPage).toHaveText(
        'Epic sadface: Sorry, this user has been locked out.'
    );


    await page.close();
})

// test('Verify the Problem User Behavior',async({page,login})=>{
//      const errorPage = page.locator('[data-test="error"]')

//     await login.login('problem_user','secret_sauce',{timeout:6000});
//     // await expect(errorPage).toHaveText(

//     // );
//     // await page.close();


// })

test('Verify the performance_glitch_user behavior',async({page,login})=>{
    await login.login('performance_glitch_user','secret_sauce');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
     await page.close();


})

test('verify the logout behavior',async({page,login})=>{
  await login.login('standard_user', 'secret_sauce',{timeout:600});
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
    await login.logoutfrompage()

    await expect(page).toHaveURL("https://www.saucedemo.com/")

     await page.close();
})