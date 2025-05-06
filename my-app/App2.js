import { useState, createContext , } from "react";
 
  import Cont from "./components/Cont";

   export const UserContext = createContext();


function Component1() {
 
  const [user, setUser] = useState("Jesse Hall");

  return (
    
    <UserContext.Provider value={user}>
      <h1>{`Hello ${user}!`}</h1>
      <Cont/>
    </UserContext.Provider>
  );
}

export default Component1