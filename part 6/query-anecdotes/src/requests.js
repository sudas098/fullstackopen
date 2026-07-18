const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = async () => {

    try {
      const response = await fetch(baseUrl);

      if ( !response.ok ) {
        throw new Error('failed to fetch')
      }

      return await response.json();
    } catch (err) {
        console.error(err.message);
        throw err;
    }
}

export const creat = async (newAnecdote) => {

    try {

        const options = {
           method: 'POST',
           headers: { 'content-type': 'application/json' },
           body: JSON.stringify(newAnecdote)
        }

      const response = await fetch(baseUrl, options);

      if ( !response.ok ) {
        throw new Error('failed to fetch')
      }

      return await response.json();
    } catch (err) {
        console.error(err.message);
        throw err;
    }
}

export const update = async (updatedAnecdote) => {

    try {

        const options = {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(updatedAnecdote)
        }

      const response = await fetch(`${baseUrl}/${updatedAnecdote.id}`, options);

      if ( !response.ok ) {
        throw new Error('failed to fetch')
      }

      return await response.json();
    } catch (err) {
        console.error(err.message);
        throw err;
    }
}

export const remove = async (id) => {

    try {

        const options = {
            method: 'DELETE',
            headers: { 'content-type': 'application/json' }
        }
      const response = await fetch(`${baseUrl}/${id}`);

      if ( !response.ok ) {
        throw new Error('failed to fetch')
      }

      return await response.json();
    } catch (err) {
        console.error(err.message);
        throw err;
    }
}