import { toast } from 'react-toastify';
import cookie from 'react-cookies'
export const showToast = (type,msg) => {
    switch(type){
        case 'SUCCESS':
            toast.success(msg,{
                position: toast.POSITION.BOTTOM_RIGHT
            })
            break;
        case 'ERROR':
            toast.error(msg,{
                position: toast.POSITION.BOTTOM_RIGHT
            })
            break;
        default:
            return false
    }
}

export const getTokenCookie = () => cookie.load('x-access-token');
export const removeTokenCookie = () => cookie.remove('x-access-token');

export const getAuthHeader = () => ({ headers: {'x-access-token': getTokenCookie()}})
//export const getAuthHeader = { headers: {'x-access-token': getTokenCookie()}}

export function fieldProps(formik, name, label) {
    return {
        ...formik.getFieldProps(name),
        variant: 'outlined',
        fullWidth: true,
        error: Boolean(formik.errors[name] && formik.touched[name]),
        helperText: formik.errors[name] && formik.touched[name] && formik.errors[name],
        name: name,
        margin: 'normal',
        label: label,
    };
}

