import { useContext, useRef, useState } from 'react';
import { useMutation } from 'react-query';

import { AuthContext } from '../../shared/context/auth-context';
import { loginUser, signUpUser } from '../api/users';

import Button from '../../shared/components/Button';
import Card from '../../shared/components/Card';
import Input from '../../shared/components/Input';

import './Authenticate.css';

const Authenticate = (props) => {
  const auth = useContext(AuthContext);

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const [isLoginMode, setLoginMode] = useState(true);

  const switchModeHandler = () => {
    setLoginMode(prevMode => !prevMode);
  }

  const signUpUserMutation = useMutation({
    mutationFn: signUpUser,
    onSuccess: (data) => {
      console.log(data);
      auth.login(data.id, data.token);
    },
    onError: (error) => {
      console.error(error)
    }
  });

  const loginUserMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log(data);
      auth.login(data.id, data.token);
    },
    onError: (error) => {
      console.error(error)
    }
  });

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (isLoginMode) {
      loginUserMutation.mutate({
        email: emailRef.current.value,
        password: passwordRef.current.value
      })
    } else {
      signUpUserMutation.mutate({
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value
      })
    }
  }
  
  return (
    <Card className="authentication">
      {!isLoginMode ? <h2>Sign Up</h2> : <h2>Login</h2> }
      <form onSubmit={onSubmitHandler}>
        { !isLoginMode && <Input id="name" ref={nameRef} type="text" label="Name"/> }
        <Input id="email" ref={emailRef} type="text" label="Email"/>
        <Input id="password" ref={passwordRef} type="password" label="Password"/>
        <Button type="submit" disable={signUpUserMutation.isLoading}>{isLoginMode? 'LOGIN' : 'SIGNUP'}</Button>
      </form>
      <Button inverse onClick={switchModeHandler}>
        {isLoginMode? 'Signup instead?' : 'Login instead?'}
      </Button>
    </Card>
    
    
  )
};

export default Authenticate;