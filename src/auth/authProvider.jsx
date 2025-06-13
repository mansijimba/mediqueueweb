import { createContext, useState, useEffect, Children } from "react";

export const AuthContext = createContext()

const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState (true)
    const login = (userData, token) => {
        setLoading(true)
        localStorage.setItem ("token", token)
        localStorage.setItem("user", JSON.stringify(userData))
        setLoading(false)
        setUser(userData)
    }
    const logout = () => {
        setLoading(true)
        localStorage.removeItem ("token")
        localStorage.removeItem ("user")
        setLoading(false)
        setUser(null)
    }
    useEffect (()=> {
        setLoading(true)
        const token =localStorage.getItem("token")
        const storedUser = localStorage.getItem ("user")
        if(token && storedUser){
            setUser (JSON.parse(storedUser))
        }else{
            logout()
        }
        setLoading(false)
    },[])
    return (
        <AuthContext.Provider
        value={ {user, login, loading, logout, isAuthenticated: user !==null} }
        >
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContextProvider