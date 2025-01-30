import mysql from "mysql2/promise";
import express from "express"
import { config } from "dotenv";
config();

const PORT = process.env.PORT

const pool = mysql.createPool({
    host: process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE}
)
const app = express()
app.use(express.json())


app.get('/products', async (req,res)=>{
    res.json({products: await getAllProducts()})
})

app.get('/users', async (req,res)=>{
    res.json({users: await getAllUsers()})
})

app.post('/products', async(req,res)=>{
    console.log( req.body);


    let {product_code,product_name,product_price,product_quantity} = req.body
    
    res.json({product: await addProduct(product_code,product_name,product_price,product_quantity)})
})

app.post('/users', async(req,res)=>{
    console.log( req.body);
    
    
    let {email,first_name,last_name,password} = req.body
    
    res.json({product: await addUser(email,first_name,last_name,password)})
})

app.delete("/products/:product_code", async (req, res) => {
    
    res.json({ products: await deleteProduct(req.params.product_code) })
    
});

app.delete("/users/:id", async (req, res) => {
    
    res.json({ user: await deleteUser(req.params.id) })
    
});

app.delete("/products", async (req,res)=>{
    
    res.json({products: await deleteAllProducts()})
})

app.delete("/users", async (req,res)=>{
    
    res.json({products: await deleteAllUsers()})
})


app.patch('/products/:product_code', async (req, res) => {
        const { product_name, product_price, product_quantity } = req.body;
        const { product_code } = req.params;

        res.json({ products:await updateProduct(product_name,product_price,product_quantity,product_code) });
});

app.patch('/users/:id', async (req, res) => {
        const { email,first_name,last_name,password} = req.body;
        const { id } = req.params;

        res.json({ products:await updateUser(email,first_name,last_name,password,id) });
});



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

const addProduct = async (product_code,product_name,product_price,product_quantity)=>{
    await pool.query("INSERT INTO products (product_code,product_name,product_price,product_quantity) VALUES (?,?,?,?)",[product_code,product_name,product_price,product_quantity])
    return await getAllProducts()
}

// console.log(await addProduct("amas1", "Amasi Full Cream", 35.99, 19));

const addUser = async (email,first_name,last_name,password)=>{
    await pool.query('INSERT INTO users (email,first_name,last_name,password) VALUES (?,?,?, ?);',[email,first_name,last_name,password])
    return await getAllUsers()
}

// console.log(await addUser("khanyiso@lifechoices.co.za","khanyiso","haman", "khanyisohaman"));

const deleteAllProducts = async ()=>{
    await pool.query("TRUNCATE TABLE products")
}
// console.log(await deleteAllProducts());

const deleteAllUsers = async ()=>{
    await pool.query("TRUNCATE TABLE users")
    return await getAllUsers()
}
// console.log(await deleteAllUsers());

const deleteProduct = async (product_code)=>{
    await pool.query("DELETE FROM products WHERE product_code LIKE  ?",[product_code])
    return await getAllProducts()
}
// console.log(await deleteProduct("hscc1"));

const deleteUser = async (id)=>{
    await pool.query("DELETE FROM users WHERE id LIKE  ?",[id])
    return await getAllUsers()
}

// console.log(await deleteUser(1));

const updateProduct = async (product_name,product_price,product_quantity,product_code)=>{
    await pool.query("UPDATE products SET product_name=?,product_price =?,product_quantity =? WHERE product_code = ?",[product_name,product_price,product_quantity,product_code])
    return await getAllProducts()
}

// console.log(await updateProduct("Sunlight Liquid", 25.99, 80,"slhs1"));



const updateUser = async (email,first_name,last_name,password,id)=>{
    await pool.query("UPDATE users SET email=?,first_name =?,last_name =?, password=? WHERE id = ?",[email,first_name,last_name,password,id])
    return await getAllUsers()
}

// console.log(await updateUser("mtwetwe@gmail.com", "Sivuyile", "Mtwetwe","MaybeShouldBeclearText123!",2));



app.listen(PORT,()=>{
    console.log('http://127.0.0.1:'+ PORT);
    })
    