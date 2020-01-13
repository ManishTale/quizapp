const bridgeModel = require('../models/bridgeModel');

 //store reference quesId in bridge table
 exports.addMapping=function(req,res){
    var newBridge = req.body;
    var addBridge= new bridgeModel({
        quesId:newBridge.quesId,
        quizId:newBridge.quizId
    });
    bridgeModel(addBridge).save(function(err,result){
       if(err){
           // res.send('error saving quiz');
           console.log(err);
        }else{
            console.log(result);
            res.send(result);
           }
    });
    
 }

 exports.removeMapping=(req,res)=>{
    bridgeModel.findOneAndRemove({
        quesId:req.body.quesId,
        quizId:req.body.quizId
    },(err,resMap)=>{
        if(err){
            res.send('error deleting mapping');
        }else{
            console.log(resMap);
            //res.status(204);
            res.send('Deleted mapping');
            
        } 
    });

}

 
  
 