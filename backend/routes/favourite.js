const router = require("express").Router();
const User = require("../models/user");
const { authenticateToken } = require("./userAuth");


//add book to favourite


router.put("/add-book-favourite", authenticateToken, async (req, res) => {
    try {
        const { bookid , id } = req.headers;
     
        const userData = await User.findById(id);
        const isBookFavourite = userData.favourites.includes(bookid);
        if (isBookFavourite) {
            return res.status(200).json({ message: "Book is already in favourites" });
        }
        await User.findByIdAndUpdate(id, { $push: { favourites: bookid } });

        return res.status(200).json({ message: "Book added to favourites" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "An error occurred", error: error.message });
    }
});
//delete book from favourite


router.put("/remove-book-favourite", authenticateToken, async (req, res) => {
    try {
        const { bookid , id } = req.headers;
     
        const userData = await User.findById(id);
        const isBookFavourite = userData.favourites.includes(bookid);
        if (isBookFavourite) {
            await User.findByIdAndUpdate(id, { $pull: { favourites: bookid } });
        }
      

        return res.status(200).json({ message: "Book remove from favourites" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "An error occurred", error: error.message });
    }
});


// Get favourite books for a user

router.get("/get-favourite-books", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers; 

        const userData = await User.findById(id).populate("favourites");
        const favouriteBooks = userData.favourites;
        return res.json({
            status: "Success",
            data: favouriteBooks,
        });
         } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "An error occurred", error: error.message });
    }
});


module.exports = router;