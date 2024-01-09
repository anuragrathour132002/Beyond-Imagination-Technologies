import React, { useState } from "react";

import UserContext from "./userContext";

const userContexProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default userContexProvider;
