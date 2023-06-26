import {component$, useStylesScoped$ } from '@builder.io/qwik';

import styles from './login.css?inline';
import { Form, routeAction$,zod$,z } from '@builder.io/qwik-city';

export const useLoginUserAction = routeAction$((data, {cookie, redirect}) => {
    const {email,password} = data
    if (email === 'admin@example.com' && password === '123456') {
        cookie.set('jwt','este_es_mi_jwt',{secure:true, path: '/'});
        redirect(302,'/')
        return {
            success: true,
            jwt: 'este_es_mi_jwt'
        }
    
    }
    return {
        success: false,
        
    }

},zod$({
    email: z.string().email('Formato no valido'),
    password: z.string().min(6,"minino 6 letras"),
}))

export default component$(() => {

    useStylesScoped$(styles);
    const action = useLoginUserAction()

  
    return (
        <Form action={action} class="login-form" >
            <div class="relative mt-5">
                
                <input 
                name="email" type="text" 
                placeholder="Email address" 
                />
                <label for="email">Email Address</label>
            </div>
            <div class="relative">
                <input id="password" name="password" type="password" 
                placeholder="Password" 
                
                />
                <label for="password">Password</label>
            </div>
            <div class="relative">
                <button type='submit'>Ingresar</button>
            </div>

            <p>{action.value?.success &&(
                <code>
                    Autenticado: Token: {action.value.jwt}
                </code>
            )}</p>
            <code>
                { JSON.stringify( action.value, undefined , 2 ) }
            </code>
        </Form>
    )
});