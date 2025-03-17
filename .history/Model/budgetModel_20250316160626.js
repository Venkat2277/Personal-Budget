const mongoose = require('mongoose');

// Custom validator for color (must be at least 6-digit hexadecimal)
const hexColorRegex = /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/;

const budgetSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  color: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return hexColorRegex.test(v);
      },
      message: props => `${props.value} is not a valid hex color!`
    }
  }
});

module.exports = mongoose.model('Budget', budgetSchema);
