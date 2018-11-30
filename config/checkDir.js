import fs from 'fs';

// let articles_path = './articles';
let uploads_path = './uploads';
let public_path = './public';
let mp3_path = './public/mp3';
let pic_path = './public/pic';

//创建需要的文件夹

try {
  
  if(!fs.existsSync(public_path)){
    fs.mkdir(public_path, function (err) {
      if (err) throw err
    });
  }

  if (!fs.existsSync(uploads_path)) {
    fs.mkdir(uploads_path, function (err) {
      if (err) throw err
    })
  }

  if (!fs.existsSync(mp3_path)) {
    fs.mkdir(mp3_path, function (err) {
      if (err) throw err
    })
  }

  if (!fs.existsSync(pic_path)) {
    fs.mkdir(pic_path, function (err) {
      if (err) throw err
    })
  }
  
} catch (error) {
  console.log(error);
  
  
}
