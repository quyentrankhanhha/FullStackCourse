if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://fullstack:${password}@cluster0.dmdq0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String
});

const Phonebook = mongoose.model("Phonebook", phonebookSchema);

const phonebook = new Phonebook({
  name: "Anna",
  number: "040-1234556"
});

phonebook.save().then((result) => {
  console.log("contact saved!");
  mongoose.connection.close();
});
