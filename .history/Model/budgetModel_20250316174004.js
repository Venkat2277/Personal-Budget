const mongoose = require("mongoose");
 
 const budgetSchema = new mongoose.Schema({
     title: { type: String, required: true },
     value: { type: Number, required: true },
     color: { 
         type: String, 
         required: true,
         match: /^#[0-9A-Fa-f]{6}$/
     }
 });
 
 const Budget = mongoose.model("Budget", budgetSchema);
 
 module.exports = Budget;