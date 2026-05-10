import { test, expect } from "@playwright/test";
import { loginWith, createBlog } from './helper';

test.describe('Blog App', () => {

    test.beforeEach( async ({ page, req }) => {

        req.post('http://localhost:3001/api/testing/reset');
        req.post('http://localhost:3001/api/users', {
            data: {
                username: 'newUser',
                name: 'new',
                password: '12345678'
            }
        });

        await page.goto('/');
    })

    test('Login form is shown', async ({ page }) => {

        await expect(page.getByText('Login to visit the blog list')).toBeVisible();
    })

    test.describe('Login', () => {
        test('succeeds with correct credentials', async ({page}) => {

            await loginWith(page, 'newUser', '12345678');

            await expect(page.getByText('blogs')).toBeVisible();
            await expect(page.getByText('new logged in')).toBeVisible();
        })

        test('fails with wrong credentials', async ({ page }) => {

            await loginWith(page, 'newUser', 'wrong');

            const errorDiv = page.locator('.error');
            await expect(errorDiv).toContainText('wrong credentials');
        })
    })

    test.describe('when loggedin', () => {

        test.beforeEach(async ({ page }) => {

            await loginWith(page, 'newUser', '12345678');
        })

        test('a new blog can be created', async ({ page }) => {

            await createBlog(page, 'new blog', ' by sudip', 12, 'example.com');
            await expect(page.getByText('new blog is added')).toBeVisible();
        })

        test('a blog can be liked', async ({ page }) => {


            const blogTitle = await page.getByText('new blog');

            await page.getByRole('button', { name: 'full details'}).click();

            const likeButton = blogEntry.getByRole('button', { name: '+' });

            await expect(blogEntry).toContainText('likes: 12')

            await likeButton.click();

            await expect(blogEntry).toContainText('likes: 13')

        })

        test('a blog can be deleted by the creater', async ({ page }) => {

            page.on( 'dialog', async dialog => {
                
                 await dialog.accept();
            });

            const blogTitle = page.getByText('new blog');

            await page.locator('div')
                 .filter({ hasText: 'Title: new blog' })
                 .getByRole('button', { name: 'delete' })
                 .click();

            await expect(page.getByText('Atomic Attraction by author Christopher Conwell from Sudip Das is removing'))
                 .toBeVisible();

            await expect(page.getByText('Title: Atomic Attraction')).not.toBeVisible();
        })
    })

    test('only the user who created the blog sees the delete button', async ({ page }) => {
 
  await loginWith(page, 'firstuser', 'password')
  await createBlog(page, 'Visible only to me', 'Author')

  
  const blogEntry = page.locator('.blog').filter({ hasText: 'Visible only to me' })
  await blogEntry.getByRole('button', { name: 'full details' }).click()
  await expect(blogEntry.getByRole('button', { name: 'delete' })).toBeVisible()

 
  await page.getByRole('button', { name: 'logout' }).click()
  await loginWith(page, 'seconduser', 'password')

  
  const blogAsOther = page.locator('.blog').filter({ hasText: 'Visible only to me' })
  await blogAsOther.getByRole('button', { name: 'full details' }).click()
  await expect(blogAsOther.getByRole('button', { name: 'delete' })).not.toBeVisible()
})

test('blogs are ordered according to likes (most likes first)', async ({ page }) => {
  
  await createBlog(page, 'Blog with middle likes', 'Author', 5)
  await createBlog(page, 'Blog with most likes', 'Author', 10)
  await createBlog(page, 'Blog with least likes', 'Author', 0)

 
  const buttons = await page.getByRole('button', { name: 'full details' }).all()
  for (const button of buttons) {
    await button.click()
  }

 
  const blogLocators = page.locator('.blog')
  
  
  await expect(blogLocators.nth(0)).toContainText('Blog with most likes')
  
  await expect(blogLocators.nth(1)).toContainText('Blog with middle likes')
 
  await expect(blogLocators.nth(2)).toContainText('Blog with least likes')
})

    
})