import express from 'express'
import authRoutes from './routes/authRoutes.js'
import profileRoutes from './routes/profileRoutes.js'
import usersRoutes from './routes/usersRoutes.js'
import users from './MOCK_DATA.json' assert  {type: 'json'};
import fs from 'fs';


const app = express();
const PORT = 8000;

//  Middleware
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.status(200).send('Welcome');
});

app.get('/usersname', (req, res) => {
    const html = `<ul>
    ${users.map((users) =>
        `<li>${users.first_name}</li>`).join("")}
        </ul>`;
    res.send(html);
});

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/users', usersRoutes);
app.post('/api/edit', (req, res) => {
    const body = req.body;
    users.push({ ...body, id: users.length + 1 });
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        return res.status(200).json({
            status: 'Success', id: users.length
        });
    });
});

app.use(express.json());

app.delete('/api/delete/:id', (req, res) => {
    const idToDelete = Number(req.params.id);
    fs.readFile('./MOCK_DATA.json', 'utf8', (err, data) => {
      if (err) {
        res.status(500).send("Error reading the file");
        return;
      }
  
      try {
        // Parse the JSON data into an array
        const jsonData = JSON.parse(data);
  
        // Find the index of the entry to delete based on the ID
        const indexToDelete = jsonData.findIndex(entry => entry.id === idToDelete);
  
        if (indexToDelete === -1) {
          res.status(404).send("Entry not found");
          return;
        }
  
        // Remove the entry from the array
        jsonData.splice(indexToDelete, 1);
  
        // Write the updated data back to the file
        fs.writeFile('./MOCK_DATA.json', JSON.stringify(jsonData, null, 2), (err) => {
          if (err) {
            res.status(500).send("Error writing to the file");
          } else {
            res.status(200).send("The user has been deleted");
          }
        });
      } catch (parseError) {
        res.status(500).send("Error parsing JSON data");
      }
    });
  });

app.use((req, res, next) => {
    res.status(404).send('OOPs! there is no such API');
});

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
});