const { Marking } = require('../models')
const axios = require('axios')

class quranController {
    static async home(req, res, next) {
        try {
            const response = await axios.get(`https://api.quran.com/api/v4/chapters`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            res.status(200).json(response.data)
        } catch (err) {
            next(err)
        }
    }

    static async detail(req, res) {
        try {
            const { id } = req.params
            const response = await axios.get(`https://api.quran.com/api/v4/quran/verses/uthmani`, {
                params: { chapter_number: id },
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            res.status(200).json(response.data)
        } catch (err) {
            next(err)
        }
    }

    static async sounds(req, res, next) {
        try {
            const { id } = req.params
            const response = await axios.get(`https://api.quran.com/api/v4/chapter_recitations/2/${id}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            res.status(200).json(response.data)
        } catch (err) {
            console.log(err);
            next(err)
        }
    }

    static async addQuran(req, res, next) {
        try {
            const UserId = req.user.id
            const SurahId = req.params.id

            const user = await Marking.findOne({
                where: {
                    UserId
                }
            })

            if (user) throw { name: 'You already added surah to last read' }

            await Marking.create({
                UserId, SurahId
            })

            res.status(201).json({ message: 'Surah success added to last read' })
        } catch (err) {
            next(err)
        }
    }

    static async getQuran(req, res, next) {
        try {
            const UserId = req.user.id
            const data = await Marking.findOne({
                where: { UserId }
            })
            res.status(200).json({ data })
        } catch (err) {
            next(err)
        }
    }

    static async removeQuran(req, res, next) {
        try {
            const UserId = req.user.id

            const user = await Marking.findOne({
                where: {
                    UserId
                }
            })
            if (!user) throw { name: 'Surah not found in your last read' }

            await Marking.destroy({
                where: {
                    UserId
                }
            })

            res.status(200).json({ message: 'Surah success to removed' })
        } catch (err) {
            next(err)
        }
    }

    static async infoSurah(req, res, next) {
        try {
            const UserId = req.user.id

            const data = await Marking.findOne({
                where: {
                    UserId
                }
            })

            if (!data) throw { name: 'NotFound'}

            const response = await axios.get(`https://api.quran.com/api/v4/chapters/${data.SurahId}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            res.status(200).json(response.data)
        } catch (err) {
            console.log(err);
            next(err)
        }
    }
}

module.exports = quranController