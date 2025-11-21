import { createContext } from "react";
import type { userModel } from "../Models/user";

//Define TS interface for User context
interface  userContextType {
    fetchUsers: () => Promise<userModel[]>;
    fetchUser: (id: number) => Promise<userModel>;
    createUser: (data: userModel) => Promise<userModel>;
    updateUser: (data: userModel) => Promise<userModel>;
    deleteUser: (id: number) => Promise<void>;
    users: userModel[];
    setUsers: React.Dispatch<React.SetStateAction<userModel[]>>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

//Declare User context
const userContext = createContext<userContextType | null>(null);

export default userContext;