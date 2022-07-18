import { useState } from "react";
import { createAuthUserWithEmailAndPassword, signInWithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase';
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

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value })
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await signInAuthUserWithEmailAndPassword(email, password);
        } catch(error) {
            console.log('user creation error',error);
        }
    }   

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
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
                    <Button buttonType='google' onClick={signInWithGoogle} >Google sign In</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;