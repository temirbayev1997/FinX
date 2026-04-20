const router =
 require("express").Router();

const {
 getClients,
 createClient,
 deleteClient
} = require("../services/clients.service");

router.get("/", async (req,res)=>{
 res.json(await getClients());
});

router.post("/", async (req,res)=>{
 res.json(await createClient(req.body));
});

router.delete("/:id", async (req,res)=>{
 await deleteClient(req.params.id);
 res.json({success:true});
});

module.exports = router;