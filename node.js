module.exports = function (RED) {
    "use strict";
    var translate = require('baidu-translate-api');

    function BaiduTranslateNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        this.on('input', function (msg) {
            msg.config = conf;
            var conf = { to: config.to };
            var phrase = msg.payload + '';
            if (config.from === 'prog' && config.to === 'prog') {
                conf = { from: msg.payload.from, to: msg.payload.to }
            } else if (config.from === 'auto' && config.to === 'prog') {
                conf = { to: msg.payload.to }
            }
            if (msg.payload.phrase) {
                phrase = msg.payload.phrase;
            }
            translate(phrase + '', conf).then(function (res) {
                msg.payload = res.trans_result.dst;
                node.send(msg);
            }).catch(function (err) {
                node.error(err);
            });
        });
    }

    RED.nodes.registerType("baidu-translate", BaiduTranslateNode);
};
