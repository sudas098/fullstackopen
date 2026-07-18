import { useState } from 'react';
import styled from 'styled-components';
import { useBlogStore } from '../store';
import { useNavigate } from 'react-router-dom';


const FormContainer = styled.div`
  margin-top: 20px;
`;

const Title = styled.h2`
  font-family: 'Arial', sans-serif;
  font-weight: bold;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 300px;
`;

const InputWrapper = styled.div`
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px 0;
  border: none;
  border-bottom: 1px solid #ccc;
  outline: none;
  font-size: 1rem;
  transition: border-color 0.2s;
  &:focus {
    border-bottom: 2px solid #2196F3;
  }
`;

const Button = styled.button`
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
  text-transform: uppercase;
  align-self: flex-start;
  margin-top: 10px;
  &:hover {
    background-color: #1565c0;
  }
`;

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const login = useBlogStore((state) => state.login);
  const setNotification = useBlogStore((state) => state.setNotification);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await login({ username, password });
      setUsername('');
      setPassword('');
      navigate('/blogs');
    } catch (error) {
      setNotification('Wrong credentials', 'error');
    }
  };

  return (
    <FormContainer>
      <Title>Log in to application</Title>
      <StyledForm onSubmit={handleLogin}>
        <InputWrapper>
          <Input
            type="text"
            value={username}
            name="Username"
            placeholder="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            type="password"
            value={password}
            name="Password"
            placeholder="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </InputWrapper>
        <Button type="submit" id="login-button">
          LOGIN
        </Button>
      </StyledForm>
    </FormContainer>
  );
};

export default LoginForm;