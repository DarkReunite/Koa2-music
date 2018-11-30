import fs from 'fs';
import mp3Model from '../../models/mp3';

let mp3_path = './public/mp3/';
let pic_path = './public/pic/';

class Admin {
  constructor(){
    this.pageSize = 10; //一页显示多少篇
    this.getTotalPage = this.getTotalPage.bind(this);
    this.getMp3List = this.getMp3List.bind(this);
  }

  async receiveFile(ctx) {
    // 获取前端传过来的文件
    //1. 查询数据库中是否存在该歌曲
    //2. 如果不存在则返回错误
    //3. 如果存在则移动文件到对应的文件夹，并更新数据库的信息
    let mp3file = ctx.request.files.mp3file;
    let mp3pic = ctx.request.files.mp3pic;
    let id = ctx.request.body.id;
    
    try {
      let isExist = await mp3Model.findById({_id:id})

      if (!isExist) {
        ctx.body = {
          status: 0,
          message: '歌曲信息未存储'
        }

        //删除歌曲文件的缓存文件
        fs.unlink(mp3file.path, function (err) {
          if (err) throw err;
        })
        
        //删除歌曲文件的缓存文件
        fs.unlink(mp3pic.path, function (err) {
          if (err) throw err;
        })
        return;
      }

      //使用id + type合成文件名称
      let newMp3Name = (function () {
        let typeReg = /\/(.*)$/;
        let type = mp3file.type.match(typeReg)[1];
        return (id + '.' + type)
      })()

      //移动歌曲文件和歌曲图片得到对应文件夹
      fs.rename(mp3file.path, mp3_path + newMp3Name, function (err) {
        if (err) throw err;
      });

      let updateSaveAt = await mp3Model.findByIdAndUpdate({_id:id}, {
        saveAt: 'mp3/' + newMp3Name
      })

      //如果图片存在
      if (mp3pic) {
        //使用id + type 合成歌曲图片名称
        let newPicName = (function () {
          let typeReg = /\/(.*)$/;
          let type = mp3pic.type.match(typeReg)[1];
          return (id + '.' + type)
        })()

        fs.rename(mp3pic.path, pic_path + newPicName, function (err) {
          if (err) throw err;
        })

        let updatePic = await mp3Model.findByIdAndUpdate({_id:id}, {
          picture: 'pic/' + newPicName
        })
        
      }


      ctx.body = {
        status: 1,
        message: 'success'
      }


    } catch (error) {
      console.log(error);
       ctx.body = {
        status: -1,
        message: 'unknow error'
      }

     
    }

    
  }

  async receiveInfo(ctx) {
    // 获取前端传过来的歌曲信息
    //1. 查询数据库中是否存在该歌曲名
    //2. 如果不存在则保存信息到数据库中，
    //3. 如果存在则不做任何事情
    //4. 返回数据库中歌曲的id
    let mp3info = ctx.request.body;
    console.log(mp3info);
    
    try {
      let result = await mp3Model.findOneAndUpdate({name: mp3info.name},
        mp3info
      );
      if (!result) {
        result = await mp3Model.create(mp3info);
      }

      ctx.body = result._id
    } catch (error) {
      ctx.body = {
        status: 0,
        message: 'unknown error'
      }
    }

  }

  async getTotalPage(ctx) {
    try {
      let mp3List = await mp3Model.find({});
      let Num = Object.keys(mp3List).length;
      let totalPage = null;

      //将总的歌曲数量除以一页显示的文章数， 得到的结果向上取整即可
      totalPage = Math.ceil(Num/this.pageSize);
      ctx.body = totalPage; 
    } catch (error) {
      console.log(error);
      ctx.body = {
        status: -1,
        message: '发生未知错误'
      }
    }
  }

  async getMp3List(ctx) {
    let page = ctx.params.page;
    let skipPage = this.pageSize*(page - 1);

    try {
      let mp3List = await mp3Model.find().sort({'_id': -1}).skip(skipPage).limit(this.pageSize).exec();
      if(mp3List.length === 0)
      {
        ctx.body = {
          status: 0,
          message: '文章列表为空'
        }
        return;

      }

      ctx.body = mp3List;
      
    } catch (error) {
      console.log(error);
      ctx.body = {
        status: -1,
        message: '发生未知错误'
      }
    }
  }
}

export default new Admin();