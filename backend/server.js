const express = require("express");

const mysql = require("mysql2");

const cors = require("cors");

const bodyParser = require("body-parser");

const app = express();

/* =========================================
MIDDLEWARE
========================================= */

app.use(cors());

app.use(bodyParser.json());

/* =========================================
MYSQL CONNECTION
========================================= */

const db = mysql.createConnection({
  host: "localhost",

  port: 3307,

  user: "root",

  password: "",

  database: "arshith_internships",
});

/* =========================================
CONNECT DATABASE
========================================= */

db.connect((err) => {
  if (err) {
    console.log("DATABASE ERROR:");

    console.log(err);
  } else {
    console.log("MySQL Connected Successfully");
  }
});

/* =========================================
SAVE INTERNSHIP FORM
========================================= */

app.post("/apply", (req, res) => {
  const {
    full_name,

    email,

    phone,

    education,

    college_name,

    internship_domain,
  } = req.body;

  /* =========================================
  SAVE INTO FIRST DATABASE
  ========================================= */

  const sql1 = `
  
    INSERT INTO internship_applications
    (
      full_name,
      email,
      phone,
      education,
      college_name,
      internship_domain
    )

    VALUES (?, ?, ?, ?, ?, ?)

  `;

  db.query(
    sql1,

    [full_name, email, phone, education, college_name, internship_domain],

    (err, result) => {
      if (err) {
        console.log(err);

        res.send("Main Database Error");
      } else {
        /* =========================================
        REFRESH SECOND DATABASE TABLE
        ========================================= */

        const deleteQuery = `
        
          DELETE FROM internship_groups.domain_groups
        
        `;

        db.query(deleteQuery, (err, result) => {
          if (err) {
            console.log(err);

            res.send("Delete Error");
          } else {
            const insertQuery = `

              INSERT INTO internship_groups.domain_groups
              (
                  student_name,
                  email,
                  phone,
                  internship_domain,
                  total_students_in_domain
              )

              SELECT

              full_name,

              email,

              phone,

              internship_domain,

              (
                  SELECT COUNT(*)

                  FROM arshith_internships.internship_applications b

                  WHERE b.internship_domain =
                  a.internship_domain
              )

              FROM arshith_internships.internship_applications a

              ORDER BY internship_domain;

            `;

            db.query(insertQuery, (err, result) => {
              if (err) {
                console.log(err);

                res.send("Insert Error");
              } else {
                res.send("Application Submitted Successfully");
              }
            });
          }
        });
      }
    },
  );
});

/* =========================================
SERVER
========================================= */

app.listen(5000, () => {
  console.log("Server Running On Port 5000");
});
