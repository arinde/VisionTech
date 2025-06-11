
import { auth, db, provider } from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import CartImage from "../assets/cartImage.png"


const SignUpPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        conPassword: ''
    })
    const navigate = useNavigate();
    const [error, setError] = useState(null)
    const [successMessage, setSuccessMessage] = useState('')

    const handleChange = (e) =>{
        setFormData({...formData, [e.target.name]: e.target.value});
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const {name, email, password, conPassword} = formData;
        if (password !== conPassword) {
            setError("passwords do not match")
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user

            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                name: name,
                email: email,
                createdAt: new Date(),
            })

            console.log("user created successfully", user);
            setSuccessMessage("Signup successful! Redirecting...");
            setTimeout(() => {
                navigate('/home');
            }, 2000)
            

        } catch (err) {
            setError(err.message);
        }
    }

    const handleGoogleSignup = async () => {
        try{
            const result = await signInWithPopup(auth, provider);
            const user = result.user

            await setDoc(doc(db, 'users', user.uid), {
                uid: user.uid,
                name: user.displayName,
                email: user.email
            });

            console.log("signed up with Google successfully", user);
             navigate('/home');
        } catch (err) {
            setError(err.message);
        }
    };

    return(
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between min-h-screen bg-gray-100 pb-10  pt-36 ">
            <img src={CartImage} alt=""  className="md:w-148 md:h-136 mr-3 md:mr-auto"/>
            <div className="bg-gray-100 px-12 py-6 rounded-lg shadow-md w-full max-w-md md:mr-24 ">
                <h2 className="text-2xl font-bold mb-6 text-center">Create an account</h2>
                {error && <p className="text-red-500">{error}</p>}
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">Full Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="conPassword">Confirm Password</label>
                        <input type="password" id="conPassword" name="conPassword" value={formData.conPassword} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200">Sign Up</button>
                </form>
                <button onClick={handleGoogleSignup} className="rounded-lg border border-gray-500 flex flex-row justify-center items-center gap-x-3 mt-4 w-full p-2 bg-white text-gray-800" >
                    <svg width="22" height="23" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_804_3336)">
                    <path d="M23.766 12.7764C23.766 11.9607 23.6999 11.1406 23.5588 10.3381H12.24V14.9591H18.7217C18.4528 16.4494 17.5885 17.7678 16.323 18.6056V21.6039H20.19C22.4608 19.5139 23.766 16.4274 23.766 12.7764Z" fill="#4285F4"/>
                    <path d="M12.2401 24.5008C15.4766 24.5008 18.2059 23.4382 20.1945 21.6039L16.3276 18.6055C15.2517 19.3375 13.8627 19.752 12.2445 19.752C9.11388 19.752 6.45946 17.6399 5.50705 14.8003H1.5166V17.8912C3.55371 21.9434 7.7029 24.5008 12.2401 24.5008Z" fill="#34A853"/>
                    <path d="M5.50253 14.8003C4.99987 13.3099 4.99987 11.6961 5.50253 10.2057V7.11481H1.51649C-0.18551 10.5056 -0.18551 14.5004 1.51649 17.8912L5.50253 14.8003Z" fill="#FBBC04"/>
                    <path d="M12.2401 5.24966C13.9509 5.2232 15.6044 5.86697 16.8434 7.04867L20.2695 3.62262C18.1001 1.5855 15.2208 0.465534 12.2401 0.500809C7.7029 0.500809 3.55371 3.05822 1.5166 7.11481L5.50264 10.2058C6.45064 7.36173 9.10947 5.24966 12.2401 5.24966Z" fill="#EA4335"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_804_3336">
                    <rect width="24" height="24" fill="white" transform="translate(0 0.5)"/>
                    </clipPath>
                    </defs>
                    </svg>

                     Sign up with Google
                </button>
                {successMessage && <p className="text-green-600 mt-4">{successMessage}</p>}
                <p className="text-center text-sm mt-10">Already have an account?     <Link to="/login" className="text-blue-600">Sign In</Link></p>
            </div>
        </div>
    )
}

export default SignUpPage;