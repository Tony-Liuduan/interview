# Nginx

### ng路径(mac)
```sh
cd /usr/local/etc/nginx
```

### 解决80端口占用(mac)
```sh
sudo launchctl unload -w /System/Library/LaunchDaemons/org.apache.httpd.plist
```

### 启动ng
```sh
nginx
```

### 停止ng
```sh
# 1.从容停止服务 这种方法较stop相比就比较温和一些了，需要进程完成当前工作后再停止。
nginx -s quit

# 2.立即停止服务 这种方法比较强硬，无论进程是否在工作，都直接停止进程。
nginx -s stop

# 3.杀死进程 直接杀死进程，在上面无效的情况下使用，态度强硬，简单粗暴！
killall nginx
```



### 查看启动后记录
```sh
ps aux | grep nginx
```


### 重启Nginx服务
```sh
systemctl restart nginx.service
```


### 重新载入配置文件
当有系统配置文件有修改，用此命令，建议不要停止再重启，以防报错！
```sh
nginx -s reload
```


### 测试配置文件是否有语法错误
```sh
nginx -t
```

### linux yum安装nginx
```sh
rpm -Uvh http://nginx.org/packages/centos/7/noarch/RPMS/nginx-release-centos-7-0.el7.ngx.noarch.rpm
yum install -y nginx
```


### config-demo
```nginx
http {
    #负载均衡配置
    upstream bandit {
        server 127.0.0.1:8002;
        server 127.0.0.1:8001;
        #server 192.168.1.5;
    }
    server {
        listen 8080;
        location / {
            #请求代理
            proxy_pass http://bandit;
        }
    }
}
```