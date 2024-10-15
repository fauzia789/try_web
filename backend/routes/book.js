const router = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const Book = require("../models/book");
const { authenticateToken } = require("./userAuth");

// Add book -- admin
router.post("/add-book", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const user = await User.findById(id);
        if (user.role !== "admin") {
            return res.status(400).json({ message: "You are not authorized to perform admin work" });
        }

        // Check if ISBN is provided and unique
        if (!req.body.ISBN) {
            return res.status(400).json({ message: "ISBN is required" });
        }
        
        const existingBook = await Book.findOne({ ISBN: req.body.ISBN });
        if (existingBook) {
            return res.status(400).json({ message: "A book with this ISBN already exists" });
        }

        const book = new Book({
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language,
            ISBN: req.body.ISBN // Ensure ISBN is included
        });
        await book.save();
        res.status(200).json({ message: "Book added successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

// Update book -- admin
router.put("/update-book", authenticateToken, async (req, res) => {
    try {
        const { bookid } = req.headers;

        if (!bookid) {
            return res.status(400).json({ message: "Book ID is required" });
        }

        const book = await Book.findById(bookid);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        if (req.body.ISBN && req.body.ISBN !== book.ISBN) {
            const existingBook = await Book.findOne({ ISBN: req.body.ISBN });
            if (existingBook) {
                return res.status(400).json({ message: "A book with this ISBN already exists" });
            }
        }

        await Book.findByIdAndUpdate(bookid, {
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language,
            ISBN: req.body.ISBN // Ensure ISBN is included
        });

        return res.status(200).json({ message: "Book updated successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});
// delete book --admin
router.delete("/delete-book", authenticateToken, async (req, res) => {
try{
    const {bookid}= req.headers;
    await Book.findByIdAndDelete(bookid);
    return res.status(200).json({
        message: "Book deleted successfully!",
    });

}catch(error){
    console.log(error);
    return res.status(500).json({message: " An error occurred"});
}
});

// get all books
router.get("/get-all-books", async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 });
        return res.json({
            status: "Success",
            data: books,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "An error occurred" });
    }
});
// get recently added book limit 4
router.get("/get-recently-added-books", async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 }).limit(4);
        return res.json({
            status: "Success",
            data: books, 
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "An error occurred" });
    }
});

// Get book by id
router.get("/get-book-by-id/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        return res.json({
            status: "Success",
            data: book
        });
       
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "An error occurred", error: error.message });
    }
});


module.exports = router;
