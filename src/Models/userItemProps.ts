import type { userModel } from "./user";

export interface userItemProps {
    user: userModel;
    handleNavigateUser: (element: userModel) => void;
}