import React, { useRef } from "react";
import emailjs from "emailjs-com"
const Login = (props)=>
{
    const {email,setEmail,password,setPassword,handleLogin,handleSignup,hasAccount,sethasAccount,emailError,passwordError}=props;

    const form = useRef(null)

    return(
        <form className="login" ref={form}>
            <div className="loginContainer">
                <label>Username</label>
                <input
                    type="text"
                    autoFocus
                    required
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    name="to_name"
                    />
                <p className="errorMsg">{emailError}</p>
                <label>Password</label>
                <input  
                    type="password"
                    required
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    />
                <p className="errorMsg">{passwordError}</p>
                <div className="btnContainer">
                    {hasAccount ? (
                        <>
                            <button onClick={handleLogin}>Sign In</button>
                            <p>
                                Don't Have an account ?
                                <span onClick={()=>sethasAccount(!hasAccount)}>Sign Up</span>

                            </p>
                        </>
                    ):(
                        <>
                        <button onClick={e => {
                            e.preventDefault()
                            handleSignup(form.current)
                        }}>Sign Up</button>
                        <p>
                            <span onClick={()=>sethasAccount(!hasAccount)}>Sign In</span>
                        </p>
                        </>
                    )}
                </div>
            </div>
            
            </form>
    )
}
export default Login;