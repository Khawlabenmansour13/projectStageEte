
// REVOKE :  it can be use to delete a permission for a specific role 
//GRANT :  it uses to add permission to a specific roles


const  accessControl = require('accesscontrol');

const ac = new accessControl();
exports.roles = (function() {

    ac.grant('SUPER_ADMIN').updateAny('profile')
                                      .deleteAny('profile')       
                                      .readAny('profile')
                                      .createAny('profile')
    ac.grant('ADMIN').updateAny('profile')
    
    return ac ;
})();


//All roles and permissions were created using the accesscontrol package,
//itprovides some methods for creating roles and defining what cations can be performed 
//by each role