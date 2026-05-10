const loginWith = async ({ page, username, password }) => {

      await page.getByRole('button', { name: 'login'}).click();
      await page.getByLabel('username').fill(username);
      await page.getByLabel('password').fill(password);
      await page.getByRole('button', { name: 'login'});
}

const createBlog = async ({ page, title, author, likes, url}) => {

    await page.getByRole('button', { name: 'new blog'}).click();
    await page.getByRole('textbox').fill(title);
    await page.getByRole('textbox').fill(author);
    await page.getByRole('textbox').fill(likes);
    await page.getByRole('textbox').fill(url);
     await page.getByRole('button', { name: 'submit'}).click();
}

export default { loginWith, createBlog }