const express = require('express')
const app = express()
const sqlite3 = require('sqlite3')
const path = require('path')
const bodyParser = require('body-parser')

const dbPath = "app/db/database.sqlite3"

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')))

// Hello API
app.get('/api/v1/hello', (req, res) => {
  res.json({"message": "Hello World!"})
})

// Get all users
app.get('/api/v1/users', (req, res) => {
  const db = new sqlite3.Database(dbPath)

  db.all('SELECT * FROM users', (err, rows) => {
    res.json(rows)
  })

  db.close()
})

// Get a user
app.get('/api/v1/users/:id', (req, res) => {
  const db = new sqlite3.Database(dbPath)
  const id = req.params.id

  db.get(`SELECT * FROM users WHERE id = ${id}`, (err, row) => {
    res.json(row)
  })

  db.close()
})

// Search users
app.get('/api/v1/search', (req, res) => {
  const db = new sqlite3.Database(dbPath)
  const keyword = req.query.q

  db.all(`SELECT * FROM users WHERE name LIKE "%${keyword}%"`, (err, rows) => {
    res.json(rows)
  })

  db.close()
})

// Create a new user
app.post('/api/v1/users', async (req, res) => {
  const db = new sqlite3.Database(dbPath)

  const name = req.body.name
  const profile = req.body.profile ? req.body.profile : ""
  const dateOfBirth = req.body.date_of_birth ? req.body.date_of_birth : ""

  await run(`INSERT INTO users (name, profile, date_of_birth) VALUES ("${name}", "${profile}", "${dateOfBirth}")`,
            db,
            res,
            "Create Success!"
            )

  db.close()
})

// Update user
app.put('/api/v1/users/:id', async (req, res) => {
  const db = new sqlite3.Database(dbPath)

  const id = req.params.id

  db.get(`SELECT * FROM users WHERE id = ${id}`, async (err, row) => {
    const name = req.body.name ? req.body.name : row.name
    const profile = req.body.profile ? req.body.profile : row.profile
    const dateOfBirth = req.body.date_of_birth ? req.body.date_of_birth : row.date_of_birth

    console.log(`UPDATE users SET name="${name}", profile="${profile}", date_of_birth="${dateOfBirth}" WHERE id=${id}`)
    await run(`UPDATE users SET name="${name}", profile="${profile}", date_of_birth="${dateOfBirth}" WHERE id=${id}`,
              db,
              res,
              "Update Success!"
    )
  })

  db.close()
})

// Delete user
app.delete('/api/v1/users/:id', async (req, res) => {
  const db = new sqlite3.Database(dbPath)
  const id = req.params.id

    await run(`DELETE FROM users WHERE id=${id}`,
              db,
              res,
              "Delete Success!"
    )

  db.close()
})


const run = async(sql, db, res, message) => {
  return new Promise((resolve, reject) => {
    db.run(sql, (err) => {
      if (err) {
        res.status(500).send(err)
        return reject()
      } else {
        res.json({message: message})
        return resolve()
      }
    })
  })
}

const port = process.env.PORT || 3000;
app.listen(port)
console.log("Listen on port:" + port)