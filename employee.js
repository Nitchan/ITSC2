const express = require('express')
const router = express.Router()
const employees = require('../mock-employee') // ใช้งานข้อมูลจำลองจากไฟล์ mock-employee.js
 

router.route('/employees?')
    .get((req, res, next) => { // GET มาที่ path: "/employees" หรือ "/employee"
        // ส่งข้อมูลทั้งหมด กลับออกไปแสดง
        const result = { // รูปแบบผลลัพธ์ข้อมูลที่จะส่งกลับ
            "status":200,
            "data":employees
        }
        return res.json(result)  
    })
    .post((req, res, next) => {// POST มาที่ path: "/employees" หรือ "/employee"
        let employee = {
            "_id":employees.length+1, // เพิ่ม id จากค่าเดิมไปอีก 1
            "firstname":req.body.firstname, // ใช้ค่า firstname จากที่ส่งเข้ามา
            "lastname":req.body.lastname, // ใช้ค่า lastname จากที่ส่งเข้ามา
            "birthday":req.body.birthday, // ใช้ค่า birthday จากที่ส่งเข้ามา
            "email":req.body.email // ใช้ค่า email จากที่ส่งเข้ามา
        }
        employees.push(employee) // เพิ่มข้อมูลใหม่เข้าไปใน array employees
       const result = { // รูปแบบผลลัพธ์ข้อมูลที่จะส่งกลับ
            "status":200,
            "data":employee
        }
        return res.json(result)  
    })    
 
// กำหนด route แบบ chain และมี id params เพิ่มเข้ามา    
router.route('/employee/:id')
 
    .get((req, res, next) => {// GET มาที่ path: "/employee/:id" ใดๆ
        // ส่งข้อมูล employee ที่หาเจอ และได้มาจากฟังก์ชั่นก่อนหน้า ส่งออกไป
        const result = {
            "status":200,
            "data":res.employee
        }
        return res.json(result)
    })
    .put((req, res, next) => {// PUT มาที่ path: "/employee/:id" ใดๆ
        let employee = { // กำหนดข้อมูลที่จะอัพเดท
            "_id":res.employee.id, // อัพเดท id mี่ตรงกับค่า params.id
            "firstname":req.body.name, // ใช้ข้อมูลใหม่ที่ส่งเข้ามาสำหรับ firstname
            "lastname":req.body.name, // ใช้ข้อมูลใหม่ที่ส่งเข้ามาสำหรับ lastname
            "birthday":req.body.name, // ใช้ข้อมูลใหม่ที่ส่งเข้ามาสำหรับ birthday
            "email":req.body.email // ใช้ข้อมูลใหม่ที่ส่งเข้ามาสำหรับ email
        }
        // ส่งข้อมูลที่ได้อัพเดทเรียบร้อยแล้ว กลับออกไป
        const result = {
            "status":200,
            "data":employee
        }
        return res.json(result)        
    })
    .delete((req, res, next) => {// DELETE มาที่ path: "/employee/:id" ใดๆ
        // จำลองการลบข้อมูล ในที่นี้ ให้แสดงเฉพาะข้อมูลที่เหลืออยู่ หรือก็คือ ข้อมูลที่ไม่่ตรงกับ params.id ที่ส่งมา
        let employee = employee.filter( (employee) => employee.id !== parseInt(req.params.id))
        const result = {
            "status":200,
            "data":employee
        }
        return res.json(result)
    })            
 
module.exports = router
