var db=require('/usr/src/jharkand_seed_api/seedApi/routes/db/dbconnect'); //reference of dbconnection.js
 
var Data={
	getAllTasks:function(callback){
		db.query("CALL slatte_db.sp_reg1(?, '', '', '', '')",['select'], function (err, rows, fields) {
    		if (err) throw err;
    		console.log(rows);
  		}); 
		return db.query("CALL slatte_db.sp_reg1(?, '', '', '', '')",['select'],callback); 
	}, 

	userDetail:function(Logindata, callback){
		console.log(Logindata.emailId);
		return db.query("CALL jharkhand_seed.sp_userDetail(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?)",[Logindata.mode, Logindata.userFname, Logindata.userLname, Logindata.userEmailId, Logindata.userCno, Logindata.userDesignation, Logindata.role, Logindata.profilePic, Logindata.userID, Logindata.password, Logindata.department, Logindata.pid, Logindata.district, Logindata.block, Logindata.CropID, Logindata.Purchaser, Logindata.verityID, Logindata.category, Logindata.season, Logindata.startDate, Logindata.endDate, Logindata.userIDJWT],callback);
    },
    seedDetail:function(Logindata, callback){
		console.log(Logindata.emailId);
		return db.query("CALL jharkhand_seed.sp_seedDetail(?, ?, ?, ?, ?, ?, ?, ?, ?)",[Logindata.mode, Logindata.cropName, Logindata.variety, Logindata.perAcreLimit, Logindata.ratePerKg, Logindata.season, Logindata.pid, Logindata.verityType, Logindata.userIDJWT],callback);
    },
    forcastProcess:function(Logindata, callback){
		console.log(Logindata.emailId);
		return db.query("CALL jharkhand_seed.sp_forcastProcess(?, ?, ?, ?, ?, ?, ?, '', '', ?, ?, ?, ?)",[Logindata.mode, Logindata.year, Logindata.season, Logindata.creatorID, Logindata.AoID, Logindata.SupplierID, Logindata.DistrictID, Logindata.detailData, Logindata.status, Logindata.forcastID, Logindata.seedID],callback);
    },
    regCheck:function(Logindata, callback){
		console.log(Logindata.emailId);
		return db.query("CALL jharkhand_seed.sp_regLogincheck(?, ?, ?)",[Logindata.mode, Logindata.emailID, Logindata.password],callback);
    },
    purchageProcess:function(Logindata, callback){
		console.log(Logindata.emailId);
		return db.query("CALL jharkhand_seed.sp_seedpurchage(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)",[Logindata.mode, Logindata.year, Logindata.season, Logindata.cropID, Logindata.verityID, Logindata.demandQuantity, Logindata.userID, Logindata.status, Logindata.supplystatus, Logindata.supplierID, Logindata.transitQuantity, Logindata.transportDetail, Logindata.recevedQuantity, Logindata.receivedBy, Logindata.pid, Logindata.paymentType, Logindata.chequeOrDraftno, Logindata.draftImg, Logindata.dispatchID, Logindata.districtID, Logindata.userIDJWT],callback);
    },
    seedAllotment:function(Logindata, callback){
		console.log(Logindata.emailId);
		return db.query("CALL jharkhand_seed.sp_distributorAllotment(?, ?, ?, ?, ?, ?, ?, ?, ?)",[Logindata.mode, Logindata.cropID, Logindata.verityID, Logindata.distributorID, Logindata.allotmetQuantity, Logindata.daoID, Logindata.year, Logindata.season, Logindata.userIDJWT],callback);
    },
    stock:function(Logindata, callback){
		console.log(Logindata.emailId);
		return db.query("CALL jharkhand_seed.sp_stock(?, ?, ?, ?, ?, ?)",[Logindata.mode, Logindata.offset, Logindata.verityID, Logindata.userID, Logindata.season, Logindata.userIDJWT],callback);
    },
    insertAndGetFarmer:function(Logindata, callback){
		console.log(Logindata.emailId);
		return db.query("CALL jharkhand_seed.sp_farmerdetails(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)",[Logindata.mode, Logindata.aadharNo, Logindata.area, Logindata.block, Logindata.distributorID, Logindata.districtID, Logindata.fatherName, Logindata.name, Logindata.mobileNo, Logindata.panchayatName, Logindata.village, Logindata.gender, Logindata.ekyc, Logindata.cast, Logindata.userIDJWT],callback);
    },
    insertAndGetDistribution:function(Logindata, callback){
		console.log(Logindata.emailId);
		return db.query("CALL jharkhand_seed.sp_farmerDistribution(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[Logindata.mode, Logindata.quantity, Logindata.farmerCno, Logindata.farmerAadhar, Logindata.distributionPoint, Logindata.seedID, Logindata.verityID, Logindata.gps, Logindata.apkVersion, Logindata.aadhar, Logindata.farmerAckStatus, Logindata.farmerFeedback, Logindata.userID, Logindata.offset, Logindata.year, Logindata.season, Logindata.otp, Logindata.Aadhar, Logindata.dwid, Logindata.userIDJWT],callback);
    },
    dashboard:function(Logindata, callback){
		console.log(Logindata.emailId);
		return db.query("CALL jharkhand_seed.sp_dashboard(?, ?, ?, ?, ?, ?, ?)",[Logindata.mode, Logindata.year, Logindata.season, Logindata.seedID, Logindata.verityID, Logindata.districtID, Logindata.userIDJWT],callback);
    },
	dashboard:function(Logindata, callback){
		console.log(Logindata.emailId);
		return db.query("CALL jharkhand_seed.sp_dashboard(?, ?, ?, ?, ?, ?, ?)",[Logindata.mode, Logindata.year, Logindata.season, Logindata.seedID, Logindata.verityID, Logindata.districtID, Logindata.userIDJWT],callback);
    },
    season:function(Logindata, callback){
		console.log(Logindata.emailId);
		return db.query("CALL jharkhand_seed.sp_season(?, ?, ?, ?, ?)",[Logindata.mode, Logindata.year, Logindata.season, Logindata.pid, Logindata.userIDJWT],callback);
    },
    seedTransfer:function(Logindata, callback){
		console.log(Logindata.emailId);
		return db.query("CALL jharkhand_seed.sp_seedtransfer(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[Logindata.mode, Logindata.transferReqNO, Logindata.year, Logindata.season, Logindata.receiverUserID, Logindata.senderUserID, Logindata.approverID, Logindata.approveStatus, Logindata.verietyID, Logindata.seedID, Logindata.seedQuantity, Logindata.userIDJWT],callback);
    },
    daoSeeds:function(Logindata, callback){
		console.log(Logindata.emailId);
		return db.query("CALL jharkhand_seed.sp_DaoSeedDetails(?, ?, ?, ?, ?, ?, ?, ?)",[Logindata.mode, Logindata.daoID, Logindata.seedID, Logindata.varietyID, Logindata.year, Logindata.season, Logindata.pid, Logindata.userIDJWT],callback);
    },
    daoSeedsForecastNew:function(Logindata, callback){
		console.log(Logindata.emailId);
		return db.query("CALL jharkhand_seed.sp_forcastseednew(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[Logindata.mode, Logindata.daoID, Logindata.aoID, Logindata.seedID, Logindata.varietyID, Logindata.season, Logindata.year,Logindata.forecastQuantity, Logindata.approveQuantity, Logindata.status, Logindata.districtID, Logindata.pid, Logindata.userIDJWT],callback);
    },
    insert_and_update_blockchain:function(Logindata, callback){
		console.log(Logindata.emailId);
		return db.query("CALL jharkhand_seed.sp_insert_and_update_blockchain(?, ?, ?)",[Logindata.mode, Logindata.id, Logindata.cid],callback);
    },
    aoApprovedQtySupplier:function(Logindata, callback){
		console.log(Logindata.emailId);
		return db.query("CALL jharkhand_seed.sp_aoApprovedQtySupplier(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[Logindata.mode, Logindata.verietyID, Logindata.seedID, Logindata.year, Logindata.season, Logindata.districtID, Logindata.supplierID, Logindata.remainQuantity, Logindata.approvedQuantity, Logindata.approvedBy, Logindata.userIDJWT],callback);
    },
    testing:function(Logindata, callback){
		console.log(Logindata.emailId);
		return db.query("CALL jharkhand_seed.sp_testing(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)",[Logindata.mode, Logindata.seedID, Logindata.verietyID, Logindata.year, Logindata.season, Logindata.senderID, Logindata.daoID, Logindata.testingAgencyID, Logindata.status, Logindata.reportFile, Logindata.reportComment, Logindata.daoComment, Logindata.senderComment, Logindata.seedReport, Logindata.pid, Logindata.dispatchID, Logindata.userIDJWT],callback);
    }
};
 module.exports=Data;
