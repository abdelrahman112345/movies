import axios from "axios";
import Joi from "joi";
import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
export default function Signup () {
    let navigate = useNavigate();
    const [loginFlag, setLoginFlag] = useState(false);
    const [failedMes, setFailedMes] = useState('');
    const [errList, setErrList] = useState([]);

    const [user, setUser] = useState({
            first_name: '',
            last_name: '',
            age: 0,
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
            first_name: Joi.string().alphanum().min(3).required(),
            last_name: Joi.string().alphanum().min(3).required(),
            age: Joi.number().min(18).max(69).required(),
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
            password: Joi.string().pattern(/[a-z0-9]/).required(),
        });
        let joiResponse = schema.validate(user, {abortEarly: false});
        if (joiResponse.error) {
            setErrList(joiResponse.error.details);
            setLoginFlag(false);
        }else {
            let res = await axios.post('https://route-egypt-api.herokuapp.com/signup', {user})
            if (res.data.errors) {
                setFailedMes(res.data.message);
            }else {
                navigate('/login');
            }
            setLoginFlag(false);
        }
   }

   return <>
        <div className="w-75 mx-auto">
            <form onSubmit={submitForm}>
                {failedMes.length === 0 ? '' : <div className="alert alert-danger">{failedMes}</div>}
                {/* {errList.map((err, idx) => <div className="alert alert-danger">
                     {err.message}
                </div>)} */}
                <label htmlFor="first_name">Frist Name</label>
                <input onChange={getUser} type="text" className="my-3 form-control" placeholder="Enter Your First Name" id="first_name" />
                {getCurrnetError('first_name').length === 0 ? ' ' : <div className="alert alert-danger">
                        {getCurrnetError('first_name')}
                    </div>
                }
                <label htmlFor="last_name">Last Name</label>
                <input onChange={getUser} type="text" className="my-3 form-control" placeholder="Enter Your Last Name" id="last_name" />
                {getCurrnetError('last_name').length === 0 ? ' ' : <div className="alert alert-danger">
                        {getCurrnetError('last_name')}
                    </div>
                }
                <label htmlFor="age">Age</label>
                <input onChange={getUser} type="number" className="my-3 form-control" placeholder="Enter Your Aga" id="age" />
                {getCurrnetError('age').length === 0 ? ' ' : <div className="alert alert-danger">
                        {getCurrnetError('age')}
                    </div>
                }
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
                    {loginFlag? <i className="fa-solid fa-spinner fa-spin"></i> : 'Register'}
                </button>
            </form>
        </div>
    </>
}
