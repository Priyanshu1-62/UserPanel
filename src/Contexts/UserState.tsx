import { useState, useContext } from 'react';
import userContext from './userContext';
import alertContext from './alertContext';
import type { PropsWithChildren } from 'react';
import type { userModel } from '../Models/user';

function UserState(props: PropsWithChildren) {
  //Dummy variables for return on failure
  const demoUser: userModel = {id: -1, userId: -1, title: "", body: ""};
  const demoUserArr: userModel[] = [];

  const [users, setUsers] = useState(demoUserArr);

  //Add '!' to command TS that alertContext is never NULL
  const { handleAlert } = useContext(alertContext)!;

  // Fetch Users
  async function fetchUsers(): Promise<userModel[]> {
    try {
        let response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: "GET"
        });
        if(response.ok){
            let res: userModel[]=await response.json();
            setUsers(res);
            handleAlert({color: "green", msg: "Users data fetched successfully !"});
            return res;
        }
        else{
          handleAlert({color: "red", msg: "Failed to fetch user data"});
          return demoUserArr;
        }
    } 
    catch (error) {
        handleAlert({color: "red", msg: "Failed to fetch user data"});
        return demoUserArr;
    }
  }

  //Create a User
  async function createUser(data: userModel): Promise<userModel> {
    try {
      const response =await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
          title: data.title,
          body: data.body,
          userId: data.userId,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      if(response.ok){
        let res: userModel=await response.json();
        handleAlert({color: "green", msg: "User created successfully !"});
        return res;
      }
      else{
        handleAlert({color: "red", msg: "Failed to create the user !"});
        return demoUser;
      }
    } 
    catch (error) {
      handleAlert({color: "red", msg: "Failed to create the user !"});
      return demoUser;
    }
  }

  //Update user
  async function updateUser(data: userModel): Promise<userModel> {
    try {
      let response = await fetch(`https://jsonplaceholder.typicode.com/posts/${data.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          id: 1,
          title: data.title,
          body: data.body,
          userId: data.userId,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      if(response.ok){
        let res: userModel=await response.json();
        handleAlert({color: "green", msg: "User updated successfully !"});
        return res;
      }
      else{
        handleAlert({color: "red", msg: "Failed to update the user !"});
        return demoUser;
      }
    } 
    catch (error) {
      handleAlert({color: "red", msg: "Failed to update the user !"});
      return demoUser;
    }
  }

  //Delete user
  async function deleteUser(id: number): Promise<void> {
    try {
      let response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE',
      });
      if(response.ok){
        handleAlert({color: "green", msg: "User deleted successfully !"});
      }
      else{
        handleAlert({color: "red", msg: "Failed to delete the user !"});
      }
    } 
    catch (error) {
      handleAlert({color: "red", msg: "Failed to delete the user !"});
    }
  }
  return (
    <userContext.Provider value={{fetchUsers, createUser, updateUser, deleteUser, users}}>
        {props.children}
    </userContext.Provider>
  )
}

export default UserState