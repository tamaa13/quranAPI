const errorHandle = (err, req, res, next) => {

    if (err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") return res.status(400).json({ message: err.errors[0].message })
    if (err.name === "Invalid email or password") return res.status(401).json({ message: 'Invalid email or password' })
    if (err.name === "NotFound") return res.status(404).json({ message: 'NotFound' })
    if (err.name === 'You already added surah to last read') return res.status(301).json({ message: 'You already added surah to last read' })
    if (err.name === 'Surah not found in your last read') return res.status(404).json({ message: 'Surah not found in your last read' })
    if (err.name === 'Email is required') return res.status(400).json({ message: 'Email is required' })
    if (err.name === 'Password is required') return res.status(400).json({ message: 'Password is required' })
    res.status(500).json({ message: 'Internal Server Error' })

}

module.exports = errorHandle