import { useState } from 'react';
import InputField from '../supportingComponent/InputField';
import './style.scss';
import Button from '../supportingComponent/Button';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { auth, provider, db } from '../../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUpSignIn = () => {
  const [cred, setCred] = useState({
    name: '',
    email: '',
    pass: '',
    cnfPass: '',
  });
  const [flag, setFlag] = useState(false);
  const [loading, setLoading] = useState(false);

  //create doc for user
  const createDocs = async (user) => {
    setLoading(true);
    if (!user) return;

    const userRef = doc(db, 'users', user.uid);
    const userData = await getDoc(userRef);

    console.log(userData);
    if (!userData.exists()) {
      const { displayName, email, photoURL } = user;
      const createdAt = new Date();

      try {
        await setDoc(userRef, {
          name: displayName ? displayName : cred.name,
          email: cred.email,
          photoURL: photoURL ? photoURL : '',
          createdAt,
        });
        toast.success('Account Created!');
        setLoading(false);
      } catch (error) {
        toast.error(error.message);
        console.error('Error creating user document: ', error);
        setLoading(false);
      }
    }
  };

  //sign with email
  const SignUpWithEmail = async () => {
    setLoading(true);
    try {
      if (cred.name === '' || cred.email === '' || cred.pass === '') {
        console.log('all field is mandatory');
        toast.error('All field are Mandatory');
      }
      if (cred.pass !== cred.cnfPass) {
        console.log('password did not matched');
        toast.error("Password didn't matched");
      } else {
        const result = await createUserWithEmailAndPassword(
          auth,
          cred.email,
          cred.pass
        );

        const user = result.user;
        // console.log('user', user);
        await createDocs(user);
        setCred({ name: '', email: '', pass: '', cnfPass: '' });
        toast.success('successfully registered');
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }

    console.log('done');
    setLoading(false);
  };

  // sing in with email
  const signInWithEmail = async () => {
    setLoading(true);
    console.log('user from sing in', cred.email, cred.pass);

    try {
      const result = await signInWithEmailAndPassword(
        auth,
        cred.email,
        cred.pass
      );
      const user = result.user;
      // navigate("/dashboard");
      toast.success('Logged In Successfully!');
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      console.error(
        'Error signing in with email and password: ',
        error.message
      );
      setLoading(false);
    }
  };

  // sing in with google

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await createDocs(user);
      toast.success('User Authenticated Successfully!');
      setLoading(false);
      // navigate("/dashboard");
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
      console.error('Error signing in with Google: ', error.message);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="input-container">
        {flag ? (
          <>
            <h1>Log In</h1>

            <InputField
              label={'Email'}
              type={'email'}
              place={'example123@gmail.com'}
              value={cred.email}
              clickEvent={(e) =>
                setCred((prev) => ({ ...prev, email: e.target.value }))
              }
            />
            <InputField
              label={'Password'}
              type={'password'}
              place={'123456'}
              value={cred.pass}
              clickEvent={(e) =>
                setCred((prev) => ({ ...prev, pass: e.target.value }))
              }
            />

            <Button
              btnClass={'btn'}
              btn={loading ? 'loading...' : 'Login With with Email'}
              clicksEvents={signInWithEmail}
            />
            <p>Or</p>
            <Button
              btnClass={'btn bts'}
              btn={'Log In with Google'}
              clicksEvents={signInWithGoogle}
            />
            <p onClick={() => setFlag(!flag)}>
              Or Don't Have An Account ? Click Here
            </p>
          </>
        ) : (
          <>
            <h1>Sign Up</h1>
            <InputField
              label={'UserName'}
              type={'text'}
              place={'John Deo'}
              value={cred.name}
              clickEvent={(e) =>
                setCred((prev) => ({ ...prev, name: e.target.value }))
              }
            />
            <InputField
              label={'Email'}
              type={'email'}
              place={'example123@gmail.com'}
              value={cred.email}
              clickEvent={(e) =>
                setCred((prev) => ({ ...prev, email: e.target.value }))
              }
            />
            <InputField
              label={'Password'}
              type={'password'}
              place={'123456'}
              value={cred.pass}
              clickEvent={(e) =>
                setCred((prev) => ({ ...prev, pass: e.target.value }))
              }
            />
            <InputField
              label={'CnfPassword'}
              type={'password'}
              place={'123456'}
              value={cred.cnfPass}
              clickEvent={(e) =>
                setCred((prev) => ({ ...prev, cnfPass: e.target.value }))
              }
            />

            <Button
              btnClass={'btn'}
              btn={loading ? 'loading...' : 'Sign Up with Email'}
              disable={loading}
              clicksEvents={SignUpWithEmail}
            />
            <p>Or</p>
            <Button
              btnClass={'btn bts'}
              clicksEvents={signInWithGoogle}
              btn={'Sign Up with Google'}
              disable={loading}
            />
            <p onClick={() => setFlag(!flag)}>
              Or Have An Account Already? Click Here
            </p>
          </>
        )}
      </div>
    </>
  );
};
export default SignUpSignIn;
