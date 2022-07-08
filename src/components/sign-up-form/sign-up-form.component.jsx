import { useState } from "react";
import { createAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase';
import { createUserDocumentFromAuth } from '../../utils/firebase/firebase';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import './sign-up-form.scss';

const defaultFormFields = {
    displayName: '', 
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value })
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert ("password do not matches");
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth ( user, { displayName });
        } catch(error) {
            console.log('user creation error',error);
        }
    }

    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Display Name" type="text" required onChange={handleChange} name="displayName" value={displayName} />

                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email} />

                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password} />

                <FormInput label="Confirm Password" type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword} />

                <Button buttonType='default' type="submit">Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;