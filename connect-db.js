const mongoose = require("mongoose");

const dataConnect = async () => {
  try {
    const connect = await mongoose.connect(process.env.URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("success");
  } catch (error) {
    console.log("error", error.message);
  }
};


module.exports = dataConnect;


/* const mongoose = require("mongoose");

const dataConnect = async () => {
  try {
    const connect = await mongoose.connect(process.env.URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("success");
  } catch (error) {
    console.log("error", error.message);
  }
};

module.exports = dataConnect; */