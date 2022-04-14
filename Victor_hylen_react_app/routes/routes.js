const router = require('express').Router();
const Registration = require('../model/Registration');
const Course = require('../model/Course');
const User = require('../model/User');


// Get all users
router.get("/users", async (req, res) => {
    const posts = await User.find()
    res.send(posts)
    });


// Get all courses
router.get("/courses", async (req, res) => {
    const courses = await Course.find()
    res.send(courses)
    });


//get all registations
router.get("/registrations", async (req, res) => {
        const registrations = await Registration.find()
        res.send(registrations)
        });


//get user
router.get("/users/:id", async (req, res) => {
    try {
    const post = await User.findOne({ tag: req.params.id })
    
    res.send(post)
  
    res.status(201).send(({error: "succeded"}))
    } catch {
    res.status(409)
    res.send({ error: "User doesn't exist!" })
    }
    })



// Create a new user
router.post("/users", async (req, res) => {
    const TagExist = await User.findOne({ tag: req.body.tag})
    if (TagExist){
        return res.status(400).json({error: 'Tag already exists'});
    }
    const post = new User({
    tag: req.body.tag,
    name: req.body.name,
    email: req.body.email,
    date: req.body.date,
    })
    await post.save()
    res.send(post)
    })


// Create a new registration
router.post("/registrations", async (req, res) => {
    const regstud = await Registration.findOne({ tag: req.body.tag})
    if (regstud){
        return res.status(400).json({error: 'Registration have already been made for this student'});
    }
    const post = new Registration({
    tag: req.body.tag,
    name: req.body.name,
    coursecode: req.body.coursecode,
    date: req.body.date,
    })
    await post.save()
    res.send(post)
    })

    module.exports = router;


    // Create a new Course
router.post("/courses", async (req, res) => {
    const course = await Course.findOne({ id: req.body.id})
    if (course){
        return res.status(400).json({error: 'Course already exist'});
    }
    const post = new Course({
    id: req.body.id,
    name: req.body.name,
    code: req.body.code,

    })
    await post.save()
    res.send(post)
    })


 // get info about student && assigned students
 router.get("/info", async (req, res) => {
     const s = await User.find();
     students = s.map(s => s.tag)


     const r = await Registration.find();
     registations = r.map(r => r.tag + ":" + r.coursecode)
     

     //all courses
     const c = await Course.find();
     

     //declare course code
     s.course_code = c.map(c => c.code)



     //declare all courses that are registraded
     r.course_code = r.map(r => r.coursecode)


     for (let student of s) {
         for (let reg of r){
                //console.log(student.tag);
                //console.log(reg.tag);
                //all courses
                s.stud_id = s.map(s => s.tag)
                s.course_name = c.map(c => c.name)
                s.reg_id = r.map(r => r.tag)
                s.registation_time = r.map(r => r.date)
                const code = r.map(r => r.coursecode)

                if(student.tag == reg.tag){
                    student.course_code = code
                    student.registation_time = reg.date
                }
            }
        }

    

    
    const reg_code = [];
    const crc_name = [];
    const name = [];


    for (let i = 0; i < r.length; i++) {
        reg_code.push(r[i].coursecode);
    }

    for (let i = 0; i < c.length; i++) {
        crc_name.push({code: c[i].code, name: c[i].name});
    }

    for (let i = 0; i < reg_code.length; i++) {
        for (let j = 0; j < crc_name.length; j++) {
            if (reg_code[i] == crc_name[j].code) {
                name.push(crc_name[j].name); 
            }
        }
    }


    const data = []
     for(let i = 0; i< s.length; i++){     

         data.push
         ({
             student_id: s[i].tag,
             student_name: s[i].name,
             course_name: name[i],
             registation_time: s[i].registation_time
         });
     }

        res.send(data)
      

    });



    module.exports = router;



    

    