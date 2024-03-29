import { useState } from "react";
import { signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.util';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import './sign-in-form.scss';

const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    // const { setCurrentUser } = useContext(UserContext);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value })
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFields();
        } catch(error) {
            if(error.code === 'auth/wrong-password'){
                alert('incorrect password or email')
            }
            console.log('user creation error',error);
        }
    }   

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    }

    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email</span>
            <form onSubmit={handleSubmit}>

                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email} />

                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password} />
                <div className='buttons-container'>
                    <Button buttonType='default' type="submit">Sign In</Button>
                    <Button type='button' buttonType='google' onClick={signInWithGoogle} >Google Sign In</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;