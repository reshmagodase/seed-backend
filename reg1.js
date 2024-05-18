var express = require('express');
var router = express.Router();
var path = require('path');
var db = require('/usr/src/jharkand_seed_api/seedApi/routes/db/getData');
const jwt = require("jsonwebtoken")    //for JWT TOKEN
const fs = require('fs')
var multer	=	require('multer');
const bodyParser = require('body-parser')
var fetch =  require('node-fetch');



router.use(bodyParser.urlencoded({ extended: false }))

router.use(bodyParser.json())
router.use(bodyParser.text())

router.use(express.json());


var storage	=	multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, __dirname+'/uploads');
  },
  filename: function (req, file, callback) {
  	//console.log(req.body.userID);
     
    callback(null, file.originalname);
  }
});

var upload = multer({ storage : storage}).single('userPic');

// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 1000000 },
//     fileFilter: function (req, file, cb) {
//         checkFileType(file, cb);
//     }
// });

// function checkFileType(file, cb) {
//     // Allowed ext
//     const filetypes = /jpeg|jpg|png|gif/;
//     // Check ext
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//     // Check mime
//     const mimetype = filetypes.test(file.mimetype);

//     if (mimetype && extname) {
//         return cb(null, true);
//     } else {
//         cb('Error: Images Only!');
//     }
// }


console.log(__dirname);


//JWT Generation Code
/*


//JWT Auth

}*/

function isAuthorized(req, res, next) {
	
    if (req.headers["authorization"] !== undefined) {

        console.log(req.headers["authorization"]);
        let token = req.headers.authorization.split(" ")[1];
        
        let privateKey = 'SettleminT';
        
        try {
    	const decoded = jwt.verify(token, privateKey);
    	//console.log(decoded);
      var userID = {userID:decoded.id};

      req.body=Object.assign( req.body, userID)
      //req.user = decoded.id;
    	//req.user = decoded;
  		} catch (err) {
    	return res.status(401).send({errordata :[{ error : "Not Authorized"}]});
  		}
  		return next();
    } else {
        
        //res.status(200).json({ error: "Not Authorized" });
        res.json({errordata :[{ error : "Invalid Token"}]});
        res.end();
    }
}


function isAuthorizedWeb(req, res, next) {
	
    if (req.headers["authorization"] !== undefined) {

        console.log(req.headers["authorization"]);
        let token = req.headers.authorization.split(" ")[1];
        
        let privateKey = 'SettleminT';
        
        try {
    	const decoded = jwt.verify(token, privateKey);
    	//console.log(decoded);
      var userID = {userIDJWT:decoded.id};

      req.body=Object.assign( req.body, userID)
      //req.user = decoded.id;
    	//req.user = decoded;
  		} catch (err) {
    	return res.status(401).send({errordata :[{ error : "Not Authorized"}]});
  		}
  		return next();
    } else {
        
        //res.status(200).json({ error: "Not Authorized" });
        res.json({errordata :[{ error : "Not Authorized"}]});
        res.end();
    }
}




/*router.get('/:id?',function(req,res,next){
 var data;
	if(req.params.id){
 		//console.log(req.params.date);
		console.log(req.query);
 
    db.showProfile(req.query,function(err,rows){
      if(err)
      {
        res.json(err);
        res.end();
      }
      else{
        res.json(rows);//or return count for 1 &amp;amp;amp; 0
        res.end();
      }
    });
	}
 	else{
 
		db.getAllTasks(function(err,rows){
 
			if(err)
  			{
  				res.json(err);
  				res.end();
  			}
  			else
  			{
  				data=res.json(rows);
  				res.end();
  			}
 
 		});
 	}
});*/

// use OF JWT

/*router.get('/showProfile',function(req,res,next){ //, isAuthorized

  console.log(req.query);
 
  db.showProfile(req.query,function(err,rows){
      if(err)
      {
        res.json(err);
        res.end();
      }
      else{
        res.json(rows);//or return count for 1 &amp;amp;amp; 0
        res.end();
      }
    });
});*/

router.get('/images',function(req,res){
	  console.log(req.query.filename);
	  console.log(__dirname + "/uploads/"+req.query.filename);
      res.sendFile(__dirname + "/uploads/"+req.query.filename);

});

router.get('/uploadtest',function(req,res){
      res.sendFile(__dirname + "/indexUP.html");
});

router.post('/uploadApi',multer({ storage : storage}).single('userPic'),function(req,res){
	console.log(req.body);
	// upload(req,res,function(err) {
	// 	if(err) {
	// 		return res.end("Error uploading file.");
	// 	}
	// 	res.end("File is uploaded");
	// });

	res.end("File is uploaded");

	
});


router.get('/uploadApi',function(req,res){
	console.log(req.params);
	upload(req,res,function(err) {
		if(err) {
			return res.end("Error uploading file.");
		}
		res.end("File is uploaded");
	});
});






router.get('/userDetail',isAuthorizedWeb, function(req,res,next){ //, isAuthorized

  console.log(req.query);
  console.log(req.query);
 
  db.userDetail(req.query,function(err,rows){
      if(err)
      {
        res.json(err);
        res.end();
      }
      else{
        console.log(rows);
        res.json(rows[0]);//or return count for 1 &amp;amp;amp; 0
        res.end();
      }
    });
});// userDetail


router.get('/userDetailUpdated',function(req,res,next){ //, isAuthorized

  console.log(req.query);
 
  db.userDetail(req.query,function(err,rows){
      if(err)
      {
        res.json(err);
        res.end();
      }
      else{
        result = new Object()
        var userData ='userData';
        var Admins = 'Admin';
        var Approver = 'Approver';
        
        result[userData] = rows[0];  
        result[Admins] = rows[1];
        result[Approver] = rows[2];
        
        console.log(rows);
        res.json(result);//or return count for 1 &amp;amp;amp; 0
        res.end();
      }
    });
});


router.get('/userDetailtest',function(req,res,next){ //, isAuthorized

  console.log(req.query);
 
  db.userDetail(req.query,function(err,rows){
      if(err)
      {
        res.json(err);
        res.end();
      }
      else{
        console.log(rows);
        res.json(rows);//or return count for 1 &amp;amp;amp; 0
        res.end();
      }
    });
});

router.post('/userDetail',isAuthorizedWeb, function(req,res,next){ //, isAuthorized

  console.log(req.body);
  db.userDetail(req.body,function(err,rows){
      if(err)
      {
        res.json(err);
        res.end();
      }
      else{
        res.json(rows[0]);//or return count for 1 &amp;amp;amp; 0
        res.end();
      }
    });
});
////// regCheck

// router.get('/regCheck',function(req,res,next){ //, isAuthorized

//   console.log(req.query);
 
//   db.regCheck(req.query,function(err,rows){
//       if(err)
//       {
//         res.json(err);
//         res.end();
//       }
//       else{
//       	result = new Object()
//       	var userData ='userData';
//       	var Admins = 'Admin';
//       	var Approvers = 'Approver';
// 		result[userData] = rows[0];  
// 		result[Admins] = rows[1];
// 		result[Approvers] = rows[2];
//         console.log(rows);
//         res.json(result);//or return count for 1 &amp;amp;amp; 0
//         res.end();
//       }
//     });
// });

router.get('/regCheck',function(req,res,next){ //, isAuthorized

  console.log(req.query);
 
  db.regCheck(req.query,function(err,rows){
      if(err)
      {
        res.json(err);
        res.end();
      }
      else{
        res.json(rows[0]);//or return count for 1 &amp;amp;amp; 0
        res.end();
      }
    });
});


router.get('/sendVerifyOTP', isAuthorized, async function(req,res,next){ //, isAuthorized

  console.log(req.query);
  const body = JSON.parse('{"VAR1":"'+req.query.quantity+'","VAR2":"'+req.query.cropName+'"}');
  if(req.query.mode == 'SEND'){
  let url ='https://api.msg91.com/api/v5/otp?template_id=63199519d6fc0556f108b123&mobile='+req.query.mobile+'&authkey=372676ABE3bfKa61fb73a4P1&VAR1=20&VAR2=abc';
  const response1 =  await fetch(url, {
	method: 'post',
	body: JSON.stringify(body),
	headers: {'Content-Type': 'application/json'}
});
  const data1 = await response1.json();
  console.log(data1)
  res.json(data1);//or return count for 1 &amp;amp;amp; 0
  res.end();
  }
  else if(req.query.mode == 'RETRY'){
  let url ='https://api.msg91.com/api/v5/otp/retry?retrytype='+req.query.retrytype+'&mobile='+req.query.mobile+'&authkey=372676ABE3bfKa61fb73a4P1';
  const response1 =  await fetch(url);
  const data1 = await response1.json();
  console.log(data1)
  res.json(data1);//or return count for 1 &amp;amp;amp; 0
  res.end();
  }
  else if(req.query.mode == 'VERIFY'){
  let url ='https://api.msg91.com/api/v5/otp/verify?otp='+req.query.otp+'&mobile='+req.query.mobile+'&authkey=372676ABE3bfKa61fb73a4P1';
  const response1 =  await fetch(url);
  const data1 = await response1.json();
  console.log(data1)
  res.json(data1);//or return count for 1 &amp;amp;amp; 0
  res.end();
  }else{
  res.json({errordata :[{ error : ""}]});
  res.end();
  
  }

});

router.post('/sendVerifyOTPWeb', isAuthorizedWeb, async function(req,res,next){ //, isAuthorized

  console.log(req.body);
  const body = JSON.parse('{"VAR1":"'+req.body.quantity+'","VAR2":"'+req.body.cropName+'"}');
  if(req.body.mode == 'SEND'){
  let url ='https://api.msg91.com/api/v5/otp?template_id=63199519d6fc0556f108b123&mobile='+req.body.mobile+'&authkey=372676ABE3bfKa61fb73a4P1&VAR1=20&VAR2=abc';
  
  const response1 =  await fetch(url, {
        method: 'post',
        body: JSON.stringify(body),
        headers: {'Content-Type': 'application/json'}
  });  

  //console.log(req.query);
 // if(req.query.mode == 'SEND'){
 // let url ='https://api.msg91.com/api/v5/otp?template_id=6282280454219c151a6728cc&mobile='+req.query.mobile+'&authkey=372676ABE3bfKa61fb73a4P1';
  // const response1 =  await fetch(url);
  try{
	  const data1 = await response1.json();
	  console.log(data1)
	  res.json(data1);//or return count for 1 &amp;amp;amp; 0
	  res.end();
	}catch(e){console.log(e)}
  }
  else if(req.body.mode == 'RETRY'){
  let url ='https://api.msg91.com/api/v5/otp/retry?retrytype='+req.body.retrytype+'&mobile='+req.body.mobile+'&authkey=372676ABE3bfKa61fb73a4P1';
  const response1 =  await fetch(url);
  const data1 = await response1.json();
  console.log(data1)
  res.json(data1);//or return count for 1 &amp;amp;amp; 0
  res.end();
  }
  else if(req.body.mode == 'VERIFY'){
  let url ='https://api.msg91.com/api/v5/otp/verify?otp='+req.body.otp+'&mobile='+req.body.mobile+'&authkey=372676ABE3bfKa61fb73a4P1';
  const response1 =  await fetch(url);
  const data1 = await response1.json();
  console.log(data1)
  res.json(data1);//or return count for 1 &amp;amp;amp; 0
  res.end();
  }else{
  res.json({errordata :[{ error : ""}]});
  res.end();
 
  }

});

router.post('/refresh',isAuthorizedWeb, function(req,res,next){ //, isAuthorized

 // console.log(req.query);
  console.log(req.body);
 
  db.regCheck(req.body,function(err,rows){
      if(err)
      {
        res.json(err);
        res.end();
      }
      else{
        result = new Object()
        var data ='data';
        var tokendata ='tokendata';
        
        
        //res.json(rows[0]);//or return count for 1 &amp;amp;amp; 0
        let privateKey = 'SettleminT';
        let token = jwt.sign({ "id": req.body.userIDJWT, iat: Math.floor(Date.now() / 1000) - 30, exp: Math.floor(Date.now() / 1000) + (6*60) }, privateKey, { algorithm: 'HS256'});
       // res.send('{"token": "'+ token+ '"}');
        //res.json(token);
        //console.log(row[0]);
        // let id = rows[0];
        // console.log(rows[0][0].id);
         
    //if (rows[0][0].Flag == 'Fail'){
      // result1 = new Object()
      // var errordata ='errordata';
      //result1[errordata] = rows[0];


    //  return res.status(200).send(result1);
       // }
        
       


        result[tokendata] = token; 
        res.json(result);
        res.end();
      }
    });
});

router.post('/regCheck',function(req,res,next){ //, isAuthorized

  console.log(req.query);
  console.log(req.body);
 
  db.regCheck(req.body,function(err,rows){
      if(err)
      {
        res.json(err);
        res.end();
      }
      else{
      	result = new Object()
      	var data ='data';
        var tokendata ='tokendata';
        console.log(rows[0])
        if(rows[0] == undefined){
        	return res.status(200).send({errordata :[{ error : "Wrong Format"}]});

        }
        //res.json(rows[0]);//or return count for 1 &amp;amp;amp; 0
        let privateKey = 'SettleminT';
        let token = jwt.sign({ "id": rows[0][0].id, iat: Math.floor(Date.now() / 1000) - 30, exp: Math.floor(Date.now() / 1000) + (6*60) }, privateKey, { algorithm: 'HS256'});
       // res.send('{"token": "'+ token+ '"}');
        //res.json(token);
        //console.log(row[0]);
        // let id = rows[0];
        // console.log(rows[0][0].id);
        result[data] = rows[0]; 
		//if (rows[0][0].Flag == 'Fail'){
			// result1 = new Object()
			// var errordata ='errordata';
			//result1[errordata] = rows[0];


		//	return res.status(200).send(result1);
       // }
        
       


        result[tokendata] = token; 
        res.json(result);
        res.end();
      }
    });
});


router.post('/seedDetail', isAuthorizedWeb,function(req,res,next){ //, isAuthorized

  console.log(req.body);
 
  db.seedDetail(req.body,function(err,rows){
      if(err)
      {
        res.json(err);
        res.end();
      }
      else{
        res.json(rows[0]);//or return count for 1 &amp;amp;amp; 0
        res.end();
      }
    });
});

router.get('/seedDetail', isAuthorizedWeb, function(req,res,next){ //, isAuthorized

  console.log(req.query);
 
  db.seedDetail(req.query,function(err,rows){
      if(err)
      {
        res.json(err);
        res.end();
      }
      else{
        res.json(rows[0]);//or return count for 1 &amp;amp;amp; 0
        res.end();
      }
    });
}); // forcastProcess


router.post('/aoApprovedQtySupplier',isAuthorizedWeb, function(req,res,next){ //, isAuthorized

  console.log(req.body);
 
  db.aoApprovedQtySupplier(req.body,function(err,rows){
      if(err)
      {
        res.json(err);
        res.end();
      }
      else{
        res.json(rows[0]);//or return count for 1 &amp;amp;amp; 0
        res.end();
      }
    });
});

router.get('/aoApprovedQtySupplier',isAuthorizedWeb, function(req,res,next){ //, isAuthorized

  console.log(req.query);
 
  db.aoApprovedQtySupplier(req.query,function(err,rows){
      if(err)
      {
        res.json(err);
        res.end();
      }
      else{
        res.json(rows[0]);//or return count for 1 &amp;amp;amp; 0
        res.end();
      }
    });
}); 

router.post('/testing',isAuthorizedWeb, function(req,res,next){ //, isAuthorized

  console.log(req.body);
 
  db.testing(req.body,function(err,rows){
      if(err)
      {
        res.json(err);
        res.end();
      }
      else{
        res.json(rows[0]);//or return count for 1 &amp;amp;amp; 0
        res.end();
      }
    });
});

router.get('/testing',isAuthorizedWeb, function(req,res,next){ //, isAuthorized

  console.log(req.query);
 
  db.testing(req.query,function(err,rows){
      if(err)
      {
        res.json(err);
        res.end();
      }
      else{
        res.json(rows[0]);//or return count for 1 &amp;amp;amp; 0
        res.end();
      }
    });
}); 

router.post('/forcastProcess',function(req,res,next){ //, isAuthorized

  console.log(req.query);
 
  db.forcastProcess(req.query,function(err,rows){
      if(err)
      {
        res.json(err);
        res.end();
      }
      else{
        res.json(rows[0]);//or return count for 1 &amp;amp;amp; 0
        res.end();
      }
    });
});

router.get('/forcastProcess',function(req,res,next){ //, isAuthorized

  console.log(req.query);
 
  db.forcastProcess(req.query,function(err,rows){
      if(err)
      {
        res.json(err);
        res.end();
      }
      else{
        res.json(rows[0]);//or return count for 1 &amp;amp;amp; 0
        res.end();
      }
    });
}); // forcastProcess

router.get('/forcastProcessInd',function(req,res,next){ //, isAuthorized

  console.log(req.query);
 
  db.forcastProcess(req.query,function(err,rows){
      if(err)
      {
        res.json(err);
        res.end();
      }
      else{
        result = new Object()
        var forcastData ='forcastData';
        var SeedData = 'SeedData';
        
        
        result[forcastData] = rows[0];  
        result[SeedData] = rows[1];
        
        res.json(result);//or return count for 1 &amp;amp;amp; 0
        res.end();
      }
    });
});


router.get('/forcastProcessDistrictWise',isAuthorizedWeb, function(req,res,next){ //, isAuthorized

  console.log(req.query);
 
  db.forcastProcess(req.query,function(err,rows){
      if(err)
      {
        res.json(err);
        res.end();
      }
      else{
        result = new Object()

        var VerityData ='VerityData';
        var Bokaro ='Bokaro';
        var Chatra = 'Chatra';
        var Deoghar ='Deoghar';
        var Dhanbad = 'Dhanbad';
        var Dumka ='Dumka';
        var Garhwa = 'Garhwa';
        var Giridih ='Giridih';
        var Godda = 'Godda';
        var Gumla ='Gumla';
        var Hazaribag = 'Hazaribag';
        var Jamshedpur ='Jamshedpur';
        var Jamtara = 'Jamtara';
        var Khunti ='Khunti';
        var Koderma = 'Koderma';
        var Latehar ='Latehar';
        var Lohardaga = 'Lohardaga';
        var Pakur ='Pakur';
        var Palamu = 'Palamu';
        var Ramgarh ='Ramgarh';
        var Ranchi = 'Ranchi';
        var Sahibganj ='Sahibganj';
        var Seraikela = 'Seraikela';
        var Simdega ='Simdega';
        var Singhbhum = 'W. Singhbhum';
       


        result[VerityData] = rows[0]; 
        result[Bokaro] = rows[1];  
        result[Chatra] = rows[2];
        result[Deoghar] = rows[3];  
        result[Dhanbad] = rows[4];
        result[Dumka] = rows[5];  
        result[Garhwa] = rows[6];
        result[Giridih] = rows[7];  
        result[Godda] = rows[8];
        result[Gumla] = rows[9];  
        result[Hazaribag] = rows[10];
        result[Jamshedpur] = rows[11];
        result[Jamtara] = rows[12];  
        result[Khunti] = rows[13];
        result[Koderma] = rows[14];  
        result[Latehar] = rows[15];
        result[Lohardaga] = rows[16];  
        result[Pakur] = rows[17];
        result[Palamu] = rows[18];  
        result[Ramgarh] = rows[19];
        result[Ranchi] = rows[20];  
        result[Sahibganj] = rows[21];
        result[Seraikela] = rows[22];  
        result[Simdega] = rows[23];
        result[Singhbhum] = rows[24];  
       
        res.json(result);//or return count for 1 &amp;amp;amp; 0
        res.end();
      }
    });
});


router.post('/purchageProcess',isAuthorizedWeb, function(req,res,next){ //, isAuthorized

  console.log(req.body);
 
  db.purchageProcess(req.body,function(err,rows){
      if(err)
      {
        res.json(err);
        res.end();
      }
      else{
        res.json(rows[0]);//or return count for 1 &amp;amp;amp; 0
        res.end();
      }
    });
});

router.get('/purchageProcess',isAuthorizedWeb, function(req,res,next){ //, isAuthorized

  console.log(req.query);
 
  db.purchageProcess(req.query,function(err,rows){
      if(err)
      {
        res.json(err);
        res.end();
      }
      else{
        res.json(rows[0]);//or return count for 1 &amp;amp;amp; 0
        res.end();
      }
    });
}); // forcastProcess


router.post('/season',isAuthorizedWeb, function(req,res,next){ //, isAuthorized

  console.log(req.body);
 
  db.season(req.body,function(err,rows){
      if(err)
      {
        res.json(err);
        res.end();
      }
      else{
        res.json(rows[0]);//or return count for 1 &amp;amp;amp; 0
        res.end();
      }
    });
});

router.get('/season',isAuthorizedWeb, function(req,res,next){ //, isAuthorized

  console.log(req.query);
 
  db.season(req.query,function(err,rows){
      if(err)
      {
        res.json(err);
        res.end();
      }
      else{
        res.json(rows[0]);//or return count for 1 &amp;amp;amp; 0
        res.end();
      }
    });
});

router.get('/purchageProcessIND',isAuthorizedWeb, function(req,res,next){ //, isAuthorized

  console.log(req.query);
 
  db.purchageProcess(req.query,function(err,rows){
      if(err)
      {
        res.json(err);
        res.end();
      }
      else{
        result = new Object()

        var purchaseStatus ='purchaseStatus';
        var demandDetails ='demandDetails';
        var dispatchDetails = 'dispatchDetails';

        result[purchaseStatus] = rows[0]; 
        result[demandDetails] = rows[1];  
        result[dispatchDetails] = rows[2];
        res.json(result);//or return count for 1 &amp;amp;amp; 0
        res.end();
      }
    });
}); // forcastProcess

router.get('/purchageProcessDispatch',isAuthorizedWeb, function(req,res,next){ //, isAuthorized

  console.log(req.query);
 
  db.purchageProcess(req.query,function(err,rows){
      if(err)
      {
        res.json(err);
        res.end();
      }
      else{
        result = new Object()

        var transitDetail ='transitDetail';
        var transport ='transport';
        

        result[transitDetail] = rows[0]; 
        result[transport] = rows[1];  
        
        res.json(result);//or return count for 1 &amp;amp;amp; 0
        res.end();
      }
    });
}); 


router.post('/seedAllotment', isAuthorizedWeb, function(req,res,next){ //, isAuthorized

  console.log(req.body);
 
  db.seedAllotment(req.body,function(err,rows){
      if(err)
      {
        res.json(err);
        res.end();
      }
      else{
        res.json(rows[0]);//or return count for 1 &amp;amp;amp; 0
        res.end();
      }
    });
});

router.get('/seedAllotment', isAuthorizedWeb, function(req,res,next){ //, isAuthorized
  console.log(req.query);
  db.seedAllotment(req.query,function(err,rows){
      if(err)
      {
        res.json(err);
        res.end();
      }
      else{
        res.json(rows[0]);//or return count for 1 &amp;amp;amp; 0
        res.end();
      }
    });
}); // seedTransfer

router.post('/seedTransfer', isAuthorizedWeb,function(req,res,next){ //, isAuthorized

  console.log(req.body);
 
  db.seedTransfer(req.body,function(err,rows){
      if(err)
      {
        res.json(err);
        res.end();
      }
      else{
        res.json(rows[0]);//or return count for 1 &amp;amp;amp; 0
        res.end();
      }
    });
});

router.get('/seedTransfer', isAuthorizedWeb, function(req,res,next){ //, isAuthorized

  console.log(req.query);
 
  db.seedTransfer(req.query,function(err,rows){
      if(err)
      {
        res.json(err);
        res.end();
      }
      else{
        res.json(rows[0]);//or return count for 1 &amp;amp;amp; 0
        res.end();
      }
    });
});

router.post('/daoSeeds', isAuthorizedWeb,function(req,res,next){ //, isAuthorized

  console.log(req.body);
 
  db.daoSeeds(req.body,function(err,rows){
      if(err)
      {
        res.json(err);
        res.end();
      }
      else{
        res.json(rows[0]);//or return count for 1 &amp;amp;amp; 0
        res.end();
      }
    });
});

router.get('/daoSeeds', isAuthorizedWeb,function(req,res,next){ //, isAuthorized

  console.log(req.query);
 
  db.daoSeeds(req.query,function(err,rows){
      if(err)
      {
        res.json(err);
        res.end();
      }
      else{
        res.json(rows[0]);//or return count for 1 &amp;amp;amp; 0
        res.end();
      }
    });
});


router.post('/daoSeedsForecastNew',isAuthorizedWeb,function(req,res,next){ //, isAuthorized

  console.log(req.body);
 
  db.daoSeedsForecastNew(req.body,function(err,rows){
      if(err)
      {
        res.json(err);
        res.end();
      }
      else{
        res.json(rows[0]);//or return count for 1 &amp;amp;amp; 0
        res.end();
      }
    });
});

router.get('/daoSeedsForecastNew',isAuthorizedWeb, function(req,res,next){ //, isAuthorized

  console.log(req.query);
 
  db.daoSeedsForecastNew(req.query,function(err,rows){
      if(err)
      {
        res.json(err);
        res.end();
      }
      else{
        res.json(rows[0]);//or return count for 1 &amp;amp;amp; 0
        res.end();
      }
    });
});

router.get('/dashboard',isAuthorizedWeb,function(req,res,next){ //, isAuthorized

  console.log(req.query);
 
  db.dashboard(req.query,function(err,rows){
      if(err)
      {
        res.json(err);
        res.end();
      }
      else{
        res.json(rows[0]);//or return count for 1 &amp;amp;amp; 0
        res.end();
      }
    });
}); 


router.get('/dashboardtestweb',function(req,res,next){ //, isAuthorized

  console.log(req.query);
 
  db.dashboard(req.query,function(err,rows){
      if(err)
      {
        res.json(err);
        res.end();
      }
      else{
        res.json(rows[0]);//or return count for 1 &amp;amp;amp; 0
        res.end();
      }
    });
}); 


router.get('/dashboardSeedDistrict',isAuthorizedWeb , function(req,res,next){ //, isAuthorized

  console.log(req.query);

  db.dashboard(req.query,async function(err,rows){
      if(err)
      {
        res.json(err);
        res.end();
      }
      else{
      	if(rows[0] == undefined){
        	return res.status(401).send({errordata :[{ error : "Wrong Format"}]});

        }
        result = new Object()
       
       // var data ='data';
       // var verity ='verity';

        
       // finalObj = rows[0].concat(rows[1]);
        
       // result[data] = rows[0]; 
       // result[verity] = rows[1]; 
        var mode = {mode:'VERITYDISTRICTMAP'};
        console.log(rows[0].length)
        console.log(rows[1].length)
        var list = [];
        let data;
        for(let j = 0; j < rows[1].length; j++){
          console.log(j);
          list = [];
        	for(let i=0; i<24; i++){

            
            var verity = {verityID:rows[1][j].id};
            var district = {districtID:rows[0][i].id};
            var mquery=Object.assign(mode, district, verity);
            var url ='https://dev.jharkhandseed.com:3022/jseed/dashboardtestweb?mode=VERITYDISTRICTMAP&verityID='+rows[1][j].id+'&districtID='+rows[0][i].id;


            const response1 =  await fetch(url);
		  	const data1 = await response1.json();
		  	list.push(data1);
            //console.log(txmquery);

            
            // db.dashboard(mquery, await function(err,rows){

            //   if(err)
            //   {
            //     res.json(err);
            //     res.end();
            //   }
            //   else{
                
            //     //res.json(rows[0]);//or return count for 1 &amp;amp;amp; 0
            //     //res.end();
            //     //list.push(rows[0][0])
            //    //return(rows[0][0]);
            //      list.push(rows[0][0]);
            //     //console.log(rows[0][0]);
                

            //   }
              
            // });

            
        		
        		

        	}

          
    //       const response1 = await fetch('http://dev.ukmedical.info:3022/jseed/dashboard?mode=DISTRIBUTIONWISEDISTRICTVERITY&verityID=9');
		  // const data1 = await response1.json();

		  //console.log(data1);
         //setTimeout(() => { result[rows[1][j].v_variety] = list;}, 1000);
          // console.log(data)
           result[rows[1][j].v_variety] =  list;
           list = [];

        }
        //console.log(list)
        
        //setTimeout(() => { res.json(result);res.end(); }, 1000);
          res.json(result);//or return count for 1 &amp;amp;amp; 0
          res.end();
      }
    });


   
  // db.dashboard(req.query,function(err,rows){
  //     if(err)
  //     {
  //       res.json(err);
  //       res.end();
  //     }
  //     else{
  //       res.json(rows[0]);//or return count for 1 &amp;amp;amp; 0
  //       res.end();
  //     }
  //   });
});
router.get('/dashboardSeedDistrictSeason',isAuthorizedWeb, function(req,res,next){ //, isAuthorized

  console.log(req.query);

  db.dashboard(req.query,async function(err,rows){
      if(err)
      {
        res.json(err);
        res.end();
      }
      else{
      	if(rows[0] == undefined){
        	return res.status(401).send({errordata :[{ error : "Wrong Format"}]});

        }
        result = new Object()
       
       // var data ='data';
       // var verity ='verity';

        
       // finalObj = rows[0].concat(rows[1]);
        
       // result[data] = rows[0]; 
       // result[verity] = rows[1]; 
        var mode = {mode:'VERITYDISTRICTMAP'};
        console.log(rows[0].length)
        console.log(rows[1].length)
        var list = [];
        let data;
        for(let j = 0; j < rows[1].length; j++){
          console.log(j);
          list = [];
        	for(let i=0; i<24; i++){

            
            var verity = {verityID:rows[1][j].id};
            var district = {districtID:rows[0][i].id};
            var mquery=Object.assign(mode, district, verity);
            var url ='https://dev.jharkhandseed.com:3022/jseed/dashboardtestweb?mode=VERITYDISTRICTMAPSEASON&verityID='+rows[1][j].id+'&districtID='+rows[0][i].id+'&season='+req.query.season;


            const response1 =  await fetch(url);
		  	const data1 = await response1.json();
		  	list.push(data1);
            //console.log(txmquery);

            
            // db.dashboard(mquery, await function(err,rows){

            //   if(err)
            //   {
            //     res.json(err);
            //     res.end();
            //   }
            //   else{
                
            //     //res.json(rows[0]);//or return count for 1 &amp;amp;amp; 0
            //     //res.end();
            //     //list.push(rows[0][0])
            //    //return(rows[0][0]);
            //      list.push(rows[0][0]);
            //     //console.log(rows[0][0]);
                

            //   }
              
            // });

            
        		
        		

        	}

          
    //       const response1 = await fetch('http://dev.ukmedical.info:3022/jseed/dashboard?mode=DISTRIBUTIONWISEDISTRICTVERITY&verityID=9');
		  // const data1 = await response1.json();

		  //console.log(data1);
         //setTimeout(() => { result[rows[1][j].v_variety] = list;}, 1000);
          // console.log(data)
           result[rows[1][j].v_variety] =  list;
           list = [];

        }
        //console.log(list)
        
        //setTimeout(() => { res.json(result);res.end(); }, 1000);
          res.json(result);//or return count for 1 &amp;amp;amp; 0
          res.end();
      }
    });


   
  // db.dashboard(req.query,function(err,rows){
  //     if(err)
  //     {
  //       res.json(err);
  //       res.end();
  //     }
  //     else{
  //       res.json(rows[0]);//or return count for 1 &amp;amp;amp; 0
  //       res.end();
  //     }
  //   });
});



router.get('/dashboardSeedDistrict1',isAuthorizedWeb, function(req,res,next){ //, isAuthorized

  console.log(req.query);

  db.dashboard(req.query,async function(err,rows){
      if(err)
      {
        res.json(err);
        res.end();
      }
      else{
        if(rows[0] == undefined){
          return res.status(401).send({errordata :[{ error : "Wrong Format"}]});

        }
        result = new Object()
       
        var mode = {mode:'VERITYDISTRICTMAP'};
        console.log(rows[0].length)
        console.log(rows[1].length)
        var list = [];
        let data;
        for(let j = 0; j < rows[1].length; j++){
          console.log(j);
          list = [];
          

            
            var verity = {verityID:rows[1][j].id};
            //var district = {districtID:rows[0][i].id};
            var mquery=Object.assign(mode, req.query.districtID, verity);
            var url ='https://dev.jharkhandseed.com:3022/jseed/dashboardtestweb?mode=VERITYDISTRICTMAP&verityID='+rows[1][j].id+'&districtID='+req.query.districtID;


            const response1 =  await fetch(url);
        const data1 = await response1.json();
        list.push(data1);
            //console.log(txmquery);

            
            // db.dashboard(mquery, await function(err,rows){

            //   if(err)
            //   {
            //     res.json(err);
            //     res.end();
            //   }
            //   else{
                
            //     //res.json(rows[0]);//or return count for 1 &amp;amp;amp; 0
            //     //res.end();
            //     //list.push(rows[0][0])
            //    //return(rows[0][0]);
            //      list.push(rows[0][0]);
            //     //console.log(rows[0][0]);
                

            //   }
              
            // });

            
            
            

          

          
    //       const response1 = await fetch('http://dev.ukmedical.info:3022/jseed/dashboard?mode=DISTRIBUTIONWISEDISTRICTVERITY&verityID=9');
      // const data1 = await response1.json();

      //console.log(data1);
         //setTimeout(() => { result[rows[1][j].v_variety] = list;}, 1000);
          // console.log(data)
           result[rows[1][j].v_variety] =  list;
           list = [];

        }
        //console.log(list)
        
        //setTimeout(() => { res.json(result);res.end(); }, 1000);
          res.json(result);//or return count for 1 &amp;amp;amp; 0
          res.end();
      }
    });


   
  // db.dashboard(req.query,function(err,rows){
  //     if(err)
  //     {
  //       res.json(err);
  //       res.end();
  //     }
  //     else{
  //       res.json(rows[0]);//or return count for 1 &amp;amp;amp; 0
  //       res.end();
  //     }
  //   });
});

router.get('/dashboardSeedDistrict1Season', function(req,res,next){ //, isAuthorized

  console.log(req.query);

  db.dashboard(req.query,async function(err,rows){
      if(err)
      {
        res.json(err);
        res.end();
      }
      else{
        if(rows[0] == undefined){
          return res.status(401).send({errordata :[{ error : "Wrong Format"}]});

        }
        result = new Object()
       
        var mode = {mode:'VERITYDISTRICTMAP'};
        console.log(rows[0].length)
        console.log(rows[1].length)
        var list = [];
        let data;
        for(let j = 0; j < rows[1].length; j++){
          console.log(j);
          list = [];
          

            
            var verity = {verityID:rows[1][j].id};
            //var district = {districtID:rows[0][i].id};
            var mquery=Object.assign(mode, req.query.districtID, verity);
            var url ='https://dev.jharkhandseed.com:3022/jseed/dashboard?mode=VERITYDISTRICTMAPSEASON&verityID='+rows[1][j].id+'&districtID='+req.query.districtID+'&season='+req.query.season;


            const response1 =  await fetch(url);
        const data1 = await response1.json();
        list.push(data1);
            //console.log(txmquery);

            
            // db.dashboard(mquery, await function(err,rows){

            //   if(err)
            //   {
            //     res.json(err);
            //     res.end();
            //   }
            //   else{
                
            //     //res.json(rows[0]);//or return count for 1 &amp;amp;amp; 0
            //     //res.end();
            //     //list.push(rows[0][0])
            //    //return(rows[0][0]);
            //      list.push(rows[0][0]);
            //     //console.log(rows[0][0]);
                

            //   }
              
            // });

            
            
            

          

          
    //       const response1 = await fetch('http://dev.ukmedical.info:3022/jseed/dashboard?mode=DISTRIBUTIONWISEDISTRICTVERITY&verityID=9');
      // const data1 = await response1.json();

      //console.log(data1);
         //setTimeout(() => { result[rows[1][j].v_variety] = list;}, 1000);
          // console.log(data)
           result[rows[1][j].v_variety] =  list;
           list = [];

        }
        //console.log(list)
        
        //setTimeout(() => { res.json(result);res.end(); }, 1000);
          res.json(result);//or return count for 1 &amp;amp;amp; 0
          res.end();
      }
    });


   
  // db.dashboard(req.query,function(err,rows){
  //     if(err)
  //     {
  //       res.json(err);
  //       res.end();
  //     }
  //     else{
  //       res.json(rows[0]);//or return count for 1 &amp;amp;amp; 0
  //       res.end();
  //     }
  //   });
});





router.get('/dashboardSeedwise',function(req,res,next){ //, isAuthorized

  console.log(req.query);
 
  db.dashboard(req.query,function(err,rows){
      if(err)
      {
        res.json(err);
        res.end();
      }
      else{
        result = new Object()

        //var VerityData ='VerityData';
        var Bokaro ='Bokaro';
        var Chatra = 'Chatra';
        var Deoghar ='Deoghar';
        var Dhanbad = 'Dhanbad';
        var Dumka ='Dumka';
        var Garhwa = 'Garhwa';
        var Giridih ='Giridih';
        var Godda = 'Godda';
        var Gumla ='Gumla';
        var Hazaribag = 'Hazaribag';
        var Jamshedpur ='Jamshedpur';
        var Jamtara = 'Jamtara';
        var Khunti ='Khunti';
        var Koderma = 'Koderma';
        var Latehar ='Latehar';
        var Lohardaga = 'Lohardaga';
        var Pakur ='Pakur';
        var Palamu = 'Palamu';
        var Ramgarh ='Ramgarh';
        var Ranchi = 'Ranchi';
        var Sahibganj ='Sahibganj';
        var Seraikela = 'Seraikela';
        var Simdega ='Simdega';
        var Singhbhum = 'W. Singhbhum';
       


        //result[VerityData] = rows[0]; 
        result[Bokaro] = rows[0];  
        result[Chatra] = rows[1];
        result[Deoghar] = rows[2];  
        result[Dhanbad] = rows[3];
        result[Dumka] = rows[4];  
        result[Garhwa] = rows[5];
        result[Giridih] = rows[6];  
        result[Godda] = rows[7];
        result[Gumla] = rows[8];  
        result[Hazaribag] = rows[9];
        result[Jamshedpur] = rows[10];
        result[Jamtara] = rows[11];  
        result[Khunti] = rows[12];
        result[Koderma] = rows[13];  
        result[Latehar] = rows[14];
        result[Lohardaga] = rows[15];  
        result[Pakur] = rows[16];
        result[Palamu] = rows[17];  
        result[Ramgarh] = rows[18];
        result[Ranchi] = rows[19];  
        result[Sahibganj] = rows[20];
        result[Seraikela] = rows[21];  
        result[Simdega] = rows[22];
        result[Singhbhum] = rows[23];  
       
        res.json(result);//or return count for 1 &amp;amp;amp; 0
        res.end();
      }
    });
});


router.post('/stock',isAuthorizedWeb,function(req,res,next){ //, isAuthorized

  console.log(req.body);
 
  db.stock(req.body,function(err,rows){
      if(err)
      {
        res.json(err);
        res.end();
      }
      else{
        res.json(rows[0]);//or return count for 1 &amp;amp;amp; 0
        res.end();
      }
    });
});

router.post('/regCheckMobile',function(req,res,next){ //, isAuthorized

  console.log(req.query);
  console.log(req.body);
 
  db.regCheck(req.body,function(err,rows){
      if(err)
      {
        res.json(err);
        res.end();
      }
      else{
      	result = new Object()
      	var data ='data';
        var tokendata ='tokendata';
        console.log(rows[0])
        if(rows[0] == undefined){
        	return res.status(200).send({errordata :[{ error : "Wrong Format"}]});

        }
        //res.json(rows[0]);//or return count for 1 &amp;amp;amp; 0
        let privateKey = 'SettleminT';
        let token = jwt.sign({ "id": rows[0][0].id, iat: Math.floor(Date.now() / 1000) - 30, exp: Math.floor(Date.now() / 1000) + (24*3600) }, privateKey, { algorithm: 'HS256'});
       // res.send('{"token": "'+ token+ '"}');
        //res.json(token);
        //console.log(row[0]);
        // let id = rows[0];
        // console.log(rows[0][0].id);
        result[data] = rows[0]; 
		if (rows[0][0].Flag == 'Fail'){
			result1 = new Object()
			var errordata ='errordata';
			result1[errordata] = rows[0];


			return res.status(200).send(result1);
        }
        
       


        result[tokendata] = token; 
        res.json(result);
        res.end();
      }
    });
});


router.post('/seedData', isAuthorized ,function(req,res,next){ //, isAuthorized

  console.log(req.body);
 
  db.stock(req.body,function(err,rows){
      if(err)
      {
        res.json(err);
        res.end();
      }
      else{
      	if(rows[0] == undefined){
        	return res.status(200).send({errordata :[{ error : "Wrong Format"}]});

        }
      	mergedata = new Object()
        result = new Object()
        var errordata ='errordata';
        var data ='data';
        var countandoffset ='countandoffset';
        //finalObj = rows[0].concat(rows[1]);
        result[errordata] = rows[2]; 
        result[countandoffset] = rows[0]; 
        result[data] = rows[1]; 
        

        res.json(result);//or return count for 1 &amp;amp;amp; 0
        res.end();
      }
    });
});// insertAndGetFarmer

router.post('/seedDataWeb',isAuthorizedWeb, function(req,res,next){ //, isAuthorized

  console.log(req.body);
 
  db.stock(req.body,function(err,rows){
      if(err)
      {
        res.json(err);
        res.end();
      }
      else{

        mergedata = new Object()
        result = new Object()
        var errordata ='errordata';
        var data ='data';
        var countandoffset ='countandoffset';
        //finalObj = rows[0].concat(rows[1]);
        result[errordata] = rows[2]; 
        result[countandoffset] = rows[0]; 
        result[data] = rows[1]; 
        

        res.json(result);//or return count for 1 &amp;amp;amp; 0
        res.end();
      }
    });
});


router.post('/insertAndGetFarmer', isAuthorized ,function(req,res,next){ //, isAuthorized

  console.log(req.body);
 
  db.insertAndGetFarmer(req.body,function(err,rows){
      if(err)
      {
        res.json(err);
        res.end();
      }
      else{
      	if(rows[0] == undefined){
        	return res.status(401).send({errordata :[{ error : "Wrong Format"}]});

        }
        result = new Object()
        var errordata ='errordata';
        var data ='data';

        result[errordata] = rows[0]; 
        result[data] = rows[1]; 

        res.json(result);//or return count for 1 &amp;amp;amp; 0
        res.end();
      }
    });
});// insertAndGetDistribution

router.get('/seasonMobile', isAuthorized, function(req,res,next){ //, isAuthorized

  console.log(req.query);
 
  db.season(req.query,function(err,rows){
      if(err)
      {
        res.json(err);
        res.end();
      }
      else{
        if(rows[0] == undefined){
        	return res.status(401).send({errordata :[{ error : "Wrong Format"}]});

        }
        result = new Object()
        var errordata ='errordata';
        var data ='data';

        result[errordata] = rows[0]; 
        result[data] = rows[1]; 

        res.json(result);//or return count for 1 &amp;amp;amp; 0
        res.end();
      }
    });
});


router.post('/resetpassword', isAuthorized ,function(req,res,next){ //, isAuthorized

  console.log(req.body);

  db.userDetail(req.body,function(err,rows){
      if(err)
      {
        res.json(err);
        res.end();
      }
      else{
        res.json(rows[0][0]);//or return count for 1 &amp;amp;amp; 0
        res.end();
      }
    });
});

router.post('/resetpasswordWeb',isAuthorizedWeb, function(req,res,next){ //, isAuthorized

  console.log(req.body);

  db.userDetail(req.body,function(err,rows){
      if(err)
      {
        res.json(err);
        res.end();
      }
      else{
        res.json(rows[0][0]);//or return count for 1 &amp;amp;amp; 0
        res.end();
      }
    });
});

router.post('/insertAndGetFarmerWeb',isAuthorizedWeb, function(req,res,next){ //, isAuthorized

  console.log(req.body);
 
  db.insertAndGetFarmer(req.body,function(err,rows){
      if(err)
      {
        res.json(err);
        res.end();
      }
      else{
        result = new Object()
        var errordata ='errordata';
        var data ='data';

        result[errordata] = rows[0]; 
        result[data] = rows[1]; 

        res.json(result);//or return count for 1 &amp;amp;amp; 0
        res.end();
      }
    });
});

router.post('/insertAndGetFarmerWebwithdistributionWeb',isAuthorizedWeb, function(req,res,next){ //, isAuthorized

  console.log(req.body);

  db.insertAndGetDistribution(req.body,function(err,rows){
      if(err)
      {
        res.json(err);
        res.end();
      }
      else{
        result = new Object()
        var errordata ='errordata';
        var data ='data';

        var seedDistribution ='seedDistribution';
        result[errordata] = rows[0];
        result[data] = rows[1];
        result[seedDistribution] = rows[2];

        res.json(result);//or return count for 1 &amp;amp;amp; 0
        res.end();
      }
    });
});


router.get('/insertAndGetFarmerWebwithdistributionWeb',function(req,res,next){ //, isAuthorized

  console.log(req.body);

  db.insertAndGetDistribution(req.body,function(err,rows){
      if(err)
      {
        res.json(err);
        res.end();
      }
      else{
        result = new Object()
        var errordata ='errordata';
        var data ='data';

        var seedDistribution ='seedDistribution';
        result[errordata] = rows[0];
        result[data] = rows[1];
        result[seedDistribution] = rows[2];

        res.json(result);//or return count for 1 &amp;amp;amp; 0
        res.end();
      }
    });
});

router.post('/insertAndGetFarmerWebwithdistribution', isAuthorized, function(req,res,next){ //, isAuthorized

  console.log(req.body);

  db.insertAndGetDistribution(req.body,function(err,rows){
      if(err)
      {
        res.json(err);
        res.end();
      }
      else{
        result = new Object()
        var errordata ='errordata';
        var data ='data';

	var seedDistribution ='seedDistribution';
        result[errordata] = rows[0];
        result[data] = rows[1];
        result[seedDistribution] = rows[2];

        res.json(result);//or return count for 1 &amp;amp;amp; 0
        res.end();
      }
    });
});
router.post('/submitfarmerfeedback', isAuthorized ,function(req,res,next){ //, isAuthorized

  console.log(req.body);

  db.insertAndGetDistribution(req.body,function(err,rows){
      if(err)
      {
        res.json(err);
        res.end();
      }
      else{
        res.json(rows[0][0]);//or return count for 1 &amp;amp;amp; 0
        res.end();
      }
    });
});

router.post('/insertFarmerDistributionnew', isAuthorized ,async function(req,res,next){ //, isAuthorized

  console.log(req.body);
  if(req.body.otp == undefined || req.body.otp == ''){
  db.insertAndGetDistribution(req.body,function(err,rows){
      if(err)
      {
        res.json(err);
        res.end();
      } 
      else{
        if(rows[0] == undefined){
                return res.status(401).send({errordata :[{ error : "Wrong Format"}]});
        
        }       
        result = new Object()
        var errordata ='errordata';
        var data ='data';
        
        result[errordata] = rows[0];

        
        res.json(result);//or return count for 1 &amp;amp;amp; 0
        res.end();
      } 
    });
  }else{
  let url ='https://api.msg91.com/api/v5/otp/verify?otp='+req.body.otp+'&mobile='+req.body.farmerCno+'&authkey=372676ABE3bfKa61fb73a4P1';
  const response1 =  await fetch(url);
  const data1 = await response1.json();
  console.log(data1)
  if(data1.type =='success'){

  db.insertAndGetDistribution(req.body,function(err,rows){
      if(err)
      {
        res.json(err);
        res.end();
      }
      else{
        if(rows[0] == undefined){
                return res.status(401).send({errordata :[{ error : "Wrong Format"}]});

        }
        result = new Object()
        var errordata ='errordata';
        var data ='data';

        result[errordata] = rows[0];

       // res.status(200).send({errordata :[{ error : "Not Authorized"}]});
        res.json(result);//or return count for 1 &amp;amp;amp; 0
        res.end();
      }
    });
    }else{
       res.status(200).send({errordata :[{"message":"Fail","errorMessage":"Fail"}]});
       //res.json(data1);//or return count for 1 &amp;amp;amp; 0
       res.end();
    }
  
   }
});

router.post('/insertFarmerDistributionnewWeb',isAuthorizedWeb, async function(req,res,next){ //, isAuthorized

  console.log(req.body);
  if(req.body.otp == undefined || req.body.otp == ''){
  db.insertAndGetDistribution(req.body,function(err,rows){
      if(err)
      {
        res.json(err);
        res.end();
      }
      else{
        if(rows[0] == undefined){
                return res.status(401).send({errordata :[{ error : "Wrong Format"}]});

        }
        result = new Object()
        var errordata ='errordata';
        var data ='data';

        result[errordata] = rows[0];


        res.json(result);//or return count for 1 &amp;amp;amp; 0
        res.end();
      }
    });
  }else{
   let url ='https://api.msg91.com/api/v5/otp/verify?otp='+req.body.otp+'&mobile='+req.body.farmerCno+'&authkey=372676ABE3bfKa61fb73a4P1';
  //let url ='https://google.com';
  const response1 =  await fetch(url);
  try{
  const data1 = await response1.json();
  console.log(data1)
  if(data1.type =='success'){

  db.insertAndGetDistribution(req.body,function(err,rows){
      if(err)
      {
        res.json(err);
        res.end();
      }
      else{
        if(rows[0] == undefined){
                return res.status(401).send({errordata :[{ error : "Wrong Format"}]});

        }
        result = new Object()
        var errordata ='errordata';
        var data ='data';

        result[errordata] = rows[0];

       // res.status(200).send({errordata :[{ error : "Not Authorized"}]});
        res.json(result);//or return count for 1 &amp;amp;amp; 0
        res.end();
      }
    });
    }else{
       res.status(200).send({errordata :[{"message":"Fail","errorMessage":"Fail"}]});
       //res.json(data1);//or return count for 1 &amp;amp;amp; 0
       res.end();
    }
   }catch(e){
  	console.log(e);
  	res.status(200).send({errordata :[{"message":"Fail","errorMessage":"Fail"}]});
       //res.json(data1);//or return count for 1 &amp;amp;amp; 0
    res.end();

  }
  }
});



router.post('/insertFarmerDistribution', isAuthorized ,function(req,res,next){ //, isAuthorized

  console.log(req.body);
  //if(req.body.otp == undefined){}else{} 
  //let url ='https://api.msg91.com/api/v5/otp/verify?otp='+req.body.otp+'&mobile='+req.body.farmerCno+'&authkey=372676ABE3bfKa61fb73a4P1';
  //const response1 =  await fetch(url);
  //const data1 = await response1.json();
  //console.log(data1)
  //if(data1.type =='success'){}
 
  db.insertAndGetDistribution(req.body,function(err,rows){
      if(err)
      {
        res.json(err);
        res.end();
      }
      else{
      	if(rows[0] == undefined){
        	return res.status(401).send({errordata :[{ error : "Wrong Format"}]});

        }
        result = new Object()
        var errordata ='errordata';
        var data ='data';

        result[errordata] = rows[0]; 
        

        res.json(result);//or return count for 1 &amp;amp;amp; 0
        res.end();
      }
    });
});



router.get('/getFarmerDistribution', isAuthorized ,function(req,res,next){ //, isAuthorized

  console.log(req.query);
 
  db.insertAndGetDistribution(req.query,function(err,rows){
      if(err)
      {
        res.json(err);
        res.end();
      }
      else{
      	if(rows[0] == undefined){
        	return res.status(401).send({errordata :[{ error : "Wrong Format"}]});

        }
        result = new Object()
        var errordata ='errordata';
        var data ='data';

        var countandoffset ='countandoffset';
       // finalObj = rows[0].concat(rows[1]);
        result[errordata] = rows[2];
        result[countandoffset] = rows[0]; 
        result[data] = rows[1]; 



        res.json(result);//or return count for 1 &amp;amp;amp; 0
        res.end();
      }
    });
});


router.post('/insertFarmerDistributionWeb' ,isAuthorizedWeb, function(req,res,next){ //, isAuthorized

  console.log(req.body);
 
  db.insertAndGetDistribution(req.body,function(err,rows){
      if(err)
      {
        res.json(err);
        res.end();
      }
      else{
        result = new Object()
        var errordata ='errordata';
        var data ='data';

        result[errordata] = rows[0]; 
        

        res.json(result);//or return count for 1 &amp;amp;amp; 0
        res.end();
      }
    });
});



router.post('/getFarmerDistributionWeb',isAuthorizedWeb,function(req,res,next){ //, isAuthorized

  console.log(req.body);
  db.insertAndGetDistribution(req.body,function(err,rows){
      if(err)
      {
        res.json(err);
        res.end();
      }
      else{
        result = new Object()
        var errordata ='errordata';
        var data ='data';

        var countandoffset ='countandoffset';
       // finalObj = rows[0].concat(rows[1]);
        result[errordata] = rows[2];
        result[countandoffset] = rows[0]; 
        result[data] = rows[1]; 



        res.json(result);//or return count for 1 &amp;amp;amp; 0
        res.end();
      }
    });
});

router.get('/getDistrict', isAuthorized ,function(req,res,next){ //, isAuthorized

  console.log(req.query);
 
  db.userDetail(req.query,function(err,rows){
      if(err)
      {
        res.json(err);
        res.end();
      }
      else{
      	if(rows[0] == undefined){
        	return res.status(401).send({errordata :[{ error : "Wrong Format"}]});

        }
        result = new Object()
       
        var data ='data';

        
       // finalObj = rows[0].concat(rows[1]);
        
        result[data] = rows[0]; 



        res.json(result);//or return count for 1 &amp;amp;amp; 0
        res.end();
      }
    });
});

router.post("/welcome", isAuthorized, (req, res) => {
  console.log(req.body);
  res.status(200).send("Welcome 🙌 ");
});


module.exports=router;
