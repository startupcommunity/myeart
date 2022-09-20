import {
    required,
    minLength,
    maxLength,
    email,
    alpha
} from 'vuelidate/lib/validators';
  

export default () => {
    return {
        user: {
            email: { required, email, minLength: minLength(4), maxLength: maxLength(50) },
            password: { required, alpha, minLength: minLength(6), maxLength: maxLength(20) },
            username: { required, minLength: minLength(4), maxLength: maxLength(50) },
            name: { required, minLength: minLength(4), maxLength: maxLength(50) },
            remember: { required },           
        }, 
    }
}