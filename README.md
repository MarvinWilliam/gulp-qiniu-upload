# gulp-qiniu-upload

gulp七牛上传文件



Usage:

```javascript
var qiniuUpload = require('gulp-qiniu-upload');

gulp.src('/**/*.js')
	.pipe(qiniuUpload({
  		accessKey:'',
  		secretKey:'',
  		bucket:'',
  		name:function(file){
  			return 'CUSTOMFILENAME';
		}
	}));
```
