import { useState, useContext } from 'react';
import userContext from './userContext';
import alertContext from './alertContext';
import type { PropsWithChildren } from 'react';
import type { userModel } from '../Models/user';

function UserState(props: PropsWithChildren) {
  //Dummy variables for return on failure
  const demoUser: userModel = {id: -1, name: "", username: "", email: "", phone: "", website: ""};
  const demoUserArr: userModel[] = [];

  const [users, setUsers] = useState(demoUserArr);
  const [loading, setLoading] = useState(false);

  //Add '!' to command TS that alertContext is never NULL
  const { handleAlert } = useContext(alertContext)!;

  // Fetch Users
  async function fetchUsers(): Promise<userModel[]> {
    try {
        let response = await fetch('https://jsonplaceholder.typicode.com/users', {
            method: "GET"
        });
        if(response.ok){
            let res: userModel[]=await response.json();
            setUsers(res);
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

  // Fetch User
  async function fetchUser(id: number): Promise<userModel> {
    try {
        let response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
            method: "GET"
        });
        if(response.ok){
            let res: userModel=await response.json();
            // handleAlert({color: "green", msg: "Users data fetched successfully !"});
            return res;
        }
        else{
          handleAlert({color: "red", msg: "Failed to fetch user data"});
          return demoUser;
        }
    } 
    catch (error) {
        handleAlert({color: "red", msg: "Failed to fetch user data"});
        return demoUser;
    }
  }

  //Create a User
  async function createUser(data: userModel): Promise<userModel> {
    try {
      const response =await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        body: JSON.stringify({
          id: data.id,
          name: data.name,
          username: data.username,
          email: data.email,
          phone: data.phone, 
          website: data.website
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
      let response = await fetch(`https://jsonplaceholder.typicode.com/users/${data.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          id: data.id,
          name: data.name,
          username: data.username,
          email: data.email,
          phone: data.phone, 
          website: data.website
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
      let response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
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
    <userContext.Provider value={{fetchUsers, fetchUser, createUser, updateUser, deleteUser, users, setUsers, loading, setLoading}}>
        {props.children}
    </userContext.Provider>
  )
}

export default UserState