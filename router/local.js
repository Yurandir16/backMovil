import { Router } from "express";
import { getLocal } from "../model/Local.js";
import multer from 'multer';
import fs from 'fs';
import {fileURLToPath} from 'url';
import path from "path";

const router = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './assets/image')
    },
    filename: (req, file, cb) => {
        const ext = file.originalname.split('.').pop()
        console.log(file.originalname)
        cb(null, `${file.originalname}`)
    }
})

const upload = multer({ storage })

router.post('/upload_local', upload.single('imagen'), async function (req, res) {
    const { namelocal, genero, descripcion, menu } = req.body;

    getLocal.create({
        namelocal: namelocal,
        imagen: req.file.originalname,
        genero: genero,
        descripcion: descripcion,
        menu: menu
    })
        .then(img => {
            res.send(img)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send('Error creating local')
        });
});

router.get('/get_all_local', async function (req, res) {
    getLocal.findAll({ exclude: [] })
        .then(img => {
            res.send(img)
        })
        .catch(err => {
            console.log(err)
        })
});

router.get('/view_img', async function (req, res){
  let img1 = req.query.img1;
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  let reqP = path.join(__dirname, "../")
  console.log("data"+reqP)
  let img =reqP+`\\assets\\image\\${img1}`;

  fs.access(img, fs.constants.F_OK, err => {
      console.log(`${img} ${err ? "no existe" : "existe"} `)
  });

  fs.readFile(img, function(err,data){
      if(err){
          res.writeHead(404, {'Content-Type' : 'text/plane'});
          return res.end('404 not found')
      }else{
          res.writeHead(200, {'Content-Type' : 'image/jpeg'});
          res.write(data);
          return res.end();
      }
  })
})

router.put('/update_local/:id', upload.single('imagen'), async function (req, res) {
    const { namelocal, genero, descripcion, menu } = req.body;
    const { id } = req.body;
  
    getLocal.findByPk(id)
      .then(local => {
        if (!local) {
          return res.status(404).send('Local not found');
        }
  
        local.update({
          namelocal: namelocal || local.namelocal,
          imagen: req.file ? req.file.originalname : local.imagen,
          genero: genero || local.genero,
          descripcion: descripcion || local.descripcion,
          menu: menu || local.menu
        })
          .then(updatedLocal => {
            res.send(updatedLocal);
          })
          .catch(err => {
            console.log(err);
            res.status(500).send('Error updating local');
          });
      })
      .catch(err => {
        console.log(err);
        res.status(500).send('Error updating local');
      });
  });
  

export default router;