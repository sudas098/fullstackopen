import { useField } from '../hooks/useField'
import { useNavigate } from 'react-router-dom'


const CreateNew = ({ addAnecdote }) => {
  const content = useField('text');
  const author = useField('text');
  const info = useField('url');
  const navigate = useNavigate()
  

  const handleSubmit = (e) => {
    e.preventDefault()
    addAnecdote({ content: content.value, author: author.value, info: info.value, votes: 0 })
    navigate('/')
  }

  const handleReset = () => {

    content.reSet();
    author.reSet();
    info.reSet();
  }

  const {reSet: _c, ...contentProps} = content;
  const {reSet: _a, ...authorProps} = author;
  const {reSet: _i, ...infoProps} = info;

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...contentProps} />
        </div>
        <div>
          author
          <input {...authorProps} />
        </div>
        <div>
          url for more info
          <input {...infoProps} />
        </div>
        <button>create</button>
        <button onClick={handleReset}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew
