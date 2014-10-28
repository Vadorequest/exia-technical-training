///<reference path='./def/defLoader.d.ts'/>

import dao = require('./../../shared/app/core/lib/CoreDao');

/**
 * Use to load all Models. Data Access Object.
 * Acts as a Singleton object.
 *
 * @author  Ambroise Dhenain
 *
 * @example
 *          var User = __Dao.getModel('User');
 *          console.log(User);
 *          console.log(__Dao.getSchema('User'));
 *
 *          var minLength = __Dao.getSchema('user').login.minLength;
 */
export class Dao extends dao.CoreDao {

}

(()=> {
    /**
     * We change the path of the CoreDao to force to load model files using a custom path for this project.
     */
    Dao.setModelDirectory(path.join(__dirname, "../db/models/"));
})();