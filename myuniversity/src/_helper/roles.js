
// REVOKE :  it can be use to delete a permission for a specific role 
//GRANT :  it uses to add permission to a specific roles


const  accessControl = require('accesscontrol');

exports.roles = (function() {

    accessControl.grant('SUPER_ADMIN').updateAny('profile')
                                      .deleteAny('profile')       
                                      
                                      .createAny('profile')
    return accessControl ;
})();