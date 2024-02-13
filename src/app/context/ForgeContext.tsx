import * as React from "react"


type UserData = {
    _id:string,
    wallet: string,
    username: string,
    bio: string,
    pronouns: string,
    name: string,
    image: string,
    descriptor: string,
    nouns: string,
    mints: string
}

type ForgeContextType = {
    userData: UserData
    setUserData: (data: UserData) => void
    connected: boolean
    setConnected: (data: boolean) => void
  }

export const ForgeContext = React.createContext<ForgeContextType | null>(null)

export const ForgeProvider = (props: any) => {
  const [connected, setConnected] =  React.useState(false);
  const [userData, setUserData] = React.useState<UserData>({
    _id:"",
    wallet:"",
    username:"",
    bio:"",
    pronouns:"",
    name:"",
    image:"",
    descriptor:"",
    nouns:"",
    mints:"0"
  })

  const updateUserData = (data: UserData): void => {
    setUserData(data)
  }

  const updateConnection = (data: boolean): void => {
    setConnected(data)
  }

  const { children } = props
  return (
    <ForgeContext.Provider
      value={{
        connected,
        setConnected: updateConnection,
        userData,
        setUserData: updateUserData,
      }}
    >
      {children}
    </ForgeContext.Provider>
  )
}
