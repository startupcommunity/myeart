import {
    required,
    minLength,
    maxLength,
    email,
    alpha,
} from 'vuelidate/lib/validators';
  
const isValidFile = (value) => {
    if(!value)
        return false;

    if(value.type)
        return value.type.startsWith('image');
    else
        return (value != '');
};

export default () => {
    return {
        select_sexo: {} ,
        select_pais: {} ,
        select_idioma: {} ,
        asociacion_arte: { minLength: minLength(6), maxLength: maxLength(50) },
        consejeria_ayuntamiento: {  minLength: minLength(6), maxLength: maxLength(20) },
        galeria: {  minLength: minLength(6), maxLength: maxLength(50) },
        asociacion_turismo: {  minLength: minLength(6), maxLength: maxLength(50) },
        artistic_selected: {},
        imagen: { isValidFile }  
    }
}