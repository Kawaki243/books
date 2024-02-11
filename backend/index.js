import express from "express";
import mysql from "mysql2";
import cors from "cors";
import dotenv from "dotenv";


dotenv.config();
const app = express();

//host:"localhost",user:"root",
//port:"3306",
//password:"Dangcapmaimai123",
//database:"tranpham"
//{
      
//}
const db = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
});


app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
      res.json("Hello this is a backend!");
});

app.get("/books",(req,res)=>{
      const q = "SELECT * FROM books";
      db.query(q,(err,data)=>{
            if(err) return res.send(500).json(err);
            return res.json(data);
      })
})

app.post("/books",(req,res)=>{
      const q = "INSERT INTO books(`title`,`de`,`price`,`cover`) VALUES (?)";
      const values = [
            req.body.title,
            req.body.desc,
            req.body.price,
            req.body.cover
      ];
      db.query(q,[values],(err,data)=>{
            if(err) return res.json(err);
            return res.json(data);
      })
});

app.delete("/books/:id",(req,res)=>{
      const bookId = req.params.id;
      const q = "DELETE FROM books WHERE id = ?";
      db.query(q,[bookId],(err,data)=>{
            if(err) return res.json(err);
            return res.json("Book has been deleted successfully");
      });
});

app.put("/books/:id",(req,res)=>{
      const bookId = req.params.id;
      const q = "UPDATE books SET `title = ?`, `de = ?`, `price = ?`, `cover = ?` WHERE id = ?";
      const values = [
            req.body.title,
            req.body.desc,
            req.body.price,
            req.body.cover
      ];

      db.query(q,[...values,bookId],(err,data)=>{
            if(err) return res.json(err);
            return res.json("Book has been updated successfully");
      });
})
const PORT = 8000;

app.listen(process.env.PORT || PORT,()=>{  // do not add localhost here if you are deploying it
      console.log(`server listening to port ${PORT}`);
});