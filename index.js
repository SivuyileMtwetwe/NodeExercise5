import mysql from "mysql2/promise";
import express from "express"
import { config } from "dotenv";
config();

const PORT = process.env.PORT

const app = express()

app.listen(PORT,()=>{
    console.log('http://127.0.0.1:'+ PORT);
    })
    

const pool = mysql.createPool({
    host: process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE}
)


const getAllProducts = async ()=>{
    let [products] = await pool.query('SELECT * FROM products')
    return products
};

console.log(await getAllProducts());

const getAllUsers = async ()=>{
    let [users] = await pool.query('SELECT * FROM users')
    return users
};

console.log(await getAllUsers());

const getProduct = async (product_code)=>{
    let [product] = await pool.query('SELECT * FROM products WHERE product_code= ?',[product_code])
    return product
};

console.log(await getProduct());

const getUser = async (id)=>{
    let [user] = await pool.query('SELECT * FROM users WHERE id= ?',[id])
    return user
};

console.log(await getUser());

// const addProduct = async (product_code, first_name,last_name,email,phone_number,department,salary)=>{
//     await pool.query("INSERT INTO employees (product_code, first_name,last_name,email,phone_number,department,salary) VALUES (?,?,?,?,?,?)",[first_name,last_name,email,phone_number,department,salary])
//     return await getAllProducts()
// }


// console.log(await addEmployee("Sivuyile","Mtwetwe", "sivuyilemtwetwe@gmail.com", "082-6254-659","Cybersecurity",100000.00));



// const deleteEmployee = async (product_code)=>{
//     await pool.query("DELETE FROM pick_n_steal.employees WHERE product_code LIKE  ?",[product_code])
//     return await getAllEmployees()
// }


// console.log(await deleteEmployee(4));

// const updateEmployee = async (first_name,last_name,email,phone_number,department,salary,product_code)=>{
//     await pool.query("UPDATE employees SET first_name=?,last_name =?,email =?,phone_number =?,department =?,salary =? WHERE product_code = ?",[first_name,last_name,email,phone_number,department,salary,product_code])
//     return await getAllEmployees()
// }


// console.log(await updateEmployee("Jane","Doe","jane.doe@updated.com","444-666", "IT",90000.00,1));


