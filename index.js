var qiniu = require('qiniu'),
    through2 = require('through2');


module.exports = function(options) {
    if (!options.accessKey || !options.secretKey || !options.bucket) {
        console.warn('options error');
        return;
    }
    var named = options.name || function() {
            return '';
        },
        ACCESS_KEY = options.accessKey,
        SECRET_KEY = options.secretKey,
        BUCKET = options.bucket;

    function uploadFile(filename, filepath, calbak) {
        //需要填写你的 Access Key 和 Secret Key
        qiniu.conf.ACCESS_KEY = ACCESS_KEY;
        qiniu.conf.SECRET_KEY = SECRET_KEY;

        var putPolicy = new qiniu.rs.PutPolicy(BUCKET + ":" + filename),
            token = putPolicy.token(),
            extra = new qiniu.io.PutExtra();

        qiniu.io.putFile(token, filename, filepath, extra, function(err, ret) {
            if (!err) {
                // 上传成功， 处理返回值
                console.log(ret.hash, ret.key);
            } else {
                // 上传失败， 处理返回代码
                console.warn(err);
            }
            calbak();
        });
    }

    return through2.obj(function(file, enc, cb) {
        uploadFile(named(file), file.path, cb);
    });
};
