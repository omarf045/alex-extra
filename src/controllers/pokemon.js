const controller = {};
 
controller.list = async(req,res)=>{
    var diskinfo = require('diskinfo');
    var current_disk = __dirname.substr(0,2).toLowerCase();
    diskinfo.getDrives(function(err, aDrives) {
        for (var i = 0; i < aDrives.length; i++) {
                if( aDrives[i].mounted.toLowerCase() == current_disk ){
                    var os = require("os");
                    infoPoke = os.cpus(); 
                    var total = ((os.totalmem())/1048576);
                    var mbFree = ((os.freemem())/1048576);
                    var mounted =  aDrives[i].mounted;
                    var totall  =  (aDrives[i].blocks /1024 /1024 /1024).toFixed(0) + " gb";
                    var used = (aDrives[i].used /1024 /1024 /1024).toFixed(0) + " gb";
                    var available =  (aDrives[i].available /1024 /1024 /1024).toFixed(0) + " gb";
                    var capacity = aDrives[i].capacity;
                    //console.log(mounted+"\r\n"+total+"\r\n"+used+"\r\n"+available+"\r\n"+capacity);
                   //let disco = [mounted, total, used, available,capacity];
                    //console.log(disco);
                    res.render('index', {
                        dataPoke: infoPoke,
                        dataTotal: total,
                        dataLibre: mbFree,
                        dataDiscTotall: totall,
                        dataDiscMounted: mounted,
                        dataDiscUsed: used,
                        dataDiscAvailable: available,
                        dataDiscCapacity: capacity
                    }) 
                }      
        }  
    });    
    }

module.exports = controller;

