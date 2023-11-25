const Express = require('express')
const pool = require('../database')

const contractRouter = Express.Router()

contractRouter.get('/', async (req, res) => {

    const [row] = await pool.query('SELECT * FROM contracts')

    console.log(row)

    //res.send('los contratos van aqui')
    res.render('contract/contract', { contracts: row })
})


contractRouter.get('/add', (req, res) => {

    res.render('contract/add')
})

contractRouter.post('/add', async (req, res) => {

    const { title, contract, description } = req.body
    const newConstract = {
        title,
        contract,
        description
    }

    await pool.query('INSERT INTO contracts set ?', [newConstract])
    console.log(newConstract)
    res.redirect('/contract')
})

contractRouter.get('/delete/:id', async (req, res) => {

    console.log(req.params.id)
    const { id } = req.params

    const row = await pool.query('DELETE FROM contracts WHERE id = ?', [id])

    res.redirect('/contract')
})

contractRouter.get('/edit/:id', async (req, res) => {

    const { id } = req.params

    const contracts = await pool.query('SELECT * FROM contracts WHERE id = ?', [id])

    console.log(contracts[0])

    //res.send('los contratos van aqui')
    res.render('contract/edit', { contracts: contracts[0] })
})


contractRouter.put('/edit/:id', async (req, res) => {

    const { id } = req.params;
    const { title, description, contract } = req.body;
    const editedContract = {
        title,
        description,
        contract,
    };

    await pool.query("UPDATE contracts set ? WHERE id = ?", [editedContract, id]);

    res.redirect('/contract');
})



module.exports = contractRouter 