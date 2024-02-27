import React, {useState} from "react";
import axios from "axios";
import Joi from "joi";
import { useNavigate } from "react-router-dom";
export default function Login ({ decodeToken }) {
    let navigate = useNavigate();
    const [loginFlag, setLoginFlag] = useState(false);
    const [failedMes, setFailedMes] = useState('');
    const [errList, setErrList] = useState([]);

    const [user, setUser] = useState({
            email: '',
            password: '' 
    });

    function getUser (e) {
        setErrList([]);
        let inputValue = e.target.value;
        let newUser = {...user};
        newUser[`${e.target.id}`] = inputValue;
        setUser(newUser);
    }
   
    function getCurrnetError(key) {
        for (const error of errList) {
            if(error.context.key === key) {
                return error.message;
            }
        }
        return '';
   }

    async function submitForm (e) {
        e.preventDefault();
        setLoginFlag(true);
        let schema = Joi.object({
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
            password: Joi.string().pattern(/[a-z0-9]/).required(),
        });
        let joiResponse = schema.validate(user, {abortEarly: false});
        if (joiResponse.error) {
            setErrList(joiResponse.error.details);
            setLoginFlag(false);
        }else {
            let res = await axios.post('https://route-egypt-api.herokuapp.com/login', {user});
            if (res.data.message === 'incorrect password') {
                setFailedMes(res.data.message);
            }else {
                localStorage.setItem('tkn', res.data.token);
                decodeToken();
                navigate('/home');
            }
            setLoginFlag(false);
        }
    }
    return <>
        <div className="w-75 mx-auto">
            <form onSubmit={submitForm} className="pt-5">
                {failedMes.length === 0 ? '' : <div className="alert alert-danger">{failedMes}</div>}
                {/* {errList.map((err, idx) => <div className="alert alert-danger">
                     {err.message}
                </div>)} */}
                <label htmlFor="email">Email</label>
                <input onChange={getUser} type="email" className="my-3 form-control" placeholder="Enter Your Email" id="email" />
                {getCurrnetError('email').length === 0 ? ' ' : <div className="alert alert-danger">
                        {getCurrnetError('email')}
                    </div>
                }
                <label htmlFor="password">Password</label>
                <input onChange={getUser} type="password" className="my-3 form-control" placeholder="Enter Your Password" id="password" />
                {getCurrnetError('password').length === 0 ? ' ' : <div className="alert alert-danger">
                        {getCurrnetError('password')}
                    </div>
                }
                <button className="btn btn-outline-info">
                    {loginFlag? <i className="fa-solid fa-spinner fa-spin"></i> : 'Login'}
                </button>
            </form>
        </div>
    </>
}