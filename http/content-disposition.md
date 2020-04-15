# content-disposition


## 作为消息主体中的消息头
> 在HTTP场景中，第一个参数或者是inline（默认值，表示回复中的消息体会以页面的一部分或者整个页面的形式展示），或者是attachment（意味着消息体应该被下载到本地；大多数浏览器会呈现一个“保存为”的对话框，将filename的值预填为下载后的文件名，假如它存在的话）。

* Content-Disposition: inline
* Content-Disposition: attachment
* Content-Disposition: attachment; filename="filename.jpg"



## 作为multipart body中的消息头
> 在HTTP场景中。第一个参数总是固定不变的form-data；附加的参数不区分大小写，并且拥有参数值，参数名与参数值用等号(=)连接，参数值用双引号括起来。参数之间用分号(;)分隔。

* Content-Disposition: form-data
* Content-Disposition: form-data; name="fieldName"
* Content-Disposition: form-data; name="fieldName"; filename="filename.jpg"


```txt
POST /foo HTTP/1.1
Content-Length: 68137
Content-Type: multipart/form-data; boundary=---------------------------974767299852498929531610575

---------------------------974767299852498929531610575
Content-Disposition: form-data; name="description" 

some text
---------------------------974767299852498929531610575
Content-Disposition: form-data; name="myFile"; filename="foo.txt" 
Content-Type: text/plain 

(content of the uploaded file foo.txt)
---------------------------974767299852498929531610575
```