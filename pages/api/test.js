export default (req, res) => {
  res.statusCode = 200
  res.json({ name: process.env.HELLO_NO })
}
