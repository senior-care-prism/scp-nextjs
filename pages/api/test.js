export default (req, res) => {
  res.statusCode = 200
  console.log(res)
  res.json({ name: process.env.HELLO_NO
   })
}
