import React, { ReactNode, useContext, createContext } from 'react';

interface AuthProviderProps {
    children: ReactNode
}

interface User {
    id: string;
    name: string;
    email: string;
    photo?: string;
}

interface IAuthContextData {
    user: User;
}

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }: AuthProviderProps) {

    const user = {
        id: '666',
        name: 'Didi',
        email: 'didi@moco.com'
    };

    //Id Client: 593288134816-vjk7t3nldnkrcgo295ki2o0lg0po59fv.apps.googleusercontent.com
    //Chave: locvLjI0e5HXBMobOz0R6u9L

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    const context = useContext(AuthContext);
    return context;
}

export { AuthProvider, useAuth }