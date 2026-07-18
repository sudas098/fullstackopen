import { getByText, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, beforeEach, describe, test, vi } from "vitest";
import Blog from './Blog';
import BlogForm from './BlogForm';


test("renders title and author but doesn't render likes and url by default", () => {
    const blog = {
        title: 'component testing is done by react testing library',
        author: 'Full Stack Developer',
        likes: 1,
        url: 'https://fullstackopen.com'
    }

    render(<Blog blog = { blog }/>)

    const titleElement = screen.getByText(/component testing is done by react testing library/i);
    const authorElement = screen.getByText(/Full Stack Developer/i);

    expect(titleElement).toBeDefined();
    expect(authorElement).toBeDefined();

    const urlElement = screen.queryByText('https://fullstackopen.com', {exact: false});
    const likesElement = screen.queryByText(/likes 1/i);

    expect(urlElement).toBeNull();
    expect(likesElement).toBeNull();
})

test('renders likes and url when button clicked', async() => {
   const blog = {
        title: 'Likes and url in component testing is done by react testing library',
        author: 'Full Stack Developer',
        likes: 20,
        url: 'https://fullstackopen.com',
        user: {name: 'test user'}
    }

    const user = userEvent.setup();

    render(<Blog blog = { blog }/>)

    const button = screen.getByText('full details');
    await user.click(button);

    const urlElement = screen.getByText(/https:\/\/fullstackopen\.com/i);
    const likesElement = screen.getByText(/20/i);

    expect(urlElement).toBeDefined();
    expect(likesElement).toBeDefined();


})

test('clicking the like button twice call the event handler twice', async () => {
    const blog = {
        title: 'Likes and url in component testing is done by react testing library',
        author: 'Full Stack Developer',
        likes: 20,
        url: 'https://fullstackopen.com',
        user: {name: 'test user'}
    }

    const mockFunction = vi.fn();

    render(<Blog blog = { blog } handleLikes = { mockFunction } />)

    const user = userEvent.setup();
    const viewLikeButton = screen.getByText('full details');
    await user.click(viewLikeButton);
    
    const likeButton = screen.getByText(/\+/i);

    await user.click(likeButton);
    await user.click(likeButton);

    expect(mockFunction.mock.calls).toHaveLength(2);

})

test('calls createBlog with the right details when a new blog is created', async () => {
  const createBlog = vi.fn() 
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  
  const titleInput = screen.getByPlaceholderText('Atomic Attraction')
  const authorInput = screen.getByPlaceholderText('Christopher Canwell')
  const linkInput = screen.getByPlaceholderText('http:example.com')
  const sendButton = screen.getByText('submit')

  
  await user.type(titleInput, 'Testing Form Title...')
  await user.type(authorInput, 'Test Author...')
  await user.type(linkInput, 'https://testlink.com')

  
  await user.click(sendButton)

  
  expect(createBlog.mock.calls).toHaveLength(1)

 
  const submittedData = createBlog.mock.calls[0][0]
  
  expect(submittedData.title).toBe('Testing Form Title...')
  expect(submittedData.author).toBe('Test Author...')
  expect(submittedData.link).toBe('https://testlink.com')
})