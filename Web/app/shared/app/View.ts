///<reference path='./lib/def/defLoader.d.ts'/>

import _view = require('./public/View');

/**
 * Methods for the view, server side only.
 */
export class View extends _view.View {

    /**
     * Return the path of a template using absolute path, based on the global public config. (Because the same path is shared with the client, templates are also accessible from the client.)
     *
     * @param filename              Filename to get the path from.
     * @param beforeFilename        Pattern to add before the filename. ['_']
     * @returns {string}
     */
    public static templatePath(filename, beforeFilename = '_'){
        return '/../../' + getPublicConfig().path.view.templates + beforeFilename + filename;
    }

    /**
     * Return the path of a partial using absolute path, based on the global config.
     *
     * @param filename              Filename to get the path from.
     * @param beforeFilename        Pattern to add before the filename. ['_']
     * @returns {string}
     */
    public static partialPath(filename, beforeFilename = '_'){
        return __config.path.view.partials + beforeFilename + filename;
    }
}