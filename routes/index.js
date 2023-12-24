const router = require("express").Router();
const verifyToken = require('../middlewares/verifyToken')
const { IsAdmin, IsPelapor } = require('../middlewares/otorisasi')
const UserController = require('../controllers/UserController');
const LaporController = require("../controllers/LaporContoller");
const TindakanController = require("../controllers/TindakanController");
const LogsController = require("../controllers/LogsController");


router.post('/login', UserController.Login)
router.post('/logout', UserController.Logout)
router.post('/register', UserController.RegisterPelapor)
router.get('/pelapor', verifyToken, IsAdmin, UserController.GetPelapor)
router.put('/pelapor/:id', verifyToken, IsAdmin, UserController.UpdatePelapor)
router.delete('/pelapor/:id', verifyToken, IsAdmin, UserController.DeletePelapor)

//Laporan
router.post('/lapor', verifyToken, IsPelapor, LaporController.CreateLapor)
router.get('/lapor', verifyToken, LaporController.GetLapor)
router.get('/detail-laporan/:code', verifyToken, LaporController.DetailLaporan)

//Tindakan
router.post("/tindakan", verifyToken, IsAdmin, TindakanController.CreateTindakan);
router.get("/tindakan", verifyToken, IsAdmin, TindakanController.GetTindakan);
router.put("/tindakan/:id", verifyToken, IsAdmin, TindakanController.UpdateTindakan);
router.delete("/tindakan/:id", verifyToken, IsAdmin, TindakanController.DeleteTindakan);

//Logs
router.get("/logs", verifyToken, IsAdmin, LogsController.GetLogs);

module.exports = router;
