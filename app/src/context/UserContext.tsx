import { useRouter } from "next/router"
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react"
import { fetchWrapper } from "../helpers/fetch-wrapper"
import { useAcc } from "./AccountContext"

const baseUrl = `/api/user`

export type authContextType = {
  user: userData | null
  login: (username: string, password: string) => any
  logout: () => void
  register: (signupDetails: userRegister) => any
  currentUser: () => userData | undefined
}

export interface userData {
  username: string
  email: string
  id: number
}
interface userRegister {
  username: string
  email: string
  password1: string
  password2: string
}

const authContextDefaultValues: authContextType = {
  user: null,
  login: () => null,
  logout: () => {},
  register: () => null,
  currentUser: () => undefined,
}

const AuthContext = createContext<authContextType>(authContextDefaultValues)

export function useAuth() {
  return useContext(AuthContext)
}

/**
 * AuthProvider is the Auth Context across the application that can be accessed
 * from any level of the app.
 *
 * @export
 * @param {Props} { children }
 * @return {*}
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter()

  //This setstate holds the reference of the current logged in user
  const [user, setUser] = useState<authContextType["user"]>(null)
  const accountContext = useAcc()
  /**
   * This useEffect is triggered anytime the app loads
   * Which means for any reload it will check the localStorage cache to check,
   * if a user is currently logged in
   */
  useEffect(() => {
    const storageUser = localStorage.getItem("user")
    console.log("storageUser", storageUser)

    if (storageUser) {
      const loadedUser: userData = JSON.parse(storageUser)
      console.log("loadedUser", loadedUser)

      if (loadedUser && loadedUser != undefined) {
        setUser(loadedUser)
      }
    }
  }, [])

  /**
   * This useEffect is triggered anytime that the user state is changed
   * Which means if a user logs in then it will be cached into the webpage
   */
  useEffect(() => {
    if (user !== authContextDefaultValues.user) {
      localStorage.setItem("user", JSON.stringify(user))
    }
  }, [user])

  /**
   * Login function for the UserContext
   *
   * @param {string} username
   * @param {string} password
   * @return {*}
   */
  const login = async (username: string, password: string) => {
    const loggedUser = await fetchWrapper.post(`${baseUrl}/login`, {
      username,
      password,
    })

    if (loggedUser) {
      setUser(loggedUser)
      accountContext.getAccount(loggedUser.login_id)
    }

    return loggedUser
  }

  /**
   * Logout function for the user Context
   */
  const logout = () => {
    setUser(null)
    localStorage.setItem("user", JSON.stringify(null))
    router.push("/")
  }

  /**
   * Register function
   *
   * @param {userRegister} signupDetails
   * @return {*}
   */
  const register = async (signupDetails: userRegister) => {
    const JSONdata = JSON.stringify({
      username: signupDetails.username,
      email: signupDetails.email,
      password: signupDetails.password1,
    })
    console.log("JSONdata", JSONdata)

    const response = await fetchWrapper.post(`${baseUrl}/signup`, {
      JSONdata,
    })
    console.log("response", response)

    if (response) {
      router.push("/user/login")
      return true
    }

    return false
  }

  const currentUser = () => {
    if (user) {
      return user
    }
  }

  const value = {
    user,
    login,
    logout,
    register,
    currentUser,
  }

  return (
    <>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </>
  )
}
