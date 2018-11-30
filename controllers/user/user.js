import mp3Model from '../../models/mp3';


class User {
  async getMp3List(ctx) {
    
    try {
      let mp3List = await mp3Model.find({});
      ctx.body = mp3List;
      
    } catch (error) {
      console.log(error);
      ctx.body = {
        status: -1,
        message: 'unknown error'
      }
    }
  }
}

export default new User();