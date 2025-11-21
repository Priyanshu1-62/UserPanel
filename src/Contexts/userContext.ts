import { createContext } from "react";
import type { userModel } from "../Models/user";

interface  userContextType {
    fetchUsers: () => Promise<userModel[]>;
    createUser: (data: userModel) => Promise<userModel>;
    updateUser: (data: userModel) => Promise<userModel>;
    deleteUser: (id: number) => Promise<void>;
    users: userModel[];
}

const userContext = createContext<userContextType | null>(null);

export default userContext;