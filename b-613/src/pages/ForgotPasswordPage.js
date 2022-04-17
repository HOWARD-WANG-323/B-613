
import { Form, Input, Button, Checkbox } from 'antd';
import {  UserOutlined, LockOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { useState } from 'react';
import axios from 'axios';
import cookie from 'react-cookies'


function ForgotPassword() {
  const goToLogin = () => {
    window.location.href="/";
  };
  const goToRegister = () => {
    window.location.href="/register";
  };
  const goToModify = () => {
    window.location.href="/modify";
  };
  const goToHome = () => {
    window.location.href="/home";
    // setMail('');
    // setPassword('');
  };

  const submit = () => {
    console.log(validCode);
    console.log(mail);
    axios.post('http://localhost:8080/api/codeChecking/', {
      code: validCode,
      userEmail: mail,
    })
    .then(function (response) {
      console.log(response);
      if(response.data.state == "valid"){
        goToModify();
      }
      else{
        console.log("verify code is wrong!")
      }
    })
    .catch(function (error) {
      console.log(error);
    });
    setUserName('');
  }; 


  const submitValid = () => {
    axios.post('http://localhost:8080/api/verifyEmail/', {
      userEmail: mail,
      })
      .then(function (response) {
        console.log(response.data.state);
        
          axios.post('http://localhost:8080/api/codeSending/', {
                userEmail: mail,
                })
                .then(function (response) {
                  console.log(response);
                })
                .catch(function (error) {
                  console.log(error);
                });
      
      })
      .catch(function (error) {
        console.log(error);
      });
    };

  const Login = () => {
    axios.post('http://localhost:8080/api/login/', {
      userName: userName,
      userEmail: mail,
      password: password,
    })
    .then(function (response) { 
      console.log(response.data.data[0]);
      cookie.save('id',response.data.data[0].id);
      console.log(response.data.data[0].id);
      cookie.save('userName',response.data.data[0].userName); 
      cookie.save('userEmail',response.data.data[0].userEmail); 
      cookie.save('age',response.data.data[0].age); 
      cookie.save('password',response.data.data[0].password); 
      cookie.save('gender',response.data.data[0].gender); 
      cookie.save('city',response.data.data[0].city);
      cookie.save('picture',response.data.data[0].picture);
      goToHome();
      })
    .catch(function (error) {
      console.log(error);
    });
  };

  const [userName,setUserName] = useState('');
  
  const [password,setPassword] = useState('');
  const [mail,setMail] = useState('');
  const [validCode,setValidCode] = useState('');


  return (
    <div>
                <span class="input-group-addon">Your Email:</span>
                <Input 
              
              placeholder="E-mail"
              size='large'
              onChange={(e) => {
                setMail(e.target.value);
                console.log(mail)
              }}/>


<Button type="primary" htmlType="submit" className="login-form-button"
              onClick={submitValid}
              >
                发送验证码
              </Button>


              <Input 
              placeholder="ValidCode"
              size='large'
              onChange={(e) => {
                setValidCode(e.target.value);
                console.log(validCode)
              }}/>


<Button type="primary" htmlType="submit" className="login-form-button"
              onClick={submit}
              >
                Confirm
              </Button>
            </div>
                
  );
}

export default ForgotPassword;