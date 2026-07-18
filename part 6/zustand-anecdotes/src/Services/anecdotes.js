const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {

    try {
        const response = await fetch(baseUrl);

        if (!response.ok) {
            throw new Error('Failed to fetch')
        }

        return response.json();
    } catch (err) {
        console.error(err.message);
        
    }
}

const create = async (content) => {

    const options = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({content, votes: 0})
    };

    try {

        const response = await fetch(baseUrl, options);

        if( !response.ok ) {
            throw new Error('Failed to create')
        }

        return response.json();
    } catch (err) {

        console.error(err.message);
        
    }
}

const update = async (id, anecdote) => {

    const options = {
        method: 'PUT',
        headers: { 'content-type': 'application/json'},
        body: JSON.stringify(anecdote)
    }

    try {
        const response = await fetch(`${baseUrl}/${id}`, options);

        if (!response.ok) {
            throw new Error('Failed to update')
        }

        return response.json();
    } catch (err) {
        console.error(err.message);
        
    }
}

const remove = async id => {

    const options = {
        method: 'DELETE',
        headers: { 'content-type': 'application/json'},
    }

    try {
        const response = await fetch(`${baseUrl}/${id}`, options);

       if (!response.ok) {
            throw new Error('Failed to update')
        } else {
            return;
        }
 
        
    } catch (err) {
        console.error(err.message);
        
    }
}

export default { getAll, create, update, remove }