///<reference path='./../defLoader.d.ts' />
///<reference path='./../core/def/defLoader.d.ts'/>
var Game;
(function (Game) {
    var Managers;
    (function (Managers) {
        var LayerManager = (function () {
            function LayerManager() {
                /**
                 * Elements that are managed by the manager.
                 * @override
                 */
                this._elements = [];
            }
            return LayerManager;
        })();
        Managers.LayerManager = LayerManager;
    })(Managers = Game.Managers || (Game.Managers = {}));
})(Game || (Game = {}));
//# sourceMappingURL=LayerManager.js.map